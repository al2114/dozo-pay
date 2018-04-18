use diesel;
use diesel::prelude::*;
use errors::*;
use models;
use passwords::encrypt_password;
use pg_pool::{PgPool, PgPooledConnection};
use protoize;
use protos;
use protos::user_messages::{LoginRequest, LoginResponse, LogoutRequest, NoResponse,
                            RegisterRequest, RegisterResponse};
use rocket::http::{Cookie, Cookies};
use rocket::State;
use serde_rocket_protobuf::{Proto, ProtoResult};
use sql_functions;
use std::default::Default;

#[post("/register", data = "<request>")]
fn register_route(
    pool: State<PgPool>,
    request: Proto<RegisterRequest>,
) -> ProtoResult<RegisterResponse> {
    let username = request.get_username();
    let password = request.get_password();
    let password = &encrypt_password(&username, &password);

    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;
    db_connection.transaction(|| {
        let new_account = models::NewAccount { balance: &0 };

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
    })
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

    let device_token = request.get_device_token();
    let default_device_token: &str = Default::default();
    if device_token != default_device_token {
        let mut device_tokens = user.device_tokens.clone();
        if let Err(pos) = device_tokens.binary_search(&device_token.to_string()) {
            device_tokens.insert(pos, device_token.to_string());
        }

        use schema::users::dsl::users as users_sql;
        diesel::update(users_sql.find(&user.uid))
            .set(users::device_tokens.eq(device_tokens))
            .execute(&db_connection)
            .chain_err(|| "User device token concatenation failed")?;
    }

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

#[post("/logout", data = "<request>")]
fn logout_route(pool: State<PgPool>, request: Proto<LogoutRequest>) -> ProtoResult<NoResponse> {
    let user_id = request.get_user_id();

    let device_token = request.get_device_token();
    let default_device_token: &str = Default::default();
    if device_token != default_device_token {
        let db_connection = pool.get()
            .chain_err(|| "failed to obtain database connection")?;

        use schema::users;
        use schema::users::dsl::users as users_sql;
        diesel::update(users_sql.find(user_id))
            .set(users::device_tokens.eq(sql_functions::array_remove(
                users::device_tokens,
                device_token,
            )))
            .execute(&db_connection)
            .chain_err(|| "User device token removal failed")?;
    }

    Ok(Proto(NoResponse::new()))
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
    let query = format!(
        "SELECT users.*
        FROM unnest(ARRAY{:?}::integer[]) user_id
        INNER JOIN users on users.uid = user_id",
        user_ids
    );
    diesel::sql_query(query)
        .load::<User>(db_connection)
        .chain_err(|| "Could not get users")
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
