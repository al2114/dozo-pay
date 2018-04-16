use diesel;
use diesel::prelude::*;
use errors::*;
use models;
use passwords::encrypt_password;
use pg_pool::{PgPool, PgPooledConnection};
use protoize;
use protos;
use protos::user_messages::{LoginRequest, LoginResponse, NoResponse, RegisterDeviceTokenRequest,
                            RegisterRequest, RegisterResponse};
use rocket::http::{Cookie, Cookies};
use rocket::State;
use serde_rocket_protobuf::{Proto, ProtoResult};
use sql_functions;

#[post("/register", data = "<request>")]
fn register_route(
    pool: State<PgPool>,
    request: Proto<RegisterRequest>,
) -> ProtoResult<RegisterResponse> {
    let username = request.get_username();
    let password = request.get_password();
    let password = &encrypt_password(&username, &password);

    let new_account = models::NewAccount { balance: &0 };

    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use models::Account;
    use schema::accounts;

    let account = diesel::insert_into(accounts::table)
        .values(&new_account)
        .get_result::<Account>(&db_connection)
        .chain_err(|| "Error inserting new account")?;

    let new_user = models::NewUser {
        phone_no: request.get_phone_no(),
        picture_url: None,
        account_id: &account.uid,
        username: username,
        password: password,
        device_token: None,
    };

    use models::User;
    use schema::users;

    let user = diesel::insert_into(users::table)
        .values(&new_user)
        .get_result::<User>(&db_connection)
        .chain_err(|| "Error inserting new user")?;

    let user = protoize::user(user, 0);

    let mut response = RegisterResponse::new();
    response.set_user(user);
    response.set_successful(true);
    Ok(Proto(response))
}

#[post("/register/device_token", data = "<request>")]
fn register_device_token_route(
    pool: State<PgPool>,
    request: Proto<RegisterDeviceTokenRequest>,
) -> ProtoResult<NoResponse> {
    let user_id = request.get_user_id();
    let device_token = request.get_device_token();

    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use schema::users;
    use schema::users::dsl::users as users_sql;

    diesel::update(users_sql.find(user_id))
        .set(users::device_token.eq(Some(device_token)))
        .execute(&db_connection)
        .chain_err(|| "User not found")?;

    Ok(Proto(NoResponse::new()))
}

#[post("/login", data = "<request>")]
fn login_route(
    mut cookies: Cookies,
    pool: State<PgPool>,
    request: Proto<LoginRequest>,
) -> ProtoResult<LoginResponse> {
    let username = request.get_username();
    let password = request.get_password();
    let password = encrypt_password(&username, &password);

    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use models::User;
    use schema::users;

    use models::Account;
    use schema::accounts;

    let (user, account) = users::table
        .filter(users::username.eq(username))
        .inner_join(accounts::table.on(users::account_id.eq(accounts::uid)))
        .first::<(User, Account)>(&db_connection)
        .chain_err(|| "User not found")?;

    let mut response = LoginResponse::new();
    if user.password == password {
        let user = protoize::user(user, account.balance);
        cookies.add_private(Cookie::new("credentials", format!("{}", user.uid)));
        response.set_user(user);
        response.set_successful(true);
    } else {
        response.set_successful(false);
    }

    Ok(Proto(response))
}

#[get("/users/<user_id>")]
fn get_user_route(pool: State<PgPool>, user_id: i32) -> ProtoResult<protos::models::User> {
    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use models::User;
    use schema::users;
    use schema::users::dsl::users as users_sql;

    use models::Account;
    use schema::accounts;

    let (user, account) = users_sql
        .find(user_id)
        .inner_join(accounts::table.on(users::account_id.eq(accounts::uid)))
        .first::<(User, Account)>(&db_connection)
        .chain_err(|| "User not found")?;

    Ok(Proto(protoize::user(user, account.balance)))
}

pub fn get_users(
    user_ids: Vec<i32>,
    db_connection: &PgPooledConnection,
) -> Result<Vec<models::User>> {
    use models::User;
    use schema::users;
    users::table
        .filter(users::uid.eq_any(user_ids.clone()))
        .order(sql_functions::idx(user_ids, users::uid))
        .load::<User>(db_connection)
        .chain_err(|| "Error loading users")
}

pub fn get_option_users(
    user_ids: Vec<Option<i32>>,
    db_connection: &PgPooledConnection,
) -> Result<Vec<Option<models::User>>> {
    let mut result: Vec<Option<models::User>> = (0..user_ids.len()).map(|_| None).collect();
    let (indices, items) = user_ids
        .into_iter()
        .enumerate()
        .filter_map(|(i, o)| o.and_then(|x| Some((i, x))))
        .unzip::<_, _, Vec<_>, Vec<_>>();
    let items = get_users(items, db_connection)?;
    for (i, v) in indices.into_iter().zip(items.into_iter()) {
        result[i] = Some(v);
    }
    Ok(result)
}
