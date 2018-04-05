use diesel;
use diesel::prelude::*;
use errors::*;
use models;
use pg_pool::PgPool;
use protoize;
use protos::user_messages::{AddContactRequest, GetContactsResponse, SuccessResponse};
use rocket::State;
use serde_rocket_protobuf::{Proto, ProtoResult};

#[post("/contacts", data = "<request>")]
pub fn add_contact_route(
    pool: State<PgPool>,
    request: Proto<AddContactRequest>,
) -> ProtoResult<SuccessResponse> {
    let user_id = request.get_user_id();
    let contact_username = request.get_contact_username();

    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use schema::users;
    use schema::users::dsl::users as users_sql;

    let contact_id = users_sql
        .filter(users::username.eq(contact_username))
        .select(users::uid)
        .first::<i32>(&db_connection)
        .chain_err(|| "Contact not found")?;

    let new_contact = models::NewContact {
        user_id: &user_id,
        contact_id: &contact_id,
    };

    use schema::contacts;
    diesel::insert_into(contacts::table)
        .values(&new_contact)
        .execute(&db_connection)
        .chain_err(|| "Error inserting new account")?;

    let mut response = SuccessResponse::new();
    response.set_successful(true);
    Ok(Proto(response))
}

#[get("/contacts/<user_id>")]
pub fn get_contacts_route(pool: State<PgPool>, user_id: i32) -> ProtoResult<GetContactsResponse> {
    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use models::Contact;
    use schema::contacts;

    use models::User;
    use schema::users;

    let results = contacts::table
        .filter(contacts::user_id.eq(user_id))
        .inner_join(users::table.on(contacts::contact_id.eq(users::uid)))
        .load::<(Contact, User)>(&db_connection)
        .chain_err(|| "Unable to find contacts")?;

    let contacts = results
        .into_iter()
        .map(|(contact, user)| protoize::contact(contact, user.username))
        .collect();

    let mut response = GetContactsResponse::new();
    response.set_contacts(contacts);

    Ok(Proto(response))
}
