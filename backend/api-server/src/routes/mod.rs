mod claims;
mod contacts;
mod lock;
mod pages;
mod transactions;
mod users;

use rocket::Route;

pub fn all_routes() -> Vec<Route> {
    routes![
        lock::check_passcode_route,
        users::register_route,
        users::register_device_token_route,
        users::login_route,
        users::get_user_route,
        contacts::add_contact_route,
        contacts::get_contacts_route,
        transactions::topup_route,
        transactions::transaction_route,
        transactions::get_transactions_route,
        claims::claim_info_route,
        claims::accept_claim_route,
        claims::create_claim_route,
        claims::revoke_claim_route,
        pages::index_route,
        pages::file_route,
        pages::claim_page,
        pages::receipt_page,
        pages::login_page,
        pages::debugger_page
    ]
}
