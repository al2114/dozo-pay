#![deny(warnings)]
#![feature(plugin)]
#![plugin(rocket_codegen)]

#[cfg(feature = "notifications")]
extern crate apns;
extern crate chrono;
#[macro_use]
extern crate diesel;
extern crate dotenv;
#[macro_use]
extern crate error_chain;
extern crate failure;
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
use rocket_contrib::Template;

use std::env;

mod contexts;
mod errors;
mod models;
mod passwords;
mod pg_pool;
mod protoize;
mod protos;
mod routes;
mod schema;
mod serde_rocket_protobuf;
mod sql_functions;

#[cfg(test)]
mod tests;

#[cfg(feature = "notifications")]
fn spawn_notification_client() -> APNsClient {
    let apns_cert_path = env::var("APNS_CERT_PATH").unwrap();
    let apns_key_path = env::var("APNS_KEY_PATH").unwrap();
    let apns = APNs::new(&apns_cert_path, &apns_key_path, false).expect("APN config unsucessful");
    let apns_client = apns.new_client().expect("APN client setup unsucessful");

    apns_client
}
#[cfg(not(feature = "notifications"))]
struct APNsClient;
#[cfg(not(feature = "notifications"))]
fn spawn_notification_client() -> APNsClient {
    APNsClient {}
}

fn load_environment() {
    env::var("ENV_FILENAME")
        .map(|fname| dotenv::from_filename(&fname))
        .unwrap_or_else(|_| dotenv::dotenv())
        .ok();
}

fn main() {
    load_environment();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let database_connection = pg_pool::init(&database_url);

    let notification_client = spawn_notification_client();

    rocket::ignite()
        .manage(database_connection)
        .manage(notification_client)
        .mount("/", routes::all_routes())
        .attach(Template::fairing())
        .launch();
}
