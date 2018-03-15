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
extern crate r2d2_diesel;

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

fn update_balances(transaction: &models::Transaction, db_connection: &rocket::State<pg_pool::Pool>) -> Result<(bool, models::Account), String> {
    use schema::accounts::dsl::accounts as accounts_sql;
    use schema::accounts;
    use models::Account;

    let payer_account_query = accounts_sql.find(transaction.payer_id);
    let mut payer_account = payer_account_query
        .first::<Account>(&*db_connection.get().expect("failed to obtain database connection"))
        .map_err(|_| "Account not found")?;
    if payer_account.balance >= transaction.amount {
        payer_account = diesel::update(payer_account_query)
            .set(accounts::balance.eq(accounts::balance - transaction.amount))
            .get_result::<Account>(&*db_connection.get().expect(
                    "failed to obtain database connection"))
            .map_err(|_| "Decrement update failed")?;
        diesel::update(accounts_sql.find(transaction.payee_id))
            .set(accounts::balance.eq(accounts::balance + transaction.amount))
            .execute(&*db_connection.get().expect(
                    "failed to obtain database connection"))
            .map_err(|_| "Increment update failed")?;
        Ok((true, payer_account))
    } else {
        Ok((false, payer_account))
    }
}

fn execute_transaction(payer_id: &i32, payee_id: &i32, amount: &i32, db_connection: &rocket::State<pg_pool::Pool>) -> Result<(models::Account, models::Transaction), String> {
    let new_transaction = models::NewTransaction {
        payer_id: &payer_id,
        payee_id: &payee_id,
        amount: &amount
    };

    use schema::transactions;
    use models::Transaction;

    let transaction = diesel::insert_into(transactions::table)
        .values(&new_transaction)
        .get_result::<Transaction>(&*db_connection.get().expect(
                "failed to obtain database connection"))
        .map_err(|_| "Error inserting new transaction")?;

    let (success, account) = update_balances(&transaction, &db_connection)?;

    if success {
        use schema::transactions::dsl::transactions as transactions_sql;

            diesel::update(transactions_sql.find(transaction.uid))
            .set(transactions::successful.eq(true))
            .execute(&*db_connection.get().expect("failed to obtain database conncetion"))
            .map_err(|_| "Error updating failed flag")?;
    }

    Ok((account, transaction))
}

#[post("/pay", data="<input>")]
fn transaction_route(db_connection: rocket::State<pg_pool::Pool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    use protos::user_messages::TransactionRequest;
    let request = deserialize::<TransactionRequest>(input)?;
    let payer_id = request.get_payer_id();
    let payee_id = request.get_payee_id();

    use schema::users::dsl::users;
    use models::User;

    let payer = users.find(payer_id)
        .first::<User>(&*db_connection.get().expect("failed to obtain database connection"))
        .map_err(|_| "User not found")?;
    let payee = users.find(payee_id)
        .first::<User>(&*db_connection.get().expect("failed to obtain database connection"))
        .map_err(|_| "User not found")?;

    let (account, transaction) = execute_transaction(&payer.account_id, &payee.account_id, &request.amount, &db_connection)?;

    let proto_user = protoize_user(payer, account.balance);
    let mut response = protos::user_messages::TransactionResponse::new();
    response.set_user(proto_user);
    response.set_transaction_id(transaction.uid);
    response.set_successful(true);
    Ok(serialize(response)?)
}

#[post("/topup", data="<input>")]
fn topup_route(db_connection: rocket::State<pg_pool::Pool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<protos::user_messages::TopupRequest>(input)?;

    use schema::users::dsl::users as users_sql;
    use models::User;

    let user = users_sql.find(request.get_uid())
        .first::<User>(&*db_connection.get().expect("failed to obtain database connection"))
        .map_err(|_| "User not found")?;

    use schema::accounts::dsl::accounts as accounts_sql;
    use schema::accounts;
    use models::Account;

    let master_id = 0;
    let master_account = diesel::update(accounts_sql.find(master_id))
        .set(accounts::balance.eq(accounts::balance + request.get_amount()))
        .get_result::<Account>(&*db_connection.get().expect("failed to obtain database connection"))
        .map_err(|_| "Master account does not exist")?;

    let mut user_account = accounts_sql.find(user.account_id)
        .first::<Account>(&*db_connection.get().expect("failed to obtain database connection"))
        .map_err(|_| "User does not have an account")?;

    let _ = execute_transaction(&master_account.uid, &user_account.uid, &request.amount, &db_connection)?;

    user_account = accounts_sql.find(user.account_id)
        .first::<Account>(&*db_connection.get().expect("failed to obtain database connection"))
        .map_err(|_| "User does not have an account after transaction")?;

    let proto_user = protoize_user(user, user_account.balance);

    use protos::user_messages::TopupResponse;

    let mut response = TopupResponse::new();
    response.set_user(proto_user);
    response.set_successful(true);
    Ok(serialize(response)?)
}

#[post("/register", data="<input>")]
fn register_route(db_connection: rocket::State<pg_pool::Pool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    let request = deserialize::<protos::user_messages::RegisterRequest>(input)?;

    let db_connection_pool = &*db_connection;
    let new_account = models::NewAccount {
        balance:    &0
    };

    use schema::accounts;
    use models::Account;

    let account = diesel::insert_into(accounts::table)
        .values(&new_account)
        .get_result::<Account>(&*db_connection_pool.get()
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
        .get_result::<User>(&*db_connection_pool.get()
                                    .expect("failed to obtain database connection"))
        .map_err(|_| "Error inserting new user")?;

    let proto_user = protoize_user(user, 0);

    use protos::user_messages::RegisterResponse;
    let mut response = RegisterResponse::new();
    response.set_user(proto_user);
    response.set_successful(true);
    Ok(serialize(response)?)
}

#[post("/login", data="<input>")]
fn login_route(db_connection: rocket::State<pg_pool::Pool>, input: Vec<u8>) -> Result<Vec<u8>, String> {
    use protos::user_messages::LoginRequest;
    let request = deserialize::<LoginRequest>(input)?;

    let username = request.get_username();
    let password = request.get_password();

    let db_connection_pool = &*db_connection;

    use schema::users;

    let user = users::table
        .filter(users::username.eq(username))
        .first::<models::User>(&*db_connection_pool.get()
                               .expect("failed to obtain database connection"))
        .map_err(|_| "User not found")?;

    use schema::accounts::dsl::accounts as accounts_sql;
    use models::Account;

    let account = accounts_sql.find(user.account_id)
        .first::<Account>(&*db_connection_pool.get()
                          .expect("failed to obtain database connection"))
        .map_err(|_| "User has no account")?;

    use protos::user_messages::LoginResponse;
    let mut response = LoginResponse::new();

    if user.password == password {
        let proto_user = protoize_user(user, account.balance);
        response.set_user(proto_user);
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
               transaction_route
        ])
        .launch();
}
