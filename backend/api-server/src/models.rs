use super::schema::users;

#[derive(Queryable)]
pub struct User {
    pub uid: i32,
    pub phone_no: String,
    pub picture_url: Option<String>,
    pub account_id: i32,
    pub username: String,
    pub password: String
}

#[derive(Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub phone_no: &'a str,
    pub picture_url: &'a str,
    pub account_id: &'a i32,
    pub username: &'a str,
    pub password: &'a str
}

use super::schema::accounts;

#[derive(Queryable)]
pub struct Account {
    pub uid: i32,
    pub balance: i32
}

#[derive(Insertable)]
#[table_name = "accounts"]
pub struct NewAccount<'a> {
    pub balance: &'a i32
}
