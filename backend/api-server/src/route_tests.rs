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
               super::transaction_route,
               super::test_route
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
    let mut request = super::protos::user_messages::RegisterRequest::new();
    request.set_phone_no("012387213".to_string());
    request.set_username("username".to_string());
    request.set_password("password".to_string());

    let mut request_body = String::new();

    {
        let mut buf = Cursor::new(unsafe { request_body.as_mut_vec() });
        let mut cos = CodedOutputStream::new(&mut buf);
        request.write_to(&mut cos);
        cos.flush();
    }

    let mut response = client
        .post("/register")
        .body(request_body)
        .header(ContentType::Form)
        .dispatch();

    let mut proto_response = super::protos::user_messages::RegisterResponse::new();
    let response_bytes = response.body_bytes().unwrap();

    let mut cis = CodedInputStream::from_bytes(&response_bytes);
    proto_response.merge_from(&mut cis);

    assert_eq!(
        proto_response.get_successful(),
        true
    )
}

#[test]
fn test_topup() {
    let client = client();
    let mut request = super::protos::user_messages::TopupRequest::new();
    //request.set_uid(2);
    //request.set_amount(500);
    let mut request_body = String::new();

    {
        let mut buf = Cursor::new(unsafe { request_body.as_mut_vec() });
        let mut cos = CodedOutputStream::new(&mut buf);
        request.write_to(&mut cos);
        cos.flush();
    }

    let mut response = client
        .post("/topup")
        .body(request_body)
        .header(ContentType::Form)
        .dispatch();

}

#[test]
fn test_update_username() {
    let client = client();
    let mut request = super::protos::user_messages::UpdateUserRequest::new();
    request.set_uid("1".to_string());
    request.set_new_username("pesto".to_string());

    let mut request_body = String::new();

    {
        let mut buf = Cursor::new(unsafe { request_body.as_mut_vec() });
        let mut cos = CodedOutputStream::new(&mut buf);
        request.write_to(&mut cos);
        cos.flush();
    }

    let mut response = client
        .post("/update/alias")
        .body(request_body)
        .header(ContentType::Form)
        .dispatch();

    assert_eq!(
        response.body_string(),
        Some(format!("updated there {}", request.new_username)))
}

#[test]
fn test_failing_hello() {
    test_404("/hello/Mike/1000");
    test_404("/hello/Mike/-129");
    test_404("/hello/Mike/-1");
}
