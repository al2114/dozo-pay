table! {
    accounts (uid) {
        uid -> Int4,
        balance -> Int4,
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
    }
}

allow_tables_to_appear_in_same_query!(
    accounts,
    transactions,
    users,
);
