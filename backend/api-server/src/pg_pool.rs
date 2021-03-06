use diesel::pg::PgConnection;
use diesel::r2d2::ConnectionManager;
use r2d2::{Builder, Pool, PooledConnection};
use rocket::http::Status;
use rocket::request::{self, FromRequest};
use rocket::{Outcome, Request, State};

use std::ops::Deref;

type ManagedPgConn = ConnectionManager<PgConnection>;
pub type PgPool = Pool<ManagedPgConn>;
pub type PgPooledConnection = PooledConnection<ManagedPgConn>;

/// Db Connection request guard type: wrapper around r2d2 pooled connection
pub struct DbConn(pub PgPooledConnection);

/// Attempts to retrieve a single connection from the managed database pool. If
/// no pool is currently managed, fails with an `InternalServerError` status. If
/// no connections are available, fails with a `ServiceUnavailable` status.
impl<'a, 'r> FromRequest<'a, 'r> for DbConn {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<DbConn, ()> {
        let pool = request.guard::<State<PgPool>>()?;
        match pool.get() {
            Ok(conn) => Outcome::Success(DbConn(conn)),
            Err(_) => Outcome::Failure((Status::ServiceUnavailable, ())),
        }
    }
}

// For the convenience of using an &DbConn as an &SqliteConnection.
impl Deref for DbConn {
    type Target = PgConnection;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

pub fn init(database_url: &str) -> PgPool {
    init_with_builder(database_url, Pool::builder())
}

pub fn init_with_builder(database_url: &str, builder: Builder<ManagedPgConn>) -> PgPool {
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    builder.build(manager).expect("Failed to create pool.")
}
