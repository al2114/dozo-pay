use super::schema::users;
use super::chrono::NaiveDateTime;
#[derive(Queryable)]
pub struct User {
    pub uid: i32,
    pub phone_no: String,
    pub picture_url: Option<String>,
    pub account_id: i32,
    pub username: String,
    pub password: String,
    pub created_at: NaiveDateTime,
    pub device_token: Option<String>,
}

#[derive(Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub phone_no: &'a str,
    pub picture_url: Option<&'a str>,
    pub account_id: &'a i32,
    pub username: &'a str,
    pub password: &'a str,
    pub device_token: Option<&'a str>,
}

use super::schema::accounts;

#[derive(Queryable)]
pub struct Account {
    pub uid: i32,
    pub balance: i32,
    pub created_at: NaiveDateTime,
}

#[derive(Insertable)]
#[table_name = "accounts"]
pub struct NewAccount<'a> {
    pub balance: &'a i32,
}

use super::schema::transactions;

#[derive(Queryable)]
pub struct Transaction {
    pub uid: i32,
    pub payer_id: i32,
    pub payee_id: i32,
    pub amount: i32,
    pub is_successful: bool,
    pub created_at: NaiveDateTime,
}

#[derive(Insertable)]
#[table_name = "transactions"]
pub struct NewTransaction<'a> {
    pub payer_id: &'a i32,
    pub payee_id: &'a i32,
    pub amount: &'a i32,
}

use super::schema::contacts;

#[derive(Queryable)]
pub struct Contact {
    pub user_id: i32,
    pub contact_id: i32,
    pub is_trusted: bool,
    pub created_at: NaiveDateTime,
}

#[derive(Insertable)]
#[table_name = "contacts"]
pub struct NewContact<'a> {
    pub user_id: &'a i32,
    pub contact_id: &'a i32,
}

use super::schema::claims;

#[derive(Queryable)]
pub struct Claim {
    pub uid: i32,
    pub account_id: i32,
    pub owner_id: i32,
    pub receiver_id: Option<i32>,
    pub is_active: bool,
    pub created_at: NaiveDateTime,
    pub amount: i32,
}

#[derive(Insertable)]
#[table_name = "claims"]
pub struct NewClaim<'a> {
    pub account_id: &'a i32,
    pub owner_id: &'a i32,
    pub amount: &'a i32,
}
