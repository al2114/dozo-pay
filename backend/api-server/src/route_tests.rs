use dotenv::dotenv;
use rocket;
use rocket::http::ContentType;
use rocket::local::Client;

use std::env;

use protos::user_messages::*;
use serde_rocket_protobuf::Proto;

fn client() -> Client {
    dotenv().ok();

    let builder = super::r2d2::Pool::builder().max_size(1);

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let database_connection = super::pg_pool::init_with_builder(&database_url, builder);
    use diesel::Connection;
    database_connection
        .get()
        .unwrap()
        .begin_test_transaction()
        .unwrap();

    Client::new(rocket::ignite().manage(database_connection).mount(
        "/",
        routes![
            super::index_route,
            super::file_route,
            super::register_route,
            super::login_route,
            super::topup_route,
            super::transaction_route,
            super::get_transactions_route,
            super::add_contact_route,
            super::get_contacts_route,
            super::get_user_route,
        ],
    )).unwrap()
}

fn register_user(
    client: &Client,
    phone_no: &str,
    username: &str,
    password: &str,
) -> Proto<RegisterResponse> {
    let mut request = RegisterRequest::new();
    request.set_phone_no(phone_no.to_string());
    request.set_username(username.to_string());
    request.set_password(password.to_string());

    let mut response = client
        .post("/register")
        .body(Proto(request).serialize().unwrap().into_inner())
        .header(ContentType::Form)
        .dispatch();

    Proto::<RegisterResponse>::deserialize(&response.body_bytes().unwrap()).unwrap()
}

#[test]
fn test_register_user() {
    let client = client();
    let register_response = register_user(&client, "074786381", "fred", "password");
    assert_eq!(register_response.get_successful(), true);
    assert_eq!(
        register_response.get_user().get_username(),
        "fred".to_string()
    )
}

fn add_contact(client: &Client, user_id: i32, contact_username: &str) -> Proto<SuccessResponse> {
    let mut request = AddContactRequest::new();
    request.set_user_id(user_id);
    request.set_contact_username(contact_username.to_string());

    let mut response = client
        .post("/contacts")
        .body(Proto(request).serialize().unwrap().into_inner())
        .header(ContentType::Form)
        .dispatch();

    Proto::<SuccessResponse>::deserialize(&response.body_bytes().unwrap()).unwrap()
}

#[test]
fn test_add_contact() {
    let client = client();
    let register_franklin = register_user(&client, "074787381", "franklin", "password");
    let register_dan = register_user(&client, "074783381", "dan", "password");

    let add_contact_response = add_contact(
        &client,
        register_franklin.get_user().get_uid(),
        register_dan.get_user().get_username(),
    );
    assert_eq!(add_contact_response.get_successful(), true);
}

fn get_contacts(client: &Client, user_id: i32) -> Proto<GetContactsResponse> {
    let mut response = client
        .get(format!("/contacts/{}", user_id))
        .header(ContentType::Form)
        .dispatch();

    Proto::<GetContactsResponse>::deserialize(&response.body_bytes().unwrap()).unwrap()
}

#[test]
fn test_get_contacts() {
    let client = client();

    let franklin = register_user(&client, "074787381", "franklin", "password");
    let dan = register_user(&client, "074783381", "dan", "password");

    let _ = add_contact(
        &client,
        franklin.get_user().get_uid(),
        dan.get_user().get_username(),
    );

    let andrew = register_user(&client, "074738381", "andrew", "password");

    let _ = add_contact(
        &client,
        franklin.get_user().get_uid(),
        andrew.get_user().get_username(),
    );

    let contacts_response = get_contacts(&client, franklin.get_user().get_uid());

    contacts_response
        .get_contacts()
        .iter()
        .for_each(|contact| println!("{}", contact.get_profile().get_uid()));

    assert_eq!(contacts_response.get_contacts().len(), 2);
    assert_eq!(
        contacts_response
            .get_contacts()
            .iter()
            .any(|contact| contact.get_profile().get_uid() == dan.get_user().get_uid()),
        true
    );
    assert_eq!(
        contacts_response
            .get_contacts()
            .iter()
            .any(|contact| contact.get_profile().get_uid() == andrew.get_user().get_uid()),
        true
    );
    assert_eq!(
        contacts_response
            .get_contacts()
            .iter()
            .any(|contact| contact.get_profile().get_uid() == franklin.get_user().get_uid()),
        false
    )
}
