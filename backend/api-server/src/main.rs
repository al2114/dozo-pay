#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;
// #[macro_use]
extern crate rocket_contrib;

// #[macro_use]
// extern crate serde_derive;

extern crate protobuf;

#[macro_use]
extern crate diesel;
extern crate chrono;
extern crate lazy_static;
extern crate dotenv;
extern crate r2d2;

use protobuf::{CodedInputStream};
use protobuf::{CodedOutputStream};
use protos::user_messages::*;

use std::io::Cursor;

use dotenv::dotenv;
use std::env;
use self::diesel::prelude::*;

mod models;
mod pg_pool;
mod protos;
mod schema;

#[cfg(test)]
mod route_tests;

fn deserialize<T: ::protobuf::MessageStatic>(data: Vec<u8>) -> Result<T, String> {
    let mut proto = T::new();
    let mut cis = CodedInputStream::from_bytes(&data);
    proto.merge_from(&mut cis)
        .map_err(|_| "Protobuf parse error")?;
    Ok(proto)
}

fn serialize<T: ::protobuf::MessageStatic>(proto: T) -> Result<Vec<u8>, String> {
    let mut data = Vec::<u8>::new();
    {
        let mut buf = Cursor::new(&mut data);
        let mut cos = CodedOutputStream::new(&mut buf);
        proto.write_to(&mut cos)
            .map_err(|_| "Protobuf write error")?;
        cos.flush()
            .map_err(|_| "CodecOutputStream flush error")?;
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


#[get("/")]
fn hello_route() -> String {
    let response = "Hello, world!".to_string();
    response
}

fn update_balances(transaction: &models::Transaction, db_connection: &pg_pool::PooledConnection) -> Result<(bool, models::Account), String> {
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
        Err { description: "".to_string() }
    }
}

fn execute_transaction(payer_id: &i32, payee_id: &i32, amount: &i32, db_connection: &pg_pool::PooledConnection) -> Result<(models::Account, models::Transaction), String> {
    let new_transaction = models::NewTransaction {
        payer_id: &payer_id,
        payee_id: &payee_id,
        amount: &amount
    };

    use schema::transactions;
    use models::Transaction;

    db_connection.transaction::<_, Err, _>(|| {
        let mut transaction = diesel::insert_into(transactions::table)
            .values(&new_transaction)
            .get_result::<Transaction>(db_connection)
            .map_err(|_| Err { description: "Error inserting new transaction".to_string() })?;

        let (success, account) = update_balances(&transaction, db_connection).map_err(|d| Err { description: d })?;

        if success {
            use schema::transactions::dsl::transactions as transactions_sql;

            transaction = diesel::update(transactions_sql.find(transaction.uid))
                .set(transactions::is_successful.eq(true))
                .get_result::<Transaction>(db_connection)
                .map_err(|_| Err { description: "Error updating failed flag".to_string() })?;
        }

        Ok((account, transaction))
    }).map_err(|e| e.description )
}

#[post("/contacts", data="<input>")]
fn add_contact_route(pool: rocket::State<pg_pool::Pool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
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
        contact_id: &contact_id
    };

    use schema::contacts;
    diesel::insert_into(contacts::table)
        .values(&new_contact)
        .execute(&db_connection)
        .map_err(|_| "Error inserting new account")?;

    let mut response = AddContactResponse::new();
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
fn get_contacts_route(pool: rocket::State<pg_pool::Pool>, user_id: i32)-> Result<Vec<u8>, String> {
    let db_connection = pool.get().expect("failed to obtain database connection");

    use schema::contacts;
    use models::Contact;

    use schema::users::dsl::users as users_sql;
    use schema::users;
    use models::User;

    let results = users_sql
        .find(user_id)
        .inner_join(contacts::table.on(contacts::user_id.eq(users::uid)))
        .load::<(User, Contact)>(&db_connection)
        .map_err(|_| "Unable to find contacts")?;

    let contacts = results
        .into_iter()
        .map(|(user, contact)| protoize_contact(contact, user.username))
        .collect();

    let mut response = GetContactsResponse::new();
    response.set_contacts(contacts);

    Ok(serialize(response)?)
}

fn protoize_transaction(transaction: models::Transaction, user: models::User, transaction_type: protos::models::Transaction_Type) -> protos::models::Transaction {
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
    proto_transaction
}

#[get("/transactions/<user_id>")]
fn get_transactions_route(pool: rocket::State<pg_pool::Pool>, user_id: i32)-> Result<Vec<u8>, String> {
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
        .inner_join(users::table.on(transactions::payer_id.eq(users::account_id)))
        .load::<(Transaction, User)>(&db_connection)
        .map_err(|_| "Transactions not found")?
        .into_iter()
        .map(|(t, u)| protoize_transaction(t, u, protos::models::Transaction_Type::TO));

    let mut transactions = from_results
        .chain(to_results)
        .collect::<Vec<_>>();
    transactions.sort_by(|a, b| a.get_timestamp().get_seconds().cmp(
                                &b.get_timestamp().get_seconds()));
    let transactions = transactions
        .into_iter()
        .collect();

    let mut response = GetTransactionsResponse::new();
    response.set_transactions(transactions);
    Ok(serialize(response)?)
}

#[get("/users/<user_id>")]
fn get_user_route(pool: rocket::State<pg_pool::Pool>, user_id: i32)-> Result<Vec<u8>, String> {
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

#[post("/pay", data="<input>")]
fn transaction_route(pool: rocket::State<pg_pool::Pool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<TransactionRequest>(input)?;
    let payer_id = request.get_payer_id();
    let payee_id = request.get_payee_id();

    use schema::users::dsl::users as users_sql;
    use models::User;

    let db_connection = pool.get().expect("failed to obtain database connection");

    let payer = users_sql.find(payer_id)
        .first::<User>(&db_connection)
        .map_err(|_| "User not found")?;
    let payee = users_sql.find(payee_id)
        .first::<User>(&db_connection)
        .map_err(|_| "User not found")?;

    let (account, transaction) = execute_transaction(&payer.account_id, &payee.account_id, &request.amount, &db_connection)?;

    let payer = protoize_user(payer, account.balance);
    let mut response = TransactionResponse::new();
    response.set_user(payer);
    response.set_transaction_id(transaction.uid);
    response.set_successful(true);
    Ok(serialize(response)?)
}

#[post("/topup", data="<input>")]
fn topup_route(pool: rocket::State<pg_pool::Pool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
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

    let (_, transaction) = execute_transaction(&master_account.uid, &user_account.uid, &request.amount, &db_connection)?;

    user_account = accounts_sql.find(user.account_id)
        .first::<Account>(&db_connection)
        .map_err(|_| "User does not have an account after transaction")?;

    let user = protoize_user(user, user_account.balance);

    let mut response = TopupResponse::new();
    response.set_user(user);
    response.set_successful(transaction.is_successful);
    Ok(serialize(response)?)
}

#[post("/register", data="<input>")]
fn register_route(db_connection: rocket::State<pg_pool::Pool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<RegisterRequest>(input)?;

    let db_connection_pool = &db_connection;
    let new_account = models::NewAccount {
        balance:    &0
    };

    use schema::accounts;
    use models::Account;

    let account = diesel::insert_into(accounts::table)
        .values(&new_account)
        .get_result::<Account>(&db_connection_pool.get()
                               .expect("failed to obtain database connection"))
        .map_err(|_| "Error inserting new account")?;

    let new_user = models::NewUser {
        phone_no:    request.get_phone_no(),
        picture_url: "",
        account_id:  &account.uid,
        username:    request.get_username(),
        password:    request.get_password()
    };

    use schema::users;
    use models::User;

    let user = diesel::insert_into(users::table)
        .values(&new_user)
        .get_result::<User>(&db_connection_pool.get()
                                    .expect("failed to obtain database connection"))
        .map_err(|_| "Error inserting new user")?;

    let user = protoize_user(user, 0);

    let mut response = RegisterResponse::new();
    response.set_user(user);
    response.set_successful(true);
    Ok(serialize(response)?)
}

#[post("/login", data="<input>")]
fn login_route(pool: rocket::State<pg_pool::Pool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<LoginRequest>(input)?;

    let username = request.get_username();
    let password = request.get_password();

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
        response.set_user(user);
        response.set_successful(true);
    } else {
        response.set_successful(false);
    }

    Ok(serialize(response)?)
}

fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let database_connection = pg_pool::init(&database_url);

    rocket::ignite()
        .manage(database_connection)
        .mount("/", routes![
               hello_route,
               register_route,
               login_route,
               topup_route,
               transaction_route,
               get_transactions_route,
               add_contact_route,
               get_contacts_route,
               get_user_route,
        ])
        .launch();
}
