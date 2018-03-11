table! {
    users (uid) {
        uid -> Int4,
        phone_no -> Nullable<Varchar>,
        picture_url -> Nullable<Varchar>,
        account_id -> Nullable<Int4>,
        username -> Nullable<Varchar>,
        password -> Nullable<Varchar>,
    }
}
