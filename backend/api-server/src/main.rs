#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;
// #[macro_use]
extern crate rocket_contrib;

// #[macro_use]
extern crate serde_derive;

extern crate protobuf;

#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_codegen;
extern crate lazy_static;
extern crate dotenv;
extern crate r2d2;
extern crate r2d2_diesel;

use protobuf::Message;
use protobuf::{CodedInputStream};

mod pg_pool;
mod protos;
pub use pg_pool::DbConn;

mod schema;

use dotenv::dotenv;
use std::env;

#[post("/register", data="<input>")]
fn hello_route(input: String) -> String {

    let mut request = protos::user_messages::RegisterRequest::new();
    let request_bytes = input.into_bytes();
    let mut cis = CodedInputStream::from_bytes(&request_bytes);
    request.merge_from(&mut cis);

    format!("hello there {}", request.phone_no)
}

fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");

    rocket::ignite()
        .manage(pg_pool::init(&database_url))
        .mount("/", routes![hello_route])
        .launch();
}

mod tests;
