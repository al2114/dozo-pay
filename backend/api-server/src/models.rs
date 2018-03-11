use super::schema::users;

#[derive(Queryable)]
pub struct User {
    pub uid: u64,
    pub phone_no: String,
    pub picture_url: String,
    pub account_id: u64,
    pub username: String,
    pub password: String
}

#[derive(Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub phone_no: &'a str,
    pub picture_url: &'a str,
    pub username: &'a str,
    pub password: &'a str
}
