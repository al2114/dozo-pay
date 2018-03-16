use r2d2;
use diesel::pg::PgConnection;
use diesel::r2d2::ConnectionManager;

type ManagedPgConn = ConnectionManager<PgConnection>;
pub type Pool = r2d2::Pool<ManagedPgConn>;
pub type PooledConnection = r2d2::PooledConnection<ManagedPgConn>;

use std::ops::Deref;
use rocket::http::Status;
use rocket::request::{self, FromRequest};
use rocket::{Request, State, Outcome};
/// Db Connection request guard type: wrapper around r2d2 pooled connection
pub struct DbConn(pub PooledConnection);

/// Attempts to retrieve a single connection from the managed database pool. If
/// no pool is currently managed, fails with an `InternalServerError` status. If
/// no connections are available, fails with a `ServiceUnavailable` status.
impl<'a, 'r> FromRequest<'a, 'r> for DbConn {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<DbConn, ()> {
        let pool = request.guard::<State<Pool>>()?;
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

pub fn init(database_url: &str) -> Pool {
    init_with_builder(database_url, r2d2::Pool::builder())
}

pub fn init_with_builder(database_url: &str, builder: r2d2::Builder<ManagedPgConn>) -> Pool {
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    builder.build(manager).expect("Failed to create pool.")
}
