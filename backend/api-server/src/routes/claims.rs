use diesel;
use diesel::prelude::*;
use errors::*;
use models;
use pg_pool::{PgPool, PgPooledConnection};
use protoize;
use protos;
use protos::user_messages::{AcceptClaimRequest, AcceptClaimResponse, ClaimInfoResponse,
                            CreateClaimRequest, CreateClaimResponse, RevokeClaimRequest};
use rocket::State;
use serde_rocket_protobuf::{Proto, ProtoResult};

#[get("/claims/info/<claim_id>")]
fn claim_info_route(claim_id: i32, pool: State<PgPool>) -> ProtoResult<ClaimInfoResponse> {
    let db_connection = pool.get()
        .chain_err(|| "failed to obtain database connection")?;

    use models::Claim;
    use models::User;
    use schema::claims;
    use schema::claims::dsl::claims as claims_sql;
    use schema::users;

    let (claim, owner) = claims_sql
        .find(claim_id)
        .inner_join(users::table.on(users::uid.eq(claims::owner_id)))
        .first::<(Claim, User)>(&db_connection)
        .chain_err(|| "Error finding claim")?;

    let mut response = ClaimInfoResponse::new();
    response.set_status(protoize::get_claim_status(&claim));
    response.set_claim(protoize::claim(claim, owner, None));
    Ok(Proto(response))
}

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

    let _ = super::transactions::execute(&owner.account_id, &account.uid, &amount, &db_connection)?;

    let mut response = CreateClaimResponse::new();
    response.set_successful(true);
    response.set_claim(protoize::claim(claim, owner, None));
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

    let _ =
        super::transactions::execute(&account_id, &receiver.account_id, &balance, &db_connection)?;
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

    let claim = protoize::claim(claim, owner, Some(receiver));
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

//pub fn get_claims(
//claim_ids: Vec<i32>,
//db_connection: &PgPooledConnection,
//) -> Result<Vec<(models::Claim, models::User, Option<models::User>)>> {
//use models::Claim;
//use schema::claims;

//use models::User;
//use schema::users;

//Ok(claims::table
//.filter(claims::uid.eq_any(claim_ids.clone()))
//.order(sql_functions::idx(claim_ids.clone(), claims::uid))
//.inner_join(users::table.on(claims::owner_id.eq(users::uid)))
//.load::<(Claim, User)>(db_connection)
//.chain_err(|| "Claim join with owners failed")?
//.into_iter()
//.zip(
//claims::table
//.filter(claims::uid.eq_any(claim_ids.clone()))
//.order(sql_functions::idx(claim_ids, claims::uid))
//.left_outer_join(users::table.on(claims::receiver_id.eq(users::uid.nullable())))
//.select(users::all_columns.nullable())
//.load::<Option<User>>(db_connection)
//.chain_err(|| "Claim join with receivers failed")?
//.into_iter(),
//)
//.map(|((claim, owner), receiver)| (claim, owner, receiver))
//.collect())
//}
