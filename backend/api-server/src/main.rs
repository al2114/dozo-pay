#![deny(warnings)]
#![feature(plugin)]
#![plugin(rocket_codegen)]

#[cfg(feature = "notifications")]
extern crate apns;
extern crate chrono;
#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate protobuf;
extern crate r2d2;
extern crate ring;
extern crate rocket;
extern crate rocket_contrib;
extern crate rustc_serialize;
#[macro_use]
extern crate serde_derive;

#[cfg(feature = "notifications")]
use apns::{APNs, APNsClient, Notification};
use diesel::prelude::*;
use dotenv::dotenv;
use protobuf::{CodedInputStream, CodedOutputStream};
use rocket::State;
use rocket::http::{Cookie, Cookies};
use rocket::response::NamedFile;
use rocket_contrib::Template;

use std::env;
use std::io;
use std::io::Cursor;
use std::path::{Path, PathBuf};
#[cfg(feature = "notifications")]
use std::sync::Mutex;
#[cfg(feature = "notifications")]
use std::sync::mpsc::{channel, Sender};
#[cfg(feature = "notifications")]
use std::thread;

mod contexts;
use contexts::*;
mod pg_pool;
use pg_pool::{PgPool, PgPooledConnection};
mod protos;
use protos::user_messages::*;
mod passwords;
use passwords::encrypt_password;
mod models;
mod schema;

#[cfg(test)]
mod route_tests;

fn deserialize<T: ::protobuf::MessageStatic>(data: Vec<u8>) -> Result<T, String> {
    let mut proto = T::new();
    let mut cis = CodedInputStream::from_bytes(&data);
    proto
        .merge_from(&mut cis)
        .map_err(|_| "Protobuf parse error")?;
    Ok(proto)
}

fn serialize<T: ::protobuf::MessageStatic>(proto: T) -> Result<Vec<u8>, String> {
    let mut data = Vec::<u8>::new();
    {
        let mut buf = Cursor::new(&mut data);
        let mut cos = CodedOutputStream::new(&mut buf);
        proto
            .write_to(&mut cos)
            .map_err(|_| "Protobuf write error")?;
        cos.flush().map_err(|_| "CodecOutputStream flush error")?;
    }
    Ok(data)
}

fn protoize_user(user: models::User, balance: i32) -> protos::models::User {
    let mut proto_user = protos::models::User::new();
    proto_user.set_uid(user.uid);
    proto_user.set_phone_no(user.phone_no);
    proto_user.set_picture_url(user.picture_url.unwrap_or("".to_string()));
    proto_user.set_balance(balance);
    proto_user.set_username(user.username);
    proto_user
}

fn protoize_claim(
    claim: models::Claim,
    owner: models::User,
    receiver: Option<models::User>,
    amount: i32,
) -> protos::models::Claim {
    let mut proto_claim = protos::models::Claim::new();
    proto_claim.set_uid(claim.uid);
    proto_claim.set_owner(protoize_user(owner, 0));
    if let Some(receiver) = receiver {
        proto_claim.set_receiver(protoize_user(receiver, 0));
    }
    proto_claim.set_amount(amount);
    proto_claim
}

#[get("/")]
fn index_route() -> io::Result<NamedFile> {
    NamedFile::open("static/index.html")
}

#[get("/<file..>", rank = 2)]
fn file_route(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("static/").join(file)).ok()
}

fn update_balances(
    transaction: &models::Transaction,
    db_connection: &PgPooledConnection,
) -> Result<(bool, models::Account), String> {
    use schema::accounts::dsl::accounts as accounts_sql;
    use schema::accounts;
    use models::Account;

    let payer_account_query = accounts_sql.find(transaction.payer_id);
    let mut payer_account = payer_account_query
        .first::<Account>(db_connection)
        .map_err(|_| "Account not found")?;
    if payer_account.balance >= transaction.amount {
        payer_account = diesel::update(payer_account_query)
            .set(accounts::balance.eq(accounts::balance - transaction.amount))
            .get_result::<Account>(db_connection)
            .map_err(|_| "Decrement update failed")?;
        diesel::update(accounts_sql.find(transaction.payee_id))
            .set(accounts::balance.eq(accounts::balance + transaction.amount))
            .execute(db_connection)
            .map_err(|_| "Increment update failed")?;
        Ok((true, payer_account))
    } else {
        Ok((false, payer_account))
    }
}

struct Err {
    description: String,
}
use diesel::result::Error;
impl From<Error> for Err {
    fn from(_: Error) -> Err {
        Err {
            description: "".to_string(),
        }
    }
}

fn execute_transaction(
    payer_id: &i32,
    payee_id: &i32,
    amount: &i32,
    db_connection: &PgPooledConnection,
) -> Result<(models::Account, models::Transaction), String> {
    let new_transaction = models::NewTransaction {
        payer_id: &payer_id,
        payee_id: &payee_id,
        amount: &amount,
    };

    use schema::transactions;
    use models::Transaction;

    db_connection
        .transaction::<_, Err, _>(|| {
            let mut transaction = diesel::insert_into(transactions::table)
                .values(&new_transaction)
                .get_result::<Transaction>(db_connection)
                .map_err(|_| Err {
                    description: "Error inserting new transaction".to_string(),
                })?;

            let (success, account) =
                update_balances(&transaction, db_connection).map_err(|d| Err { description: d })?;

            if success {
                use schema::transactions::dsl::transactions as transactions_sql;

                transaction = diesel::update(transactions_sql.find(transaction.uid))
                    .set(transactions::is_successful.eq(true))
                    .get_result::<Transaction>(db_connection)
                    .map_err(|_| Err {
                        description: "Error updating failed flag".to_string(),
                    })?;
            }

            Ok((account, transaction))
        })
        .map_err(|e| e.description)
}

#[post("/check-passcode", data = "<input>")]
fn check_passcode_route(input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<CheckPasscodeRequest>(input)?;
    let passcode = "3192".to_string();
    let mut response = SuccessResponse::new();
    response.set_successful(passcode == request.get_passcode());
    Ok(serialize(response)?)
}

#[post("/contacts", data = "<input>")]
fn add_contact_route(pool: State<PgPool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let requests = deserialize::<AddContactRequest>(input)?;

    let user_id = requests.get_user_id();
    let contact_username = requests.get_contact_username();

    let db_connection = pool.get().expect("failed to obtain database connection");

    use schema::users::dsl::users as users_sql;
    use schema::users;

    let contact_id = users_sql
        .filter(users::username.eq(contact_username))
        .select(users::uid)
        .first::<i32>(&db_connection)
        .map_err(|_| "Contact not found")?;

    let new_contact = models::NewContact {
        user_id: &user_id,
        contact_id: &contact_id,
    };

    use schema::contacts;
    diesel::insert_into(contacts::table)
        .values(&new_contact)
        .execute(&db_connection)
        .map_err(|_| "Error inserting new account")?;

    let mut response = SuccessResponse::new();
    response.set_successful(true);
    Ok(serialize(response)?)
}

fn protoize_contact(contact: models::Contact, username: String) -> protos::models::Contact {
    let mut proto_contact = protos::models::Contact::new();
    proto_contact.set_uid(contact.contact_id);
    proto_contact.set_username(username);
    proto_contact.set_trusted(true);
    proto_contact
}

#[get("/contacts/<user_id>")]
fn get_contacts_route(pool: State<PgPool>, user_id: i32) -> Result<Vec<u8>, String> {
    let db_connection = pool.get().expect("failed to obtain database connection");

    use schema::contacts;
    use models::Contact;

    use schema::users;
    use models::User;

    let results = contacts::table
        .filter(contacts::user_id.eq(user_id))
        .inner_join(users::table.on(contacts::contact_id.eq(users::uid)))
        .load::<(Contact, User)>(&db_connection)
        .map_err(|_| "Unable to find contacts")?;

    let contacts = results
        .into_iter()
        .map(|(contact, user)| protoize_contact(contact, user.username))
        .collect();

    let mut response = GetContactsResponse::new();
    response.set_contacts(contacts);

    Ok(serialize(response)?)
}

fn protoize_transaction(
    transaction: models::Transaction,
    user: models::User,
    transaction_type: protos::models::Transaction_Type,
) -> protos::models::Transaction {
    let mut proto_transaction = protos::models::Transaction::new();
    let mut profile = protos::models::Profile::new();
    profile.set_uid(user.uid);
    profile.set_username(user.username);
    proto_transaction.set_profile(profile);
    proto_transaction.set_transaction_type(transaction_type);
    proto_transaction.set_amount(transaction.amount);
    let mut timestamp = ::protobuf::well_known_types::Timestamp::new();
    timestamp.set_seconds(transaction.created_at.timestamp());
    timestamp.set_nanos(transaction.created_at.timestamp_subsec_nanos() as i32);
    proto_transaction.set_timestamp(timestamp);
    proto_transaction
}

#[get("/transactions/<user_id>")]
fn get_transactions_route(pool: State<PgPool>, user_id: i32) -> Result<Vec<u8>, String> {
    let db_connection = pool.get().expect("failed to obtain database connection");

    use schema::users::dsl::users as users_sql;
    use schema::users;
    use models::User;

    use schema::transactions;
    use models::Transaction;

    let from_tids = users_sql
        .find(user_id)
        .inner_join(transactions::table.on(transactions::payee_id.eq(users::account_id)))
        .select(transactions::uid)
        .load::<i32>(&db_connection)
        .map_err(|_| "Transactions not found")?;

    let to_tids = users_sql
        .find(user_id)
        .inner_join(transactions::table.on(transactions::payer_id.eq(users::account_id)))
        .select(transactions::uid)
        .load::<i32>(&db_connection)
        .map_err(|_| "Transactions not found")?;

    let from_results = transactions::table
        .filter(transactions::uid.eq_any(from_tids))
        .inner_join(users::table.on(transactions::payer_id.eq(users::account_id)))
        .load::<(Transaction, User)>(&db_connection)
        .map_err(|_| "Transactions not found")?
        .into_iter()
        .map(|(t, u)| protoize_transaction(t, u, protos::models::Transaction_Type::FROM));

    let to_results = transactions::table
        .filter(transactions::uid.eq_any(to_tids))
        .inner_join(users::table.on(transactions::payee_id.eq(users::account_id)))
        .load::<(Transaction, User)>(&db_connection)
        .map_err(|_| "Transactions not found")?
        .into_iter()
        .map(|(t, u)| protoize_transaction(t, u, protos::models::Transaction_Type::TO));

    let mut transactions = from_results.chain(to_results).collect::<Vec<_>>();
    transactions.sort_by(|a, b| {
        b.get_timestamp()
            .get_seconds()
            .cmp(&a.get_timestamp().get_seconds())
    });
    let transactions = transactions.into_iter().collect();

    let mut response = GetTransactionsResponse::new();
    response.set_transactions(transactions);
    Ok(serialize(response)?)
}

#[get("/users/<user_id>")]
fn get_user_route(pool: State<PgPool>, user_id: i32) -> Result<Vec<u8>, String> {
    let db_connection = pool.get().expect("failed to obtain database connection");

    use schema::users::dsl::users as users_sql;
    use schema::users;
    use models::User;

    use schema::accounts;
    use models::Account;

    let (user, account) = users_sql
        .find(user_id)
        .inner_join(accounts::table.on(users::account_id.eq(accounts::uid)))
        .first::<(User, Account)>(&db_connection)
        .map_err(|_| "User not found")?;

    let user = protoize_user(user, account.balance);
    Ok(serialize(user)?)
}

#[post("/pay", data = "<input>")]
fn transaction_route(pool: State<PgPool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<TransactionRequest>(input)?;
    let payer_id = request.get_payer_id();
    let payee_id = request.get_payee_id();

    use schema::users::dsl::users as users_sql;
    use models::User;

    let db_connection = pool.get().expect("failed to obtain database connection");

    let payer = users_sql
        .find(payer_id)
        .first::<User>(&db_connection)
        .map_err(|_| "User not found")?;
    let payee = users_sql
        .find(payee_id)
        .first::<User>(&db_connection)
        .map_err(|_| "User not found")?;

    let (account, transaction) = execute_transaction(
        &payer.account_id,
        &payee.account_id,
        &request.amount,
        &db_connection,
    )?;

    let payer = protoize_user(payer, account.balance);
    let mut response = TransactionResponse::new();
    response.set_user(payer);
    response.set_transaction_id(transaction.uid);
    response.set_successful(true);
    Ok(serialize(response)?)
}

#[post("/topup", data = "<input>")]
fn topup_route(pool: State<PgPool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<TopupRequest>(input)?;

    let db_connection = pool.get().expect("failed to obtain database connection");

    use schema::users::dsl::users as users_sql;
    use schema::users;
    use models::User;

    use schema::accounts::dsl::accounts as accounts_sql;
    use schema::accounts;
    use models::Account;

    let master_id = 0;
    let master_account = diesel::update(accounts_sql.find(master_id))
        .set(accounts::balance.eq(accounts::balance + request.get_amount()))
        .get_result::<Account>(&db_connection)
        .map_err(|_| "Master account does not exist")?;

    let (user, mut user_account) = users_sql
        .find(request.get_uid())
        .inner_join(accounts::table.on(users::account_id.eq(accounts::uid)))
        .first::<(User, Account)>(&db_connection)
        .map_err(|_| "User not found")?;

    let (_, transaction) = execute_transaction(
        &master_account.uid,
        &user_account.uid,
        &request.amount,
        &db_connection,
    )?;

    user_account = accounts_sql
        .find(user.account_id)
        .first::<Account>(&db_connection)
        .map_err(|_| "User does not have an account after transaction")?;

    let user = protoize_user(user, user_account.balance);

    let mut response = TopupResponse::new();
    response.set_user(user);
    response.set_successful(transaction.is_successful);
    Ok(serialize(response)?)
}

#[post("/register", data = "<input>")]
fn register_route(pool: State<PgPool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<RegisterRequest>(input)?;
    let username = request.get_username();
    let password = request.get_password();
    let password = &encrypt_password(&username, &password);

    let new_account = models::NewAccount { balance: &0 };

    use schema::accounts;
    use models::Account;

    let db_connection = pool.get().expect("failed to obtain database connection");

    let account = diesel::insert_into(accounts::table)
        .values(&new_account)
        .get_result::<Account>(&db_connection)
        .map_err(|_| "Error inserting new account")?;

    let new_user = models::NewUser {
        phone_no: request.get_phone_no(),
        picture_url: None,
        account_id: &account.uid,
        username: username,
        password: password,
        device_token: None,
    };

    use schema::users;
    use models::User;

    let user = diesel::insert_into(users::table)
        .values(&new_user)
        .get_result::<User>(&db_connection)
        .map_err(|_| "Error inserting new user")?;

    let user = protoize_user(user, 0);

    let mut response = RegisterResponse::new();
    response.set_user(user);
    response.set_successful(true);
    Ok(serialize(response)?)
}

#[derive(Deserialize)]
pub struct Login {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct Success {
    pub successful: bool,
}

#[post("/login", data = "<input>")]
fn login_route(
    mut cookies: Cookies,
    pool: State<PgPool>,
    input: Vec<u8>,
) -> Result<Vec<u8>, String> {
    let request = deserialize::<LoginRequest>(input)?;

    let username = request.get_username();
    let password = request.get_password();
    let password = encrypt_password(&username, &password);

    let db_connection = pool.get().expect("failed to obtain database connection");

    use schema::users;
    use models::User;

    use schema::accounts;
    use models::Account;

    let (user, account) = users::table
        .filter(users::username.eq(username))
        .inner_join(accounts::table.on(users::account_id.eq(accounts::uid)))
        .first::<(User, Account)>(&db_connection)
        .map_err(|_| "User not found")?;

    let mut response = LoginResponse::new();
    if user.password == password {
        let user = protoize_user(user, account.balance);
        cookies.add_private(Cookie::new("credentials", format!("{}", user.uid)));
        response.set_user(user);
        response.set_successful(true);
    } else {
        response.set_successful(false);
    }

    Ok(serialize(response)?)
}

fn get_username_with_uid(uid: &i32, db_connection: &PgPooledConnection) -> Result<String, String> {
    use schema::users::dsl::users as users_sql;
    use schema::users;
    let username = users_sql
        .find(uid)
        .select(users::username)
        .first::<String>(db_connection)
        .map_err(|_| "User not found")?;
    Ok(username)
}

#[get("/claims/<claim_id>")]
fn claim_page(
    pool: State<PgPool>,
    claim_id: i32,
    mut cookies: Cookies,
) -> Result<Template, String> {
    // TODO: Handle invalid claim_ids
    // TODO: Use private cookies
    let db_connection = pool.get().expect("failed to obtain database connection");

    let mut context = ClaimTemplateContext::default();

    let name = cookies
        .get_private("credentials")
        .and_then(|c| c.value().parse().ok())
        .and_then(|uid| get_username_with_uid(&uid, &db_connection).ok());

    if let Some(name) = name {
        context.logged_in = true;
        context.username = name;
    }

    use schema::claims;
    use schema::claims::dsl::claims as claims_sql;
    use schema::users;

    let (sender, amount, is_active) = claims_sql
        .find(claim_id)
        .inner_join(users::table.on(users::uid.eq(claims::owner_id)))
        .select((users::username, claims::amount, claims::is_active))
        .first::<(String, i32, bool)>(&db_connection)
        .map_err(|_| "Unable to find claim")?;

    context.is_active = is_active;
    context.sender = sender;
    context.amount = format!("{:.*}", 2, (amount as f64 / 100.0));
    context.claim_id = claim_id;
    Ok(Template::render("claim", &context))
}

#[post("/claims/create", data = "<input>")]
fn create_claim_route(pool: State<PgPool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<CreateClaimRequest>(input)?;

    let amount = request.get_amount();
    let owner_id = request.get_owner_id();

    let new_account = models::NewAccount { balance: &0 };

    let db_connection = pool.get().expect("failed to obtain database connection");

    use schema::accounts::dsl::accounts as accounts_sql;
    use schema::accounts;
    use models::Account;

    let account = diesel::insert_into(accounts::table)
        .values(&new_account)
        .get_result::<Account>(&db_connection)
        .map_err(|_| "Error inserting new account")?;

    let new_claim = models::NewClaim {
        account_id: &account.uid,
        owner_id: &owner_id,
        amount: &amount,
    };

    use schema::claims;
    use models::Claim;

    use schema::users::dsl::users as users_sql;
    use models::User;

    let owner = users_sql
        .find(owner_id)
        .first::<User>(&db_connection)
        .map_err(|_| "Unable to find user")?;

    let claim = diesel::insert_into(claims::table)
        .values(&new_claim)
        .get_result::<Claim>(&db_connection)
        .map_err(|_| "Error inserting new claim")?;

    let _ = execute_transaction(&owner.account_id, &account.uid, &amount, &db_connection)?;

    let account_balance = accounts_sql
        .find(account.uid)
        .select(accounts::balance)
        .first::<i32>(&db_connection)
        .map_err(|_| "Unable to find account")?;

    let mut response = CreateClaimResponse::new();
    response.set_successful(true);
    response.set_claim(protoize_claim(claim, owner, None, account_balance));
    Ok(serialize(response)?)
}

fn get_account_id_with_uid(uid: &i32, db_connection: &PgPooledConnection) -> Result<i32, String> {
    use schema::users;
    use schema::users::dsl::users as users_sql;

    let account_id = users_sql
        .find(uid)
        .select(users::account_id)
        .first::<i32>(db_connection)
        .map_err(|_| "Unable to find user account")?;

    Ok(account_id)
}

fn set_claim_received(
    claim_id: &i32,
    receiver_id: &i32,
    db_connection: &PgPooledConnection,
) -> Result<(), String> {
    use schema::claims;
    use schema::claims::dsl::claims as claims_sql;
    diesel::update(claims_sql.find(claim_id))
        .set((
            claims::receiver_id.eq(receiver_id),
            claims::is_active.eq(false),
        ))
        .execute(db_connection)
        .map_err(|_| "Cannot find claim")?;
    Ok(())
}

#[get("/login")]
fn login_page() -> Template {
    use std::collections::HashMap;
    let context: HashMap<&str, &str> = HashMap::new();
    Template::render("login", context)
}

#[get("/claims/confirm/<claim_id>")]
fn receipt_page(
    pool: State<PgPool>,
    claim_id: i32,
    mut cookies: Cookies,
) -> Result<Template, String> {
    let db_connection = pool.get().expect("failed to obtain database connection");
    let mut context = ReceiptTemplateContext::default();

    let uid: Option<i32> = cookies
        .get_private("credentials")
        .and_then(|c| c.value().parse().ok());

    use schema::claims::dsl::claims as claims_sql;
    use schema::claims;

    let is_active = claims_sql
        .find(claim_id)
        .select(claims::is_active)
        .first::<bool>(&db_connection)
        .map_err(|_| "Cannot find claim")?;

    // First check if the claim is valid
    if !is_active {
        return Ok(Template::render("receipt", context));
    }

    // Next check if the recipient details are correct
    if let Some(uid) = uid {
        let account_id = get_account_id_with_uid(&uid, &db_connection)?;

        use schema::accounts;
        use schema::users;

        let (sender_name, claim_account_id, amount) = claims_sql
            .find(claim_id)
            .inner_join(accounts::table.on(accounts::uid.eq(claims::account_id)))
            .inner_join(users::table.on(users::uid.eq(claims::owner_id)))
            .select((users::username, claims::account_id, accounts::balance))
            .first::<(String, i32, i32)>(&db_connection)
            .map_err(|_| "Unable to find claim")?;

        let _ = execute_transaction(&claim_account_id, &account_id, &amount, &db_connection)?;
        set_claim_received(&claim_id, &uid, &db_connection)?;

        use schema::accounts::dsl::accounts as accounts_sql;

        let new_balance = accounts_sql
            .find(account_id)
            .select(accounts::balance)
            .first::<i32>(&db_connection)
            .map_err(|_| "Unable to find account")?;

        let receiver_name = get_username_with_uid(&uid, &db_connection)?;

        context.receipt_id = format!("{}", claim_id as i64 + 400000000000);
        context.sender = sender_name;
        context.receiver = receiver_name;
        context.new_balance = format!("{:.*}", 2, (new_balance as f64 / 100.0));
        context.amount = format!("{:.*}", 2, (amount as f64 / 100.0));
        context.is_successful = true;
    }

    Ok(Template::render("receipt", context))
}

#[post("/claims/accept", data = "<input>")]
fn accept_claim_route(pool: State<PgPool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<AcceptClaimRequest>(input)?;
    let claim_id = request.get_claim_id();
    let receiver_id = request.get_receiver_id();

    let db_connection = pool.get().expect("failed to obtain database connection");
    let claim = accept_claim(&db_connection, claim_id, receiver_id)?;

    let mut response = AcceptClaimResponse::new();
    response.set_claim(claim);
    response.set_successful(true);

    Ok(serialize(response)?)
}

fn accept_claim(
    db_connection: &PgPooledConnection,
    claim_id: i32,
    receiver_id: i32,
) -> Result<protos::models::Claim, String> {
    use schema::claims;
    use models::Claim;
    use schema::claims::dsl::claims as claims_sql;
    use schema::accounts;

    let (account_id, balance) = claims_sql
        .find(claim_id)
        .inner_join(accounts::table.on(accounts::uid.eq(claims::account_id)))
        .select((claims::account_id, accounts::balance))
        .first::<(i32, i32)>(db_connection)
        .map_err(|_| "Unable to find claim")?;

    use models::User;
    use schema::users::dsl::users as users_sql;
    let receiver = users_sql
        .find(receiver_id)
        .first::<User>(db_connection)
        .map_err(|_| "Unable to find receiver account")?;

    let _ = execute_transaction(&account_id, &receiver.account_id, &balance, &db_connection)?;
    set_claim_received(&claim_id, &receiver_id, &db_connection)?;

    let claim = diesel::update(claims_sql.find(claim_id))
        .set((
            claims::receiver_id.eq(receiver_id),
            claims::is_active.eq(false),
        ))
        .get_result::<Claim>(db_connection)
        .map_err(|_| "Unable to update claim")?;

    let owner = users_sql
        .find(claim.owner_id)
        .first::<User>(db_connection)
        .map_err(|_| "Unable to find claim owner")?;

    let claim = protoize_claim(claim, owner, Some(receiver), balance);
    Ok(claim)
}

#[post("/claims/revoke", data = "<input>")]
fn revoke_claim_route(pool: State<PgPool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<RevokeClaimRequest>(input)?;
    let claim_id = request.get_claim_id();

    let db_connection = pool.get().expect("failed to obtain database connection");

    use schema::claims;
    use schema::claims::dsl::claims as claims_sql;

    let owner_id = claims_sql
        .find(claim_id)
        .select(claims::owner_id)
        .first::<i32>(&db_connection)
        .map_err(|_| "Unable to find claim")?;

    let claim = accept_claim(&db_connection, claim_id, owner_id)?;

    let mut response = AcceptClaimResponse::new();
    response.set_claim(claim);
    response.set_successful(true);

    Ok(serialize(response)?)
}

#[cfg(feature = "notifications")]
struct NotificationClient(Mutex<Sender<Notification>>);
#[cfg(not(feature = "notifications"))]
struct NotificationClient;
#[cfg(feature = "notifications")]
impl NotificationClient {
    fn send(&self, notification: Notification) {
        self.0.lock().unwrap().send(notification).unwrap();
    }
}

#[cfg(feature = "notifications")]
fn spawn_notification_client() -> Option<NotificationClient> {
    let apns_cert_path = env::var("APNS_CERT_PATH").unwrap();
    let apns_key_path = env::var("APNS_KEY_PATH").unwrap();
    let (tx, rx) = channel::<Notification>();
    thread::spawn(move || {
        let apns = APNs::new(apns_cert_path, apns_key_path, false).expect("APN config unsucessful");
        let apns_client = apns.new_client().expect("APN client setup unsucessful");
        loop {
            let notification = rx.recv().unwrap();
            let _ = apns.send(notification, &apns_client).unwrap();
        }
    });

    Some(NotificationClient(Mutex::new(tx)))
}
#[cfg(not(feature = "notifications"))]
fn spawn_notification_client() -> Option<NotificationClient> {
    None
}

fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let database_connection = pg_pool::init(&database_url);

    let notification_client: Option<NotificationClient>;
    if cfg!(feature = "notifications") {
        notification_client = spawn_notification_client();
    } else {
        notification_client = None;
    }

    rocket::ignite()
        .manage(database_connection)
        .manage(notification_client)
        .mount(
            "/",
            routes![
                index_route,
                file_route,
                check_passcode_route,
                register_route,
                login_route,
                topup_route,
                transaction_route,
                get_transactions_route,
                add_contact_route,
                get_contacts_route,
                get_user_route,
                accept_claim_route,
                create_claim_route,
                revoke_claim_route,
                claim_page,
                receipt_page,
                login_page
            ],
        )
        .attach(Template::fairing())
        .launch();
}
