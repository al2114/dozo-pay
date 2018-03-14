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
extern crate lazy_static;
extern crate dotenv;
extern crate r2d2;
extern crate r2d2_diesel;

use protobuf::Message;
use protobuf::{CodedInputStream};
use protobuf::{CodedOutputStream};

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


fn deserialize<T: ::protobuf::MessageStatic>(data: String) -> T {
    let mut proto = T::new();
    let data_bytes = data.into_bytes();
    let mut cis = CodedInputStream::from_bytes(&data_bytes);
    proto.merge_from(&mut cis);
    proto
}


fn serialize<T: ::protobuf::MessageStatic>(proto: T) -> String {
    let mut data = String::new();
    {
        let mut buf = Cursor::new(unsafe { data.as_mut_vec() });
        let mut cos = CodedOutputStream::new(&mut buf);
        proto.write_to(&mut cos);
        cos.flush();
    }
    data
}

fn create_proto_user(user: models::User, balance: i32) -> protos::models::User {
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

fn update_balances(transaction: &models::Transaction, db_connection: &rocket::State<pg_pool::Pool>) -> models::Account {
    use schema::accounts;
    // TODO: Flag transaction with update flag on success? Balances need to get updated atomically? Consider
    // http://techblog.net-a-porter.com/2013/08/dbixmultirow-updating-multiple-database-rows-quickly-and-easily/

    let payer = diesel::update(accounts::table)
        .set(accounts::balance.eq(accounts::balance - transaction.amount))
        .filter(accounts::uid.eq(transaction.payer_id))
        .get_result::<models::Account>(&*db_connection.get().expect(
                "failed to obtain database connection")).unwrap();
    diesel::update(accounts::table)
        .set(accounts::balance.eq(accounts::balance + transaction.amount))
        .filter(accounts::uid.eq(transaction.payer_id))
        .execute(&*db_connection.get().expect(
                "failed to obtain database connection"));
    payer
}

fn execute_transaction(payer_id: &i32, payee_id: &i32, amount: &i32, db_connection: &rocket::State<pg_pool::Pool>) -> (models::Account, models::Transaction) {
    //TODO: Check if payer has enough balance
    let new_transaction = models::NewTransaction {
        payer_id: &payer_id,
        payee_id: &payee_id,
        amount: &amount
    };
    use schema::transactions;
    let transaction = diesel::insert_into(transactions::table)
        .values(&new_transaction)
        .get_result::<models::Transaction>(&*db_connection.get().expect(
                "failed to obtain database connection"))
        .expect("Error inserting new transaction");
    let account = update_balances(&transaction, &db_connection);
    (account, transaction)
}

#[post("/transaction", data="<input>")]
fn transaction_route(db_connection: rocket::State<pg_pool::Pool>, input: String) -> String {
    //TODO: Error handling
    let request = deserialize::<protos::user_messages::TransactionRequest>(input);

    use schema::users;
    let user = users::dsl::users.find(request.get_payer_id())
        .first::<models::User>(&*db_connection.get().expect("failed to obtain database connection")).unwrap();
    let payee = users::dsl::users.find(request.get_payee_id())
        .first::<models::User>(&*db_connection.get().expect("failed to obtain database connection")).unwrap();

    let (account, transaction) = execute_transaction(&user.account_id, &payee.account_id, &request.amount, &db_connection);

    let mut response = protos::user_messages::TransactionResponse::new();

    let proto_user = create_proto_user(user, account.balance);

    response.set_user(proto_user);
    response.set_successful(true);
    serialize(response)
}

#[post("/topup", data="<input>")]
fn topup_route(db_connection: rocket::State<pg_pool::Pool>, input: String) -> String {
    let request = deserialize::<protos::user_messages::TopupRequest>(input);
    //let db_connection_pool = &*db_connection;

    use schema::users;

    println!("TEST!");

    let user = users::dsl::users.find(request.get_uid())
        .first::<models::User>(&*db_connection.get().expect("failed to obtain database connection"));

    let mut response = protos::user_messages::TopupResponse::new();

    let success = user.and_then(
    |user|
    {
        let master_id = 0;
        use schema::accounts;

        let master_account = diesel::update(accounts::dsl::accounts.find(master_id))
            .set(accounts::balance.eq(request.get_amount()))
            .get_result::<models::Account>(&*db_connection.get().expect("failed to obtain database connection"))
            .expect("WARNING! SOMETHING WENT WRONG: Master account does not exists");

        let user_account = accounts::dsl::accounts.find(user.account_id)
            .first::<models::Account>(&*db_connection.get().expect("failed to obtain database connection"))
            .expect("WARNING! SOMETHING WENT WRONG: User does not have an account");

        // TODO: Uncomment when execute transaction is implemented
        execute_transaction(&master_account.uid, &user_account.uid, &request.amount, &db_connection);

        let updated_user_account = accounts::dsl::accounts.find(user.account_id)
            .first::<models::Account>(&*db_connection.get().expect("failed to obtain database connection"))
            .expect("WARNING! SOMETHING WENT WRONG: User account disappeared mid-transaction");


        let proto_user = create_proto_user(user, updated_user_account.balance);
        response.set_user(proto_user);
        Ok(true)
    }).unwrap_or(false);
    response.set_successful(success);
    serialize(response)
}

#[post("/register", data="<input>")]
fn register_route(db_connection: rocket::State<pg_pool::Pool>, input: String) -> String {
    let request = deserialize::<protos::user_messages::RegisterRequest>(input);

    let db_connection_pool = &*db_connection;
    let new_account = models::NewAccount {
        balance:    &0
    };

    use schema::accounts;

    let account = diesel::insert_into(accounts::table)
        .values(&new_account)
        .get_result::<models::Account>(&*db_connection_pool.get().expect(
                "failed to obtain database connection"))
        .expect("Error inserting new account");


    let new_user = models::NewUser {
        phone_no:    request.get_phone_no(),
        picture_url: "",
        account_id:  &account.uid,
        username:    request.get_username(),
        password:    request.get_password()
    };

    use schema::users;


    let user = diesel::insert_into(users::table)
        .values(&new_user)
        .get_result::<models::User>(&*db_connection_pool.get().expect(
                "failed to obtain database connection"))
        .expect("Error inserting new user");

    let proto_user = create_proto_user(user, 0);

    let mut response = protos::user_messages::RegisterResponse::new();
    response.set_user(proto_user);
    response.set_successful(true);

    serialize(response)
    //format!("{}",response_body)
    //format!("hello there {}", request.phone_no)
}

#[post("/login", data="<input>")]
fn login_route(db_connection: rocket::State<pg_pool::Pool>, input: String) -> String {
    let request = deserialize::<protos::user_messages::LoginRequest>(input);

    let username = request.get_username();
    let password = request.get_password();

    let db_connection_pool = &*db_connection;

    use schema::users;

    let user = users::table
        .filter(users::username.eq(username))
        .first::<models::User>(&*db_connection_pool.get().expect(
                "failed to obtain database connection"));

    let mut response = protos::user_messages::LoginResponse::new();

    let success = user.and_then(
    |user|
    {
        use schema::accounts;

        let account = accounts::dsl::accounts.find(user.account_id)
            .first::<models::Account>(&*db_connection_pool.get().expect(
                    "failed to obtain database connection"))
            .expect(&format!("WARNING: SOMETHING MAY BE BROKEN: User {} has no account", user.account_id));

        if user.password == password {
            let proto_user = create_proto_user(user, account.balance);
            response.set_user(proto_user);
            Ok(true)
        } else {
            Ok(false)
        }
    }).unwrap_or(false);

    response.set_successful(success);
    serialize(response)
}


#[post("/update/alias", data="<input>")]
fn register_alias_route(db_connection: rocket::State<pg_pool::Pool>, input: String) -> String {
    let mut request = protos::user_messages::UpdateUserRequest::new();
    let request_bytes = input.into_bytes();
    let mut cis = CodedInputStream::from_bytes(&request_bytes);
    request.merge_from(&mut cis);

    let userid = request.get_uid().parse::<i32>().unwrap();
    let new_username = request.get_new_username();

    let db_connection_pool = &*db_connection;

    use schema::users::dsl::*;

    //let users = users::table.load(&*db_connection_pool.get());

    diesel::update(users.find(userid))
        .set(username.eq(new_username))
        .execute(&*db_connection_pool.get().expect(
                "failed to obtain database connection"));
//    diesel::update(users::table.filter(users::uid.eq(uid)))
//        .set(users::username.eq(new_username))
//        .execute(&*db_connection_pool.get().expect(
//                "failed to obtain database connection"));

    format!("updated {}", new_username)
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
               topup_route
        ])
        .launch();
}
