use APNsClient;
#[cfg(feature = "notifications")]
use Notification;
use diesel;
use diesel::prelude::*;
use errors::*;
use models;
use pg_pool::{PgPool, PgPooledConnection};
use protoize;
use protos;
use protos::user_messages::{GetTransactionsResponse, TopupRequest, TopupResponse,
                            TransactionRequest, TransactionResponse};
use rocket::State;
use serde_rocket_protobuf::{Proto, ProtoResult};

#[cfg(not(feature = "notifications"))]
#[post("/pay", data = "<request>")]
fn transaction_route(
    pool: State<PgPool>,
    request: Proto<TransactionRequest>,
) -> ProtoResult<TransactionResponse> {
    let (response, _) = transaction_helper(pool, request)?;
    Ok(response)
}

#[cfg(feature = "notifications")]
#[post("/pay", data = "<request>")]
fn transaction_route(
    pool: State<PgPool>,
    apns_client: State<APNsClient>,
    request: Proto<TransactionRequest>,
) -> ProtoResult<TransactionResponse> {
    let (response, (payee, payer_username, amount)) = transaction_helper(pool, request)?;
    if let Some(device_token) = payee.device_token {
        let notification = Notification::builder("pay.pesto.dozo".to_string(), device_token)
            .title("New Transaction")
            .body(format!(
                "Received £{} from @{}",
                amount / 100,
                payer_username
            ))
            .build();
        apns_client
            .send(notification)
            .map_err(|_| "Notification send failed")?;
    }
    Ok(response)
}

#[post("/topup", data = "<request>")]
fn topup_route(pool: State<PgPool>, request: Proto<TopupRequest>) -> ProtoResult<TopupResponse> {
    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use models::User;
    use schema::users;
    use schema::users::dsl::users as users_sql;

    use models::Account;
    use schema::accounts;
    use schema::accounts::dsl::accounts as accounts_sql;

    let master_id = 0;
    let master_account = diesel::update(accounts_sql.find(master_id))
        .set(accounts::balance.eq(accounts::balance + request.get_amount()))
        .get_result::<Account>(&db_connection)
        .chain_err(|| "Master account does not exist")?;

    let (user, mut user_account) = users_sql
        .find(request.get_uid())
        .inner_join(accounts::table.on(users::account_id.eq(accounts::uid)))
        .first::<(User, Account)>(&db_connection)
        .chain_err(|| "User not found")?;

    let (_, transaction) = execute(
        &master_account.uid,
        &user_account.uid,
        &request.amount,
        &db_connection,
    )?;

    user_account = accounts_sql
        .find(user.account_id)
        .first::<Account>(&db_connection)
        .chain_err(|| "User does not have an account after transaction")?;

    let user = protoize::user(user, user_account.balance);

    let mut response = TopupResponse::new();
    response.set_user(user);
    response.set_successful(transaction.is_successful);
    Ok(Proto(response))
}

#[get("/transactions/<user_id>")]
pub fn get_transactions_route(
    pool: State<PgPool>,
    user_id: i32,
) -> ProtoResult<GetTransactionsResponse> {
    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use models::User;
    use schema::users;
    use schema::users::dsl::users as users_sql;

    use models::Transaction;
    use schema::transactions;

    let from_tids = users_sql
        .find(user_id)
        .inner_join(transactions::table.on(transactions::payee_id.eq(users::account_id)))
        .select(transactions::uid)
        .load::<i32>(&db_connection)
        .chain_err(|| "Transactions not found")?;

    let to_tids = users_sql
        .find(user_id)
        .inner_join(transactions::table.on(transactions::payer_id.eq(users::account_id)))
        .select(transactions::uid)
        .load::<i32>(&db_connection)
        .chain_err(|| "Transactions not found")?;

    let from_results = transactions::table
        .filter(transactions::uid.eq_any(from_tids))
        .inner_join(users::table.on(transactions::payer_id.eq(users::account_id)))
        .load::<(Transaction, User)>(&db_connection)
        .chain_err(|| "Transactions not found")?
        .into_iter()
        .map(|(t, u)| {
            protoize::transaction(
                t,
                models::AccountHolder::User(u),
                protos::models::Transaction_Type::FROM,
            )
        });

    let to_results = transactions::table
        .filter(transactions::uid.eq_any(to_tids))
        .inner_join(users::table.on(transactions::payee_id.eq(users::account_id)))
        .load::<(Transaction, User)>(&db_connection)
        .chain_err(|| "Transactions not found")?
        .into_iter()
        .map(|(t, u)| {
            protoize::transaction(
                t,
                models::AccountHolder::User(u),
                protos::models::Transaction_Type::TO,
            )
        });

    let mut transactions = from_results.chain(to_results).collect::<Vec<_>>();
    transactions.sort_by(|a, b| {
        b.get_timestamp()
            .get_seconds()
            .cmp(&a.get_timestamp().get_seconds())
    });
    let transactions = transactions.into_iter().collect();

    let mut response = GetTransactionsResponse::new();
    response.set_transactions(transactions);
    Ok(Proto(response))
}

pub fn execute(
    payer_id: &i32,
    payee_id: &i32,
    amount: &i32,
    db_connection: &PgPooledConnection,
) -> Result<(models::Account, models::Transaction)> {
    let new_transaction = models::NewTransaction {
        payer_id: &payer_id,
        payee_id: &payee_id,
        amount: &amount,
    };

    use models::Transaction;
    use schema::transactions;

    db_connection.transaction(|| {
        let mut transaction = diesel::insert_into(transactions::table)
            .values(&new_transaction)
            .get_result::<Transaction>(db_connection)
            .chain_err(|| "Error inserting new transaction")?;

        let (success, account) = update_balances(&transaction, db_connection)?;

        if success {
            use schema::transactions::dsl::transactions as transactions_sql;

            transaction = diesel::update(transactions_sql.find(transaction.uid))
                .set(transactions::is_successful.eq(true))
                .get_result::<Transaction>(db_connection)
                .chain_err(|| "Error updating failed flag")?;
        }

        Ok((account, transaction))
    })
}

fn update_balances(
    transaction: &models::Transaction,
    db_connection: &PgPooledConnection,
) -> Result<(bool, models::Account)> {
    use models::Account;
    use schema::accounts;
    use schema::accounts::dsl::accounts as accounts_sql;

    let payer_account_query = accounts_sql.find(transaction.payer_id);
    let mut payer_account = payer_account_query
        .first::<Account>(db_connection)
        .chain_err(|| "Account not found")?;
    if payer_account.balance >= transaction.amount {
        payer_account = diesel::update(payer_account_query)
            .set(accounts::balance.eq(accounts::balance - transaction.amount))
            .get_result::<Account>(db_connection)
            .chain_err(|| "Decrement update failed")?;
        diesel::update(accounts_sql.find(transaction.payee_id))
            .set(accounts::balance.eq(accounts::balance + transaction.amount))
            .execute(db_connection)
            .chain_err(|| "Increment update failed")?;
        Ok((true, payer_account))
    } else {
        Ok((false, payer_account))
    }
}

fn transaction_helper(
    pool: State<PgPool>,
    request: Proto<TransactionRequest>,
) -> Result<(Proto<TransactionResponse>, (models::User, String, i32))> {
    let payer_id = request.get_payer_id();
    let payee_id = request.get_payee_id();

    use models::User;
    use schema::users::dsl::users as users_sql;

    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    let payer = users_sql
        .find(payer_id)
        .first::<User>(&db_connection)
        .chain_err(|| "User not found")?;
    let payee = users_sql
        .find(payee_id)
        .first::<User>(&db_connection)
        .chain_err(|| "User not found")?;

    let (account, transaction) = execute(
        &payer.account_id,
        &payee.account_id,
        &request.amount,
        &db_connection,
    )?;

    let payer_username = payer.username.clone();
    let payer = protoize::user(payer, account.balance);
    let mut response = TransactionResponse::new();
    response.set_user(payer);
    response.set_transaction_id(transaction.uid);
    response.set_successful(true);
    Ok((Proto(response), (payee, payer_username, request.amount)))
}
