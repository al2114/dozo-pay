use protobuf::core::{Message, MessageStatic};
use protobuf::{CodedInputStream, CodedOutputStream};
use rocket::Outcome;
use rocket::data::{self, Data, FromData};
use rocket::http::Status;
use rocket::request::Request;
use rocket::response::{self, Responder, Response};

use std::io::Cursor;
use std::ops::Deref;

use errors::*;

pub struct Proto<T: Message + ?Sized>(pub T);
pub type ProtoResult<T> = Result<Proto<T>>;

impl<T: Message> Proto<T> {
    pub fn serialize(&self) -> Result<Cursor<Vec<u8>>> {
        let mut buf = Cursor::new(Vec::new());
        {
            let mut cos = CodedOutputStream::new(&mut buf);
            self.0.write_to(&mut cos).chain_err(|| "Proto write error")?;
            cos.flush().chain_err(|| "CodecOutputStream flush error")?;
        }
        Ok(buf)
    }
}

impl<T: MessageStatic> Proto<T> {
    pub fn deserialize(data: &[u8]) -> Result<Self> {
        let mut proto = T::new();
        let mut cis = CodedInputStream::from_bytes(data);
        proto
            .merge_from(&mut cis)
            .chain_err(|| "Proto parse error")?;
        Ok(Proto(proto))
    }
}

impl<T: Message> Deref for Proto<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.0
    }
}

impl<'r, T: Message> Responder<'r> for Proto<T> {
    fn respond_to(self, _: &Request) -> response::Result<'r> {
        let cursor = self.serialize().map_err(|_| Status::InternalServerError)?;
        Response::build().sized_body(cursor).ok()
    }
}

impl<T: MessageStatic> FromData for Proto<T> {
    type Error = Error;

    fn from_data(_: &Request, data: Data) -> data::Outcome<Proto<T>, Error> {
        let mut vec = Vec::<u8>::new();
        data.stream_to(&mut vec)
            .chain_err(|| "Data stream failed")
            .and_then(|_| Self::deserialize(&vec))
            .map(|p| Outcome::Success(p))
            .unwrap_or_else(|e| Outcome::Failure((Status::InternalServerError, e)))
    }
}
