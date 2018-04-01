table! {
    accounts (uid) {
        uid -> Int4,
        balance -> Int4,
        created_at -> Timestamp,
    }
}

table! {
    claims (uid) {
        uid -> Int4,
        account_id -> Int4,
        owner_id -> Int4,
        receiver_id -> Nullable<Int4>,
        is_active -> Bool,
        created_at -> Timestamp,
        amount -> Int4,
    }
}

table! {
    contacts (user_id, contact_id) {
        user_id -> Int4,
        contact_id -> Int4,
        is_trusted -> Bool,
        created_at -> Timestamp,
    }
}

table! {
    transactions (uid) {
        uid -> Int4,
        payer_id -> Int4,
        payee_id -> Int4,
        amount -> Int4,
        is_successful -> Bool,
        created_at -> Timestamp,
    }
}

table! {
    users (uid) {
        uid -> Int4,
        phone_no -> Varchar,
        picture_url -> Nullable<Varchar>,
        account_id -> Int4,
        username -> Varchar,
        password -> Bpchar,
        created_at -> Timestamp,
        device_token -> Nullable<Varchar>,
    }
}

allow_tables_to_appear_in_same_query!(accounts, claims, contacts, transactions, users,);
