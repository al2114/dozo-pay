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

#[get("/")]
fn hello_route() -> String {
    let response = "Hello, world!".to_string();
    response
}

#[post("/topup", data="<input>")]
fn topup_route(db_connection: rocket::State<pg_pool::Pool>, input: String) -> String {
    let mut request = deserialize::<protos::user_messages::TopupRequest>(input);
    //let db_connection_pool = &*db_connection;

    use schema::users;

    let user = users::dsl::users.find(request.get_uid())
        .first::<models::User>(&*db_connection.get().expect("failed to obtain database connection"));

    let mut response = protos::user_messages::RegisterResponse::new();

    let mut response = protos::user_messages::LoginResponse::new();

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
 //       execute_transaction(master_account, user_account, request.amount);

        let updated_user_account = accounts::dsl::accounts.find(user.account_id)
            .first::<models::Account>(&*db_connection.get().expect("failed to obtain database connection"))
            .expect("WARNING! SOMETHING WENT WRONG: User account disappeared mid-transaction");


        let mut proto_user = protos::models::User::new();
        proto_user.set_uid(user.uid);
        proto_user.set_phone_no(user.phone_no);

        match user.picture_url {
            Some(picture_url) => proto_user.set_picture_url(picture_url),
            None              => proto_user.set_picture_url("".to_string())
        }

        proto_user.set_balance(updated_user_account.balance);
        proto_user.set_username(user.username);
        response.set_user(proto_user);
        Ok(true)
    }).unwrap_or(false);
    response.set_successful(success);
    serialize(response)

}

#[post("/register", data="<input>")]
fn register_route(db_connection: rocket::State<pg_pool::Pool>, input: String) -> String {
    let mut request = deserialize::<protos::user_messages::RegisterRequest>(input);

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

    let mut proto_user = protos::models::User::new();
    proto_user.set_uid(user.uid);
    proto_user.set_phone_no(user.phone_no);

    match user.picture_url {
        Some(picture_url) => proto_user.set_picture_url(picture_url),
        None              => proto_user.set_picture_url("".to_string())
    }

    proto_user.set_balance(0);
    proto_user.set_username(user.username);

    let mut response = protos::user_messages::RegisterResponse::new();
    response.set_user(proto_user);
    response.set_successful(true);

    serialize(response)
    //format!("{}",response_body)
    //format!("hello there {}", request.phone_no)
}

#[post("/login", data="<input>")]
fn login_route(db_connection: rocket::State<pg_pool::Pool>, input: String) -> String {
    let mut request = deserialize::<protos::user_messages::LoginRequest>(input);

    let username = request.get_username();
    let password = request.get_password();

    let db_connection_pool = &*db_connection;

    use schema::users;

    let user = users::table
        .filter(users::username.eq(username))
        .first::<models::User>(&*db_connection_pool.get().expect(
                "failed to obtain database connection"));

    let mut response = protos::user_messages::LoginResponse::new();

    match user {
        Ok(user) => {
            let mut proto_user = protos::models::User::new();
            proto_user.set_uid(user.uid);
            proto_user.set_phone_no(user.phone_no);

            match user.picture_url {
                Some(picture_url) => proto_user.set_picture_url(picture_url),
                None              => proto_user.set_picture_url("".to_string())
            }

            use schema::accounts;

            let account = accounts::dsl::accounts.find(user.account_id)
                .first::<models::Account>(&*db_connection_pool.get().expect(
                        "failed to obtain database connection"));

            match account {
                Ok(account) => proto_user.set_balance(account.balance),
                Err(e)      => {
                    proto_user.set_balance(0);
                    println!("WARNING! SOMETHING MAY BE BROKEN: User {} has no account", user.account_id);
                }
            }

            proto_user.set_username(user.username);

            if user.password == password {
                response.set_user(proto_user);
                response.set_successful(true);
            } else {
                response.set_successful(false);
            }
        },
        Err(e) => response.set_successful(false)
    }

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
        .mount("/", routes![hello_route, register_route, login_route])
        .launch();
}
