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

use dotenv::dotenv;
use std::env;
use self::diesel::prelude::*;

mod models;
mod pg_pool;
mod protos;
mod schema;

#[cfg(test)]
mod route_tests;


#[post("/register", data="<input>")]
fn hello_route(db_connection: rocket::State<pg_pool::Pool>, input: String) -> String {

    let mut request = protos::user_messages::RegisterRequest::new();
    let request_bytes = input.into_bytes();
    let mut cis = CodedInputStream::from_bytes(&request_bytes);
    request.merge_from(&mut cis);

    let new_user = models::NewUser {
        phone_no:    request.get_phone_no(),
        picture_url: "",
        username:    request.get_username(),
        password:    request.get_password()
    };
    let db_connection_pool = &*db_connection;

    use schema::users;

    diesel::insert_into(users::table)
        .values(&new_user)
        .execute(&*db_connection_pool.get().expect(
                "failed to obtain database connection"));

    format!("hello there {}", request.phone_no)
}

fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let database_connection = pg_pool::init(&database_url);

    rocket::ignite()
        .manage(database_connection)
        .mount("/", routes![hello_route])
        .launch();
}
