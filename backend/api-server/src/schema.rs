table! {
    users (uid) {
        uid -> Int4,
        phone_no -> Varchar,
        picture_url -> Nullable<Varchar>,
        account_id -> Int4,
        username -> Varchar,
        password -> Varchar,
    }
}
