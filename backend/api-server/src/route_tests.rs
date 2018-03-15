use super::rocket;
use rocket::local::Client;
use rocket::http::Status;
use rocket::http::ContentType;

use std::io::Cursor;
use std::env;

use dotenv::dotenv;
use protobuf::Message;
use protobuf::{CodedOutputStream};
use protobuf::{CodedInputStream};

pub type PgConnection = super::diesel::pg::PgConnection;

fn client() -> Client {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let database_connection = super::pg_pool::init(&database_url);

    Client::new(rocket::ignite()
        .manage(database_connection)
        .mount("/", routes![
               super::hello_route,
               super::register_route,
               super::login_route,
               super::topup_route,
               super::transaction_route
        ])).unwrap()
}

fn test(uri: &str, expected: String) {
    let client = client();
    assert_eq!(client.get(uri).dispatch().body_string(), Some(expected));
}

fn test_404(uri: &str) {
    let client = client();
    assert_eq!(client.get(uri).dispatch().status(), Status::NotFound);
}

#[test]
fn test_register_user() {
    let client = client();
    use super::protos::user_messages::RegisterRequest;
    let mut request = RegisterRequest::new();
    request.set_phone_no("012387213".to_string());
    request.set_username("username".to_string());
    request.set_password("password".to_string());

    let mut response = client
        .post("/register")
        .body(super::serialize(request).unwrap())
        .header(ContentType::Form)
        .dispatch();

    use super::protos::user_messages::RegisterResponse;

    let proto_response = super::deserialize::<RegisterResponse>(response.body_bytes().unwrap()).unwrap();

    assert_eq!(
        proto_response.get_successful(),
        true
    )
}

#[test]
fn test_topup() {
    let client = client();
    let mut request = super::protos::user_messages::TopupRequest::new();
    request.set_uid(2);
    request.set_amount(500);

    let mut response = client
        .post("/topup")
        .body(super::serialize(request).unwrap())
        .header(ContentType::Form)
        .dispatch();
}


#[test]
fn test_transact() {
    let client = client();
    let mut request = super::protos::user_messages::TransactionRequest::new();
    request.set_payer_id(2);
    request.set_payee_id(1);
    request.set_amount(200);
    let request_body = super::serialize(request).unwrap();

    let mut response = client
        .post("/pay")
        .body(request_body)
        .header(ContentType::Form)
        .dispatch();
}

#[test]
fn test_failing_hello() {
    test_404("/hello/Mike/1000");
    test_404("/hello/Mike/-129");
    test_404("/hello/Mike/-1");
}
