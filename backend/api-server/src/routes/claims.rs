use super::transactions;
use diesel;
use diesel::prelude::*;
use errors::*;
use models;
use pg_pool::{PgPool, PgPooledConnection};
use protoize;
use protos;
use protos::user_messages::{AcceptClaimRequest, AcceptClaimResponse, CreateClaimRequest,
                            CreateClaimResponse, RevokeClaimRequest};
use rocket::State;
use serde_rocket_protobuf::{Proto, ProtoResult};

#[post("/claims/create", data = "<request>")]
fn create_claim_route(
    pool: State<PgPool>,
    request: Proto<CreateClaimRequest>,
) -> ProtoResult<CreateClaimResponse> {
    let amount = request.get_amount();
    let owner_id = request.get_owner_id();

    let new_account = models::NewAccount { balance: &0 };

    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use models::Account;
    use schema::accounts;
    use schema::accounts::dsl::accounts as accounts_sql;

    let account = diesel::insert_into(accounts::table)
        .values(&new_account)
        .get_result::<Account>(&db_connection)
        .chain_err(|| "Error inserting new account")?;

    let new_claim = models::NewClaim {
        account_id: &account.uid,
        owner_id: &owner_id,
        amount: &amount,
    };

    use models::Claim;
    use schema::claims;

    use models::User;
    use schema::users::dsl::users as users_sql;

    let owner = users_sql
        .find(owner_id)
        .first::<User>(&db_connection)
        .chain_err(|| "Unable to find user")?;
    let claim = diesel::insert_into(claims::table)
        .values(&new_claim)
        .get_result::<Claim>(&db_connection)
        .chain_err(|| "Error inserting new claim")?;

    let _ = transactions::execute(&owner.account_id, &account.uid, &amount, &db_connection)?;

    let account_balance = accounts_sql
        .find(account.uid)
        .select(accounts::balance)
        .first::<i32>(&db_connection)
        .chain_err(|| "Unable to find account")?;

    let mut response = CreateClaimResponse::new();
    response.set_successful(true);
    response.set_claim(protoize::claim(claim, owner, None, account_balance));
    Ok(Proto(response))
}

#[post("/claims/accept", data = "<request>")]
fn accept_claim_route(
    pool: State<PgPool>,
    request: Proto<AcceptClaimRequest>,
) -> ProtoResult<AcceptClaimResponse> {
    let claim_id = request.get_claim_id();
    let receiver_id = request.get_receiver_id();

    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;
    let claim = accept_claim(&db_connection, claim_id, receiver_id)?;

    let mut response = AcceptClaimResponse::new();
    response.set_claim(claim);
    response.set_successful(true);
    Ok(Proto(response))
}

fn accept_claim(
    db_connection: &PgPooledConnection,
    claim_id: i32,
    receiver_id: i32,
) -> Result<protos::models::Claim> {
    use models::Claim;
    use schema::accounts;
    use schema::claims;
    use schema::claims::dsl::claims as claims_sql;

    let (account_id, balance) = claims_sql
        .find(claim_id)
        .inner_join(accounts::table.on(accounts::uid.eq(claims::account_id)))
        .select((claims::account_id, accounts::balance))
        .first::<(i32, i32)>(db_connection)
        .chain_err(|| "Unable to find claim")?;

    use models::User;
    use schema::users::dsl::users as users_sql;
    let receiver = users_sql
        .find(receiver_id)
        .first::<User>(db_connection)
        .chain_err(|| "Unable to find receiver account")?;

    let _ = transactions::execute(&account_id, &receiver.account_id, &balance, &db_connection)?;
    set_received(&claim_id, &receiver_id, &db_connection)?;

    let claim = diesel::update(claims_sql.find(claim_id))
        .set((
            claims::receiver_id.eq(receiver_id),
            claims::is_active.eq(false),
        ))
        .get_result::<Claim>(db_connection)
        .chain_err(|| "Unable to update claim")?;

    let owner = users_sql
        .find(claim.owner_id)
        .first::<User>(db_connection)
        .chain_err(|| "Unable to find claim owner")?;

    let claim = protoize::claim(claim, owner, Some(receiver), balance);
    Ok(claim)
}

#[post("/claims/revoke", data = "<request>")]
fn revoke_claim_route(
    pool: State<PgPool>,
    request: Proto<RevokeClaimRequest>,
) -> ProtoResult<AcceptClaimResponse> {
    let claim_id = request.get_claim_id();

    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use schema::claims;
    use schema::claims::dsl::claims as claims_sql;

    let owner_id = claims_sql
        .find(claim_id)
        .select(claims::owner_id)
        .first::<i32>(&db_connection)
        .chain_err(|| "Unable to find claim")?;

    let claim = accept_claim(&db_connection, claim_id, owner_id)?;

    let mut response = AcceptClaimResponse::new();
    response.set_claim(claim);
    response.set_successful(true);

    Ok(Proto(response))
}

pub fn set_received(
    claim_id: &i32,
    receiver_id: &i32,
    db_connection: &PgPooledConnection,
) -> Result<()> {
    use schema::claims;
    use schema::claims::dsl::claims as claims_sql;
    diesel::update(claims_sql.find(claim_id))
        .set((
            claims::receiver_id.eq(receiver_id),
            claims::is_active.eq(false),
        ))
        .execute(db_connection)
        .chain_err(|| "Cannot find claim")?;
    Ok(())
}
