use super::schema::users;

#[derive(Queryable)]
pub struct User {
    pub uid: i32,
    pub phone_no: String,
    pub picture_url: String,
    pub account_id: i64,
    pub username: String,
}

#[derive(Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub phone_no: &'a str,
    pub picture_url: &'a str,
    pub username: &'a str,
}
