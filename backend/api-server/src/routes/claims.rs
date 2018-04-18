use diesel;
use diesel::prelude::*;
use errors::*;
#[cfg(feature = "notifications")]
use failure::Fail;
use models;
use pg_pool::{PgPool, PgPooledConnection};
use protoize;
use protos;
use protos::user_messages::{AcceptClaimRequest, AcceptClaimResponse, ClaimInfoResponse,
                            CreateClaimRequest, CreateClaimResponse, RevokeClaimRequest};
use rocket::State;
use serde_rocket_protobuf::{Proto, ProtoResult};
use APNsClient;
#[cfg(feature = "notifications")]
use Notification;

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

        let _ =
            super::transactions::execute(&owner.account_id, &account.uid, &amount, &db_connection)
                .chain_err(|| "Transaction execution failed")?;

        let mut response = CreateClaimResponse::new();
        response.set_successful(true);
        response.set_claim(protoize::claim(claim, owner, None));
        Ok(Proto(response))
    })
}

#[post("/claims/accept", data = "<request>")]
fn accept_claim_route(
    pool: State<PgPool>,
    apns_client: State<APNsClient>,
    request: Proto<AcceptClaimRequest>,
) -> ProtoResult<AcceptClaimResponse> {
    let claim_id = request.get_claim_id();
    let receiver_id = request.get_receiver_id();

    let db_connection = pool.get()
        .chain_err(|| "Failed to obtain database connection")?;
    let (claim, owner_username, receiver_device_tokens) =
        accept_claim(&db_connection, claim_id, receiver_id).chain_err(|| "Could not accept claim")?;

    #[cfg(feature = "notifications")]
    accept_claim_route_send_notification(
        apns_client,
        &claim,
        owner_username,
        receiver_device_tokens,
    )?;
    #[cfg(not(feature = "notifications"))]
    let _ = apns_client;
    let _ = owner_username;
    let _ = receiver_device_tokens;

    let mut response = AcceptClaimResponse::new();
    response.set_claim(claim);
    response.set_successful(true);
    Ok(Proto(response))
}

#[cfg(feature = "notifications")]
fn accept_claim_route_send_notification(
    apns_client: State<APNsClient>,
    claim: &protos::models::Claim,
    owner_username: String,
    receiver_device_tokens: Vec<String>,
) -> Result<()> {
    let amount = claim.amount;

    for device_token in receiver_device_tokens {
        let notification = Notification::builder("pay.pesto.dozo".to_string(), device_token)
            .title("New Transaction")
            .body(format!(
                "Received £{:.*} (via claim) from @{}",
                2,
                amount as f64 / 100.0,
                owner_username
            ))
            .data(json!({
                "notificationIdentifier": "receiveTransaction",
            }))
            .build();
        apns_client
            .send(notification)
            .map_err(|e| e.compat())
            .chain_err(|| "Notification send failed")?;
    }
    Ok(())
}

fn accept_claim(
    db_connection: &PgPooledConnection,
    claim_id: i32,
    receiver_id: i32,
) -> Result<(protos::models::Claim, String, Vec<String>)> {
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
        super::transactions::execute(&account_id, &receiver.account_id, &balance, &db_connection)
            .chain_err(|| "Transaction execution failed")?;
    set_received(&claim_id, &receiver_id, &db_connection)
        .chain_err(|| "Failed to set claim to received")?;

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

    let owner_username = owner.username.clone();
    let receiver_device_tokens = receiver.device_tokens.clone();
    let claim = protoize::claim(claim, owner, Some(receiver));
    Ok((claim, owner_username, receiver_device_tokens))
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

    let (claim, _, _) =
        accept_claim(&db_connection, claim_id, owner_id).chain_err(|| "Failed to accept claim")?;

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
