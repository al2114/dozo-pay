#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;
// #[macro_use]
extern crate rocket_contrib;

// #[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_codegen;
extern crate lazy_static;
extern crate dotenv;
extern crate r2d2;
extern crate r2d2_diesel;

mod pg_pool;
pub use pg_pool::DbConn;

mod schema;
// mod models;

use dotenv::dotenv;
use std::env;

#[post("/register", data="<input>")]
fn hello(input: String) -> String {
    format!("Hello, {} year old named {}!", age, name)
}

fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    rocket::ignite()
        .manage(pg_pool::init(&database_url))
        .mount("/", routes![hello, hi])
        .launch();
}
