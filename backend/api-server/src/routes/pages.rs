use super::transactions;
use contexts::*;
use diesel::prelude::*;
use errors::*;
use pg_pool::{PgPool, PgPooledConnection};
use rocket::http::Cookies;
use rocket::response::NamedFile;
use rocket::State;
use rocket_contrib::Template;

use std::path::{Path, PathBuf};

#[get("/")]
fn index_route() -> Result<NamedFile> {
    NamedFile::open("static/index.html").chain_err(|| "Error opening index.html")
}

#[get("/<file..>", rank = 2)]
fn file_route(file: PathBuf) -> Option<NamedFile> {
    let mut path = Path::new("static/").join(file);
    if path.extension().is_none() {
        path = path.with_extension("html")
    }
    NamedFile::open(path).ok()
}

#[get("/login")]
fn login_page() -> Template {
    use std::collections::HashMap;
    let context: HashMap<&str, &str> = HashMap::new();
    Template::render("login", context)
}

#[get("/priv/pesto/debugger")]
fn debugger_page() -> Option<NamedFile> {
    NamedFile::open(Path::new("priv/debugger.html")).ok()
}

#[get("/claims/<claim_id>")]
fn claim_page(pool: State<PgPool>, claim_id: i32, mut cookies: Cookies) -> Result<Template> {
    // TODO: Handle invalid claim_ids
    // TODO: Use private cookies
    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    let mut context = ClaimTemplateContext::default();

    let name = cookies
        .get_private("credentials")
        .and_then(|c| c.value().parse().ok())
        .and_then(|uid| get_username_with_uid(&uid, &db_connection).ok());

    if let Some(name) = name {
        context.logged_in = true;
        context.username = name;
    }

    use schema::claims;
    use schema::claims::dsl::claims as claims_sql;
    use schema::users;

    let (sender, amount, is_active) = claims_sql
        .find(claim_id)
        .inner_join(users::table.on(users::uid.eq(claims::owner_id)))
        .select((users::username, claims::amount, claims::is_active))
        .first::<(String, i32, bool)>(&db_connection)
        .chain_err(|| "Unable to find claim")?;

    context.is_active = is_active;
    context.sender = sender;
    context.amount = format!("{:.*}", 2, (amount as f64 / 100.0));
    context.claim_id = claim_id;
    Ok(Template::render("claim", &context))
}

#[get("/claims/confirm/<claim_id>")]
fn receipt_page(pool: State<PgPool>, claim_id: i32, mut cookies: Cookies) -> Result<Template> {
    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;
    let mut context = ReceiptTemplateContext::default();

    let uid: Option<i32> = cookies
        .get_private("credentials")
        .and_then(|c| c.value().parse().ok());

    use schema::claims;
    use schema::claims::dsl::claims as claims_sql;

    let is_active = claims_sql
        .find(claim_id)
        .select(claims::is_active)
        .first::<bool>(&db_connection)
        .chain_err(|| "Cannot find claim")?;

    // First check if the claim is valid
    if !is_active {
        return Ok(Template::render("receipt", context));
    }

    // Next check if the recipient details are correct
    if let Some(uid) = uid {
        let account_id = get_account_id_with_uid(&uid, &db_connection)
            .chain_err(|| "Could not get account id for user id")?;

        use schema::accounts;
        use schema::users;

        let (sender_name, claim_account_id, amount) = claims_sql
            .find(claim_id)
            .inner_join(accounts::table.on(accounts::uid.eq(claims::account_id)))
            .inner_join(users::table.on(users::uid.eq(claims::owner_id)))
            .select((users::username, claims::account_id, accounts::balance))
            .first::<(String, i32, i32)>(&db_connection)
            .chain_err(|| "Unable to find claim")?;

        let _ = transactions::execute(&claim_account_id, &account_id, &amount, &db_connection)
            .chain_err(|| "Transaction execution failed")?;
        super::claims::set_received(&claim_id, &uid, &db_connection)
            .chain_err(|| "Could not set claim to received")?;

        use schema::accounts::dsl::accounts as accounts_sql;

        let new_balance = accounts_sql
            .find(account_id)
            .select(accounts::balance)
            .first::<i32>(&db_connection)
            .chain_err(|| "Unable to find account")?;

        let receiver_name = get_username_with_uid(&uid, &db_connection)
            .chain_err(|| "Could not get username for user id")?;

        context.receipt_id = format!("{}", claim_id as i64 + 400000000000);
        context.sender = sender_name;
        context.receiver = receiver_name;
        context.new_balance = format!("{:.*}", 2, (new_balance as f64 / 100.0));
        context.amount = format!("{:.*}", 2, (amount as f64 / 100.0));
        context.is_successful = true;
    }

    Ok(Template::render("receipt", context))
}

fn get_account_id_with_uid(uid: &i32, db_connection: &PgPooledConnection) -> Result<i32> {
    use schema::users;
    use schema::users::dsl::users as users_sql;

    let account_id = users_sql
        .find(uid)
        .select(users::account_id)
        .first::<i32>(db_connection)
        .chain_err(|| "Unable to find user account")?;

    Ok(account_id)
}

fn get_username_with_uid(uid: &i32, db_connection: &PgPooledConnection) -> Result<String> {
    use schema::users;
    use schema::users::dsl::users as users_sql;
    let username = users_sql
        .find(uid)
        .select(users::username)
        .first::<String>(db_connection)
        .chain_err(|| "User not found")?;
    Ok(username)
}
