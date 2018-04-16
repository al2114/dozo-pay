use models;
use protos;

pub fn user(user: models::User, balance: i32) -> protos::models::User {
    let mut proto_user = protos::models::User::new();
    proto_user.set_uid(user.uid);
    proto_user.set_phone_no(user.phone_no);
    proto_user.set_picture_url(user.picture_url.unwrap_or("".to_string()));
    proto_user.set_balance(balance);
    proto_user.set_username(user.username);
    proto_user
}

pub fn claim(
    claim: models::Claim,
    owner: models::User,
    receiver: Option<models::User>,
) -> protos::models::Claim {
    let mut proto_claim = protos::models::Claim::new();
    proto_claim.set_uid(claim.uid);
    proto_claim.set_owner(profile(owner));
    receiver.map(|receiver| {
        proto_claim.set_receiver(profile(receiver));
    });
    proto_claim.set_amount(claim.amount);
    proto_claim
}

pub fn get_claim_status(claim: &models::Claim) -> protos::models::ClaimStatus {
    use protos::models::ClaimStatus;
    if let Some(receiver_id) = claim.receiver_id {
        if claim.owner_id == receiver_id {
            return ClaimStatus::REVOKED;
        } else {
            return ClaimStatus::CLAIMED;
        }
    } else {
        return ClaimStatus::UNCLAIMED;
    }
}

pub fn contact(contact: models::Contact, username: String) -> protos::models::Contact {
    let mut proto_contact = protos::models::Contact::new();
    let mut profile = protos::models::Profile::new();
    profile.set_uid(contact.contact_id);
    profile.set_username(username);
    proto_contact.set_profile(profile);
    proto_contact.set_trusted(true);
    proto_contact
}

pub fn transaction(
    transaction: models::Transaction,
    account_holder: models::AccountHolder,
    transaction_type: protos::models::Transaction_Type,
) -> protos::models::Transaction {
    let mut proto_transaction = protos::models::Transaction::new();
    match account_holder {
        models::AccountHolder::User(user) => {
            proto_transaction.set_user_account_holder(profile(user));
            proto_transaction.set_account_holder_type(protos::models::AccountHolderType::USER);
        }
        models::AccountHolder::Claim(model_claim, claim_owner, claim_receiver) => {
            proto_transaction.set_claim_account_holder(claim(
                model_claim,
                claim_owner,
                claim_receiver,
            ));
            proto_transaction.set_account_holder_type(protos::models::AccountHolderType::CLAIM);
        }
    };
    proto_transaction.set_transaction_type(transaction_type);
    proto_transaction.set_amount(transaction.amount);
    let mut timestamp = ::protobuf::well_known_types::Timestamp::new();
    timestamp.set_seconds(transaction.created_at.timestamp());
    timestamp.set_nanos(transaction.created_at.timestamp_subsec_nanos() as i32);
    proto_transaction.set_timestamp(timestamp);
    proto_transaction
}

fn profile(user: models::User) -> protos::models::Profile {
    let mut profile = protos::models::Profile::new();
    profile.set_uid(user.uid);
    profile.set_username(user.username);
    profile
}
