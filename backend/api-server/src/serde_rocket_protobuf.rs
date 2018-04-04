use protobuf::core::{Message, MessageStatic};
use protobuf::{CodedInputStream, CodedOutputStream};
use rocket::data;
use rocket::data::{Data, FromData};
use rocket::http::Status;
use rocket::outcome;
use rocket::request::Request;
use rocket::response;
use rocket::response::{Responder, Response};

use std::io::Cursor;
use std::ops::Deref;

pub struct Proto<T: Message + ?Sized>(pub T);
pub type ProtoResult<T> = Result<Proto<T>, String>;

impl<T: Message> Deref for Proto<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.0
    }
}

impl<'r, T: Message> Responder<'r> for Proto<T> {
    fn respond_to(self, _: &Request) -> response::Result<'r> {
        let mut buf = Cursor::new(Vec::<u8>::new());

        {
            let mut cos = CodedOutputStream::new(&mut buf);
            self.0
                .write_to(&mut cos)
                .map_err(|_| Status::new(500, "Proto write error"))?;
            cos.flush()
                .map_err(|_| Status::new(500, "CodecOutputStream flush error"))?;
        }

        Response::build().sized_body(buf).ok()
    }
}

// TODO(fyq14): Why must this be MessageStatic?
impl<T: MessageStatic> FromData for Proto<T> {
    type Error = String;

    fn from_data(_request: &Request, data: Data) -> data::Outcome<Proto<T>, String> {
        let mut vec = Vec::<u8>::new();

        let result_proto = { data.stream_to(&mut vec).map_err(|_| "hello") };

        let mut proto = T::new();
        let mut cis = CodedInputStream::from_bytes(&vec);
        let result_proto = result_proto.and_then(|_| {
            proto
                .merge_from(&mut cis)
                .map(|_| proto)
                .map_err(|_| "proto merge error")
        });

        match result_proto {
            Ok(proto) => outcome::Outcome::Success(Proto::<T>(proto)),
            Err(e) => outcome::Outcome::Failure((Status::InternalServerError, e.to_string())),
        }
    }
}
