use super::rocket;
use rocket::local::Client;
use rocket::http::Status;
use rocket::http::ContentType;

use protobuf::Message;
use protobuf::{CodedOutputStream};

use std::io::{BufWriter, Cursor};

fn client() -> Client {
    Client::new(rocket::ignite().mount("/", routes![super::hello_route])).unwrap()
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

    assert_eq!(
        response.body_string(),
        Some(format!("hello there {}", request.phone_no)))
}

#[test]
fn test_failing_hello() {
    test_404("/hello/Mike/1000");
    test_404("/hello/Mike/-129");
    test_404("/hello/Mike/-1");
}
