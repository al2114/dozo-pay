// This file is generated. Do not edit
// @generated

// https://github.com/Manishearth/rust-clippy/issues/702
#![allow(unknown_lints)]
#![allow(clippy)]

#![cfg_attr(rustfmt, rustfmt_skip)]

#![allow(box_pointers)]
#![allow(dead_code)]
#![allow(missing_docs)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(trivial_casts)]
#![allow(unsafe_code)]
#![allow(unused_imports)]
#![allow(unused_results)]

use protobuf::Message as Message_imported_for_functions;
use protobuf::ProtobufEnum as ProtobufEnum_imported_for_functions;

#[derive(PartialEq,Clone,Default)]
pub struct User {
    // message fields
    pub uid: i32,
    pub username: ::std::string::String,
    pub phone_no: ::std::string::String,
    pub picture_url: ::std::string::String,
    pub balance: i32,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for User {}

impl User {
    pub fn new() -> User {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static User {
        static mut instance: ::protobuf::lazy::Lazy<User> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const User,
        };
        unsafe {
            instance.get(User::new)
        }
    }

    // int32 uid = 1;

    pub fn clear_uid(&mut self) {
        self.uid = 0;
    }

    // Param is passed by value, moved
    pub fn set_uid(&mut self, v: i32) {
        self.uid = v;
    }

    pub fn get_uid(&self) -> i32 {
        self.uid
    }

    fn get_uid_for_reflect(&self) -> &i32 {
        &self.uid
    }

    fn mut_uid_for_reflect(&mut self) -> &mut i32 {
        &mut self.uid
    }

    // string username = 2;

    pub fn clear_username(&mut self) {
        self.username.clear();
    }

    // Param is passed by value, moved
    pub fn set_username(&mut self, v: ::std::string::String) {
        self.username = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_username(&mut self) -> &mut ::std::string::String {
        &mut self.username
    }

    // Take field
    pub fn take_username(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.username, ::std::string::String::new())
    }

    pub fn get_username(&self) -> &str {
        &self.username
    }

    fn get_username_for_reflect(&self) -> &::std::string::String {
        &self.username
    }

    fn mut_username_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.username
    }

    // string phone_no = 3;

    pub fn clear_phone_no(&mut self) {
        self.phone_no.clear();
    }

    // Param is passed by value, moved
    pub fn set_phone_no(&mut self, v: ::std::string::String) {
        self.phone_no = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_phone_no(&mut self) -> &mut ::std::string::String {
        &mut self.phone_no
    }

    // Take field
    pub fn take_phone_no(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.phone_no, ::std::string::String::new())
    }

    pub fn get_phone_no(&self) -> &str {
        &self.phone_no
    }

    fn get_phone_no_for_reflect(&self) -> &::std::string::String {
        &self.phone_no
    }

    fn mut_phone_no_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.phone_no
    }

    // string picture_url = 4;

    pub fn clear_picture_url(&mut self) {
        self.picture_url.clear();
    }

    // Param is passed by value, moved
    pub fn set_picture_url(&mut self, v: ::std::string::String) {
        self.picture_url = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_picture_url(&mut self) -> &mut ::std::string::String {
        &mut self.picture_url
    }

    // Take field
    pub fn take_picture_url(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.picture_url, ::std::string::String::new())
    }

    pub fn get_picture_url(&self) -> &str {
        &self.picture_url
    }

    fn get_picture_url_for_reflect(&self) -> &::std::string::String {
        &self.picture_url
    }

    fn mut_picture_url_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.picture_url
    }

    // int32 balance = 5;

    pub fn clear_balance(&mut self) {
        self.balance = 0;
    }

    // Param is passed by value, moved
    pub fn set_balance(&mut self, v: i32) {
        self.balance = v;
    }

    pub fn get_balance(&self) -> i32 {
        self.balance
    }

    fn get_balance_for_reflect(&self) -> &i32 {
        &self.balance
    }

    fn mut_balance_for_reflect(&mut self) -> &mut i32 {
        &mut self.balance
    }
}

impl ::protobuf::Message for User {
    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.uid = tmp;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.username)?;
                },
                3 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.phone_no)?;
                },
                4 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.picture_url)?;
                },
                5 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.balance = tmp;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if self.uid != 0 {
            my_size += ::protobuf::rt::value_size(1, self.uid, ::protobuf::wire_format::WireTypeVarint);
        }
        if !self.username.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.username);
        }
        if !self.phone_no.is_empty() {
            my_size += ::protobuf::rt::string_size(3, &self.phone_no);
        }
        if !self.picture_url.is_empty() {
            my_size += ::protobuf::rt::string_size(4, &self.picture_url);
        }
        if self.balance != 0 {
            my_size += ::protobuf::rt::value_size(5, self.balance, ::protobuf::wire_format::WireTypeVarint);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.uid != 0 {
            os.write_int32(1, self.uid)?;
        }
        if !self.username.is_empty() {
            os.write_string(2, &self.username)?;
        }
        if !self.phone_no.is_empty() {
            os.write_string(3, &self.phone_no)?;
        }
        if !self.picture_url.is_empty() {
            os.write_string(4, &self.picture_url)?;
        }
        if self.balance != 0 {
            os.write_int32(5, self.balance)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &::std::any::Any {
        self as &::std::any::Any
    }
    fn as_any_mut(&mut self) -> &mut ::std::any::Any {
        self as &mut ::std::any::Any
    }
    fn into_any(self: Box<Self>) -> ::std::boxed::Box<::std::any::Any> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        ::protobuf::MessageStatic::descriptor_static(None::<Self>)
    }
}

impl ::protobuf::MessageStatic for User {
    fn new() -> User {
        User::new()
    }

    fn descriptor_static(_: ::std::option::Option<User>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "uid",
                    User::get_uid_for_reflect,
                    User::mut_uid_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "username",
                    User::get_username_for_reflect,
                    User::mut_username_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "phone_no",
                    User::get_phone_no_for_reflect,
                    User::mut_phone_no_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "picture_url",
                    User::get_picture_url_for_reflect,
                    User::mut_picture_url_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "balance",
                    User::get_balance_for_reflect,
                    User::mut_balance_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<User>(
                    "User",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for User {
    fn clear(&mut self) {
        self.clear_uid();
        self.clear_username();
        self.clear_phone_no();
        self.clear_picture_url();
        self.clear_balance();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for User {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for User {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct Claim {
    // message fields
    pub uid: i32,
    pub amount: i32,
    pub owner: ::protobuf::SingularPtrField<Profile>,
    pub receiver: ::protobuf::SingularPtrField<Profile>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for Claim {}

impl Claim {
    pub fn new() -> Claim {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static Claim {
        static mut instance: ::protobuf::lazy::Lazy<Claim> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const Claim,
        };
        unsafe {
            instance.get(Claim::new)
        }
    }

    // int32 uid = 1;

    pub fn clear_uid(&mut self) {
        self.uid = 0;
    }

    // Param is passed by value, moved
    pub fn set_uid(&mut self, v: i32) {
        self.uid = v;
    }

    pub fn get_uid(&self) -> i32 {
        self.uid
    }

    fn get_uid_for_reflect(&self) -> &i32 {
        &self.uid
    }

    fn mut_uid_for_reflect(&mut self) -> &mut i32 {
        &mut self.uid
    }

    // int32 amount = 2;

    pub fn clear_amount(&mut self) {
        self.amount = 0;
    }

    // Param is passed by value, moved
    pub fn set_amount(&mut self, v: i32) {
        self.amount = v;
    }

    pub fn get_amount(&self) -> i32 {
        self.amount
    }

    fn get_amount_for_reflect(&self) -> &i32 {
        &self.amount
    }

    fn mut_amount_for_reflect(&mut self) -> &mut i32 {
        &mut self.amount
    }

    // .pesto.models.Profile owner = 3;

    pub fn clear_owner(&mut self) {
        self.owner.clear();
    }

    pub fn has_owner(&self) -> bool {
        self.owner.is_some()
    }

    // Param is passed by value, moved
    pub fn set_owner(&mut self, v: Profile) {
        self.owner = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_owner(&mut self) -> &mut Profile {
        if self.owner.is_none() {
            self.owner.set_default();
        }
        self.owner.as_mut().unwrap()
    }

    // Take field
    pub fn take_owner(&mut self) -> Profile {
        self.owner.take().unwrap_or_else(|| Profile::new())
    }

    pub fn get_owner(&self) -> &Profile {
        self.owner.as_ref().unwrap_or_else(|| Profile::default_instance())
    }

    fn get_owner_for_reflect(&self) -> &::protobuf::SingularPtrField<Profile> {
        &self.owner
    }

    fn mut_owner_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<Profile> {
        &mut self.owner
    }

    // .pesto.models.Profile receiver = 4;

    pub fn clear_receiver(&mut self) {
        self.receiver.clear();
    }

    pub fn has_receiver(&self) -> bool {
        self.receiver.is_some()
    }

    // Param is passed by value, moved
    pub fn set_receiver(&mut self, v: Profile) {
        self.receiver = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_receiver(&mut self) -> &mut Profile {
        if self.receiver.is_none() {
            self.receiver.set_default();
        }
        self.receiver.as_mut().unwrap()
    }

    // Take field
    pub fn take_receiver(&mut self) -> Profile {
        self.receiver.take().unwrap_or_else(|| Profile::new())
    }

    pub fn get_receiver(&self) -> &Profile {
        self.receiver.as_ref().unwrap_or_else(|| Profile::default_instance())
    }

    fn get_receiver_for_reflect(&self) -> &::protobuf::SingularPtrField<Profile> {
        &self.receiver
    }

    fn mut_receiver_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<Profile> {
        &mut self.receiver
    }
}

impl ::protobuf::Message for Claim {
    fn is_initialized(&self) -> bool {
        for v in &self.owner {
            if !v.is_initialized() {
                return false;
            }
        };
        for v in &self.receiver {
            if !v.is_initialized() {
                return false;
            }
        };
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.uid = tmp;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.amount = tmp;
                },
                3 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.owner)?;
                },
                4 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.receiver)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if self.uid != 0 {
            my_size += ::protobuf::rt::value_size(1, self.uid, ::protobuf::wire_format::WireTypeVarint);
        }
        if self.amount != 0 {
            my_size += ::protobuf::rt::value_size(2, self.amount, ::protobuf::wire_format::WireTypeVarint);
        }
        if let Some(ref v) = self.owner.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if let Some(ref v) = self.receiver.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.uid != 0 {
            os.write_int32(1, self.uid)?;
        }
        if self.amount != 0 {
            os.write_int32(2, self.amount)?;
        }
        if let Some(ref v) = self.owner.as_ref() {
            os.write_tag(3, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if let Some(ref v) = self.receiver.as_ref() {
            os.write_tag(4, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &::std::any::Any {
        self as &::std::any::Any
    }
    fn as_any_mut(&mut self) -> &mut ::std::any::Any {
        self as &mut ::std::any::Any
    }
    fn into_any(self: Box<Self>) -> ::std::boxed::Box<::std::any::Any> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        ::protobuf::MessageStatic::descriptor_static(None::<Self>)
    }
}

impl ::protobuf::MessageStatic for Claim {
    fn new() -> Claim {
        Claim::new()
    }

    fn descriptor_static(_: ::std::option::Option<Claim>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "uid",
                    Claim::get_uid_for_reflect,
                    Claim::mut_uid_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "amount",
                    Claim::get_amount_for_reflect,
                    Claim::mut_amount_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Profile>>(
                    "owner",
                    Claim::get_owner_for_reflect,
                    Claim::mut_owner_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Profile>>(
                    "receiver",
                    Claim::get_receiver_for_reflect,
                    Claim::mut_receiver_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<Claim>(
                    "Claim",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for Claim {
    fn clear(&mut self) {
        self.clear_uid();
        self.clear_amount();
        self.clear_owner();
        self.clear_receiver();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for Claim {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Claim {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct Room {
    // message fields
    pub uid: i32,
    pub owner: ::protobuf::SingularPtrField<Profile>,
    pub name: ::std::string::String,
    pub item: ::protobuf::RepeatedField<RoomItem>,
    pub invited: ::protobuf::RepeatedField<User>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for Room {}

impl Room {
    pub fn new() -> Room {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static Room {
        static mut instance: ::protobuf::lazy::Lazy<Room> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const Room,
        };
        unsafe {
            instance.get(Room::new)
        }
    }

    // int32 uid = 1;

    pub fn clear_uid(&mut self) {
        self.uid = 0;
    }

    // Param is passed by value, moved
    pub fn set_uid(&mut self, v: i32) {
        self.uid = v;
    }

    pub fn get_uid(&self) -> i32 {
        self.uid
    }

    fn get_uid_for_reflect(&self) -> &i32 {
        &self.uid
    }

    fn mut_uid_for_reflect(&mut self) -> &mut i32 {
        &mut self.uid
    }

    // .pesto.models.Profile owner = 2;

    pub fn clear_owner(&mut self) {
        self.owner.clear();
    }

    pub fn has_owner(&self) -> bool {
        self.owner.is_some()
    }

    // Param is passed by value, moved
    pub fn set_owner(&mut self, v: Profile) {
        self.owner = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_owner(&mut self) -> &mut Profile {
        if self.owner.is_none() {
            self.owner.set_default();
        }
        self.owner.as_mut().unwrap()
    }

    // Take field
    pub fn take_owner(&mut self) -> Profile {
        self.owner.take().unwrap_or_else(|| Profile::new())
    }

    pub fn get_owner(&self) -> &Profile {
        self.owner.as_ref().unwrap_or_else(|| Profile::default_instance())
    }

    fn get_owner_for_reflect(&self) -> &::protobuf::SingularPtrField<Profile> {
        &self.owner
    }

    fn mut_owner_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<Profile> {
        &mut self.owner
    }

    // string name = 3;

    pub fn clear_name(&mut self) {
        self.name.clear();
    }

    // Param is passed by value, moved
    pub fn set_name(&mut self, v: ::std::string::String) {
        self.name = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_name(&mut self) -> &mut ::std::string::String {
        &mut self.name
    }

    // Take field
    pub fn take_name(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.name, ::std::string::String::new())
    }

    pub fn get_name(&self) -> &str {
        &self.name
    }

    fn get_name_for_reflect(&self) -> &::std::string::String {
        &self.name
    }

    fn mut_name_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.name
    }

    // repeated .pesto.models.RoomItem item = 4;

    pub fn clear_item(&mut self) {
        self.item.clear();
    }

    // Param is passed by value, moved
    pub fn set_item(&mut self, v: ::protobuf::RepeatedField<RoomItem>) {
        self.item = v;
    }

    // Mutable pointer to the field.
    pub fn mut_item(&mut self) -> &mut ::protobuf::RepeatedField<RoomItem> {
        &mut self.item
    }

    // Take field
    pub fn take_item(&mut self) -> ::protobuf::RepeatedField<RoomItem> {
        ::std::mem::replace(&mut self.item, ::protobuf::RepeatedField::new())
    }

    pub fn get_item(&self) -> &[RoomItem] {
        &self.item
    }

    fn get_item_for_reflect(&self) -> &::protobuf::RepeatedField<RoomItem> {
        &self.item
    }

    fn mut_item_for_reflect(&mut self) -> &mut ::protobuf::RepeatedField<RoomItem> {
        &mut self.item
    }

    // repeated .pesto.models.User invited = 5;

    pub fn clear_invited(&mut self) {
        self.invited.clear();
    }

    // Param is passed by value, moved
    pub fn set_invited(&mut self, v: ::protobuf::RepeatedField<User>) {
        self.invited = v;
    }

    // Mutable pointer to the field.
    pub fn mut_invited(&mut self) -> &mut ::protobuf::RepeatedField<User> {
        &mut self.invited
    }

    // Take field
    pub fn take_invited(&mut self) -> ::protobuf::RepeatedField<User> {
        ::std::mem::replace(&mut self.invited, ::protobuf::RepeatedField::new())
    }

    pub fn get_invited(&self) -> &[User] {
        &self.invited
    }

    fn get_invited_for_reflect(&self) -> &::protobuf::RepeatedField<User> {
        &self.invited
    }

    fn mut_invited_for_reflect(&mut self) -> &mut ::protobuf::RepeatedField<User> {
        &mut self.invited
    }
}

impl ::protobuf::Message for Room {
    fn is_initialized(&self) -> bool {
        for v in &self.owner {
            if !v.is_initialized() {
                return false;
            }
        };
        for v in &self.item {
            if !v.is_initialized() {
                return false;
            }
        };
        for v in &self.invited {
            if !v.is_initialized() {
                return false;
            }
        };
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.uid = tmp;
                },
                2 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.owner)?;
                },
                3 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.name)?;
                },
                4 => {
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.item)?;
                },
                5 => {
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.invited)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if self.uid != 0 {
            my_size += ::protobuf::rt::value_size(1, self.uid, ::protobuf::wire_format::WireTypeVarint);
        }
        if let Some(ref v) = self.owner.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if !self.name.is_empty() {
            my_size += ::protobuf::rt::string_size(3, &self.name);
        }
        for value in &self.item {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        for value in &self.invited {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.uid != 0 {
            os.write_int32(1, self.uid)?;
        }
        if let Some(ref v) = self.owner.as_ref() {
            os.write_tag(2, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if !self.name.is_empty() {
            os.write_string(3, &self.name)?;
        }
        for v in &self.item {
            os.write_tag(4, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        };
        for v in &self.invited {
            os.write_tag(5, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        };
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &::std::any::Any {
        self as &::std::any::Any
    }
    fn as_any_mut(&mut self) -> &mut ::std::any::Any {
        self as &mut ::std::any::Any
    }
    fn into_any(self: Box<Self>) -> ::std::boxed::Box<::std::any::Any> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        ::protobuf::MessageStatic::descriptor_static(None::<Self>)
    }
}

impl ::protobuf::MessageStatic for Room {
    fn new() -> Room {
        Room::new()
    }

    fn descriptor_static(_: ::std::option::Option<Room>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "uid",
                    Room::get_uid_for_reflect,
                    Room::mut_uid_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Profile>>(
                    "owner",
                    Room::get_owner_for_reflect,
                    Room::mut_owner_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "name",
                    Room::get_name_for_reflect,
                    Room::mut_name_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<RoomItem>>(
                    "item",
                    Room::get_item_for_reflect,
                    Room::mut_item_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<User>>(
                    "invited",
                    Room::get_invited_for_reflect,
                    Room::mut_invited_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<Room>(
                    "Room",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for Room {
    fn clear(&mut self) {
        self.clear_uid();
        self.clear_owner();
        self.clear_name();
        self.clear_item();
        self.clear_invited();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for Room {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Room {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct RoomItem {
    // message fields
    pub uid: i32,
    pub name: ::std::string::String,
    pub value: i32,
    pub locked_by: ::protobuf::SingularPtrField<User>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for RoomItem {}

impl RoomItem {
    pub fn new() -> RoomItem {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static RoomItem {
        static mut instance: ::protobuf::lazy::Lazy<RoomItem> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const RoomItem,
        };
        unsafe {
            instance.get(RoomItem::new)
        }
    }

    // int32 uid = 1;

    pub fn clear_uid(&mut self) {
        self.uid = 0;
    }

    // Param is passed by value, moved
    pub fn set_uid(&mut self, v: i32) {
        self.uid = v;
    }

    pub fn get_uid(&self) -> i32 {
        self.uid
    }

    fn get_uid_for_reflect(&self) -> &i32 {
        &self.uid
    }

    fn mut_uid_for_reflect(&mut self) -> &mut i32 {
        &mut self.uid
    }

    // string name = 2;

    pub fn clear_name(&mut self) {
        self.name.clear();
    }

    // Param is passed by value, moved
    pub fn set_name(&mut self, v: ::std::string::String) {
        self.name = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_name(&mut self) -> &mut ::std::string::String {
        &mut self.name
    }

    // Take field
    pub fn take_name(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.name, ::std::string::String::new())
    }

    pub fn get_name(&self) -> &str {
        &self.name
    }

    fn get_name_for_reflect(&self) -> &::std::string::String {
        &self.name
    }

    fn mut_name_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.name
    }

    // int32 value = 3;

    pub fn clear_value(&mut self) {
        self.value = 0;
    }

    // Param is passed by value, moved
    pub fn set_value(&mut self, v: i32) {
        self.value = v;
    }

    pub fn get_value(&self) -> i32 {
        self.value
    }

    fn get_value_for_reflect(&self) -> &i32 {
        &self.value
    }

    fn mut_value_for_reflect(&mut self) -> &mut i32 {
        &mut self.value
    }

    // .pesto.models.User locked_by = 4;

    pub fn clear_locked_by(&mut self) {
        self.locked_by.clear();
    }

    pub fn has_locked_by(&self) -> bool {
        self.locked_by.is_some()
    }

    // Param is passed by value, moved
    pub fn set_locked_by(&mut self, v: User) {
        self.locked_by = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_locked_by(&mut self) -> &mut User {
        if self.locked_by.is_none() {
            self.locked_by.set_default();
        }
        self.locked_by.as_mut().unwrap()
    }

    // Take field
    pub fn take_locked_by(&mut self) -> User {
        self.locked_by.take().unwrap_or_else(|| User::new())
    }

    pub fn get_locked_by(&self) -> &User {
        self.locked_by.as_ref().unwrap_or_else(|| User::default_instance())
    }

    fn get_locked_by_for_reflect(&self) -> &::protobuf::SingularPtrField<User> {
        &self.locked_by
    }

    fn mut_locked_by_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<User> {
        &mut self.locked_by
    }
}

impl ::protobuf::Message for RoomItem {
    fn is_initialized(&self) -> bool {
        for v in &self.locked_by {
            if !v.is_initialized() {
                return false;
            }
        };
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.uid = tmp;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.name)?;
                },
                3 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.value = tmp;
                },
                4 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.locked_by)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if self.uid != 0 {
            my_size += ::protobuf::rt::value_size(1, self.uid, ::protobuf::wire_format::WireTypeVarint);
        }
        if !self.name.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.name);
        }
        if self.value != 0 {
            my_size += ::protobuf::rt::value_size(3, self.value, ::protobuf::wire_format::WireTypeVarint);
        }
        if let Some(ref v) = self.locked_by.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.uid != 0 {
            os.write_int32(1, self.uid)?;
        }
        if !self.name.is_empty() {
            os.write_string(2, &self.name)?;
        }
        if self.value != 0 {
            os.write_int32(3, self.value)?;
        }
        if let Some(ref v) = self.locked_by.as_ref() {
            os.write_tag(4, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &::std::any::Any {
        self as &::std::any::Any
    }
    fn as_any_mut(&mut self) -> &mut ::std::any::Any {
        self as &mut ::std::any::Any
    }
    fn into_any(self: Box<Self>) -> ::std::boxed::Box<::std::any::Any> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        ::protobuf::MessageStatic::descriptor_static(None::<Self>)
    }
}

impl ::protobuf::MessageStatic for RoomItem {
    fn new() -> RoomItem {
        RoomItem::new()
    }

    fn descriptor_static(_: ::std::option::Option<RoomItem>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "uid",
                    RoomItem::get_uid_for_reflect,
                    RoomItem::mut_uid_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "name",
                    RoomItem::get_name_for_reflect,
                    RoomItem::mut_name_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "value",
                    RoomItem::get_value_for_reflect,
                    RoomItem::mut_value_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<User>>(
                    "locked_by",
                    RoomItem::get_locked_by_for_reflect,
                    RoomItem::mut_locked_by_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<RoomItem>(
                    "RoomItem",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for RoomItem {
    fn clear(&mut self) {
        self.clear_uid();
        self.clear_name();
        self.clear_value();
        self.clear_locked_by();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for RoomItem {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RoomItem {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct Contact {
    // message fields
    pub profile: ::protobuf::SingularPtrField<Profile>,
    pub trusted: bool,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for Contact {}

impl Contact {
    pub fn new() -> Contact {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static Contact {
        static mut instance: ::protobuf::lazy::Lazy<Contact> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const Contact,
        };
        unsafe {
            instance.get(Contact::new)
        }
    }

    // .pesto.models.Profile profile = 1;

    pub fn clear_profile(&mut self) {
        self.profile.clear();
    }

    pub fn has_profile(&self) -> bool {
        self.profile.is_some()
    }

    // Param is passed by value, moved
    pub fn set_profile(&mut self, v: Profile) {
        self.profile = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_profile(&mut self) -> &mut Profile {
        if self.profile.is_none() {
            self.profile.set_default();
        }
        self.profile.as_mut().unwrap()
    }

    // Take field
    pub fn take_profile(&mut self) -> Profile {
        self.profile.take().unwrap_or_else(|| Profile::new())
    }

    pub fn get_profile(&self) -> &Profile {
        self.profile.as_ref().unwrap_or_else(|| Profile::default_instance())
    }

    fn get_profile_for_reflect(&self) -> &::protobuf::SingularPtrField<Profile> {
        &self.profile
    }

    fn mut_profile_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<Profile> {
        &mut self.profile
    }

    // bool trusted = 2;

    pub fn clear_trusted(&mut self) {
        self.trusted = false;
    }

    // Param is passed by value, moved
    pub fn set_trusted(&mut self, v: bool) {
        self.trusted = v;
    }

    pub fn get_trusted(&self) -> bool {
        self.trusted
    }

    fn get_trusted_for_reflect(&self) -> &bool {
        &self.trusted
    }

    fn mut_trusted_for_reflect(&mut self) -> &mut bool {
        &mut self.trusted
    }
}

impl ::protobuf::Message for Contact {
    fn is_initialized(&self) -> bool {
        for v in &self.profile {
            if !v.is_initialized() {
                return false;
            }
        };
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.profile)?;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_bool()?;
                    self.trusted = tmp;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if let Some(ref v) = self.profile.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if self.trusted != false {
            my_size += 2;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if let Some(ref v) = self.profile.as_ref() {
            os.write_tag(1, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if self.trusted != false {
            os.write_bool(2, self.trusted)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &::std::any::Any {
        self as &::std::any::Any
    }
    fn as_any_mut(&mut self) -> &mut ::std::any::Any {
        self as &mut ::std::any::Any
    }
    fn into_any(self: Box<Self>) -> ::std::boxed::Box<::std::any::Any> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        ::protobuf::MessageStatic::descriptor_static(None::<Self>)
    }
}

impl ::protobuf::MessageStatic for Contact {
    fn new() -> Contact {
        Contact::new()
    }

    fn descriptor_static(_: ::std::option::Option<Contact>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Profile>>(
                    "profile",
                    Contact::get_profile_for_reflect,
                    Contact::mut_profile_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "trusted",
                    Contact::get_trusted_for_reflect,
                    Contact::mut_trusted_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<Contact>(
                    "Contact",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for Contact {
    fn clear(&mut self) {
        self.clear_profile();
        self.clear_trusted();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for Contact {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Contact {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct Transaction {
    // message fields
    pub account_holder_type: AccountHolderType,
    pub user_account_holder: ::protobuf::SingularPtrField<Profile>,
    pub claim_account_holder: ::protobuf::SingularPtrField<Claim>,
    pub room_account_holder: ::protobuf::SingularPtrField<Room>,
    pub amount: i32,
    pub transaction_type: Transaction_Type,
    pub timestamp: ::protobuf::SingularPtrField<::protobuf::well_known_types::Timestamp>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for Transaction {}

impl Transaction {
    pub fn new() -> Transaction {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static Transaction {
        static mut instance: ::protobuf::lazy::Lazy<Transaction> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const Transaction,
        };
        unsafe {
            instance.get(Transaction::new)
        }
    }

    // .pesto.models.AccountHolderType account_holder_type = 1;

    pub fn clear_account_holder_type(&mut self) {
        self.account_holder_type = AccountHolderType::USER;
    }

    // Param is passed by value, moved
    pub fn set_account_holder_type(&mut self, v: AccountHolderType) {
        self.account_holder_type = v;
    }

    pub fn get_account_holder_type(&self) -> AccountHolderType {
        self.account_holder_type
    }

    fn get_account_holder_type_for_reflect(&self) -> &AccountHolderType {
        &self.account_holder_type
    }

    fn mut_account_holder_type_for_reflect(&mut self) -> &mut AccountHolderType {
        &mut self.account_holder_type
    }

    // .pesto.models.Profile user_account_holder = 2;

    pub fn clear_user_account_holder(&mut self) {
        self.user_account_holder.clear();
    }

    pub fn has_user_account_holder(&self) -> bool {
        self.user_account_holder.is_some()
    }

    // Param is passed by value, moved
    pub fn set_user_account_holder(&mut self, v: Profile) {
        self.user_account_holder = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_user_account_holder(&mut self) -> &mut Profile {
        if self.user_account_holder.is_none() {
            self.user_account_holder.set_default();
        }
        self.user_account_holder.as_mut().unwrap()
    }

    // Take field
    pub fn take_user_account_holder(&mut self) -> Profile {
        self.user_account_holder.take().unwrap_or_else(|| Profile::new())
    }

    pub fn get_user_account_holder(&self) -> &Profile {
        self.user_account_holder.as_ref().unwrap_or_else(|| Profile::default_instance())
    }

    fn get_user_account_holder_for_reflect(&self) -> &::protobuf::SingularPtrField<Profile> {
        &self.user_account_holder
    }

    fn mut_user_account_holder_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<Profile> {
        &mut self.user_account_holder
    }

    // .pesto.models.Claim claim_account_holder = 3;

    pub fn clear_claim_account_holder(&mut self) {
        self.claim_account_holder.clear();
    }

    pub fn has_claim_account_holder(&self) -> bool {
        self.claim_account_holder.is_some()
    }

    // Param is passed by value, moved
    pub fn set_claim_account_holder(&mut self, v: Claim) {
        self.claim_account_holder = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_claim_account_holder(&mut self) -> &mut Claim {
        if self.claim_account_holder.is_none() {
            self.claim_account_holder.set_default();
        }
        self.claim_account_holder.as_mut().unwrap()
    }

    // Take field
    pub fn take_claim_account_holder(&mut self) -> Claim {
        self.claim_account_holder.take().unwrap_or_else(|| Claim::new())
    }

    pub fn get_claim_account_holder(&self) -> &Claim {
        self.claim_account_holder.as_ref().unwrap_or_else(|| Claim::default_instance())
    }

    fn get_claim_account_holder_for_reflect(&self) -> &::protobuf::SingularPtrField<Claim> {
        &self.claim_account_holder
    }

    fn mut_claim_account_holder_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<Claim> {
        &mut self.claim_account_holder
    }

    // .pesto.models.Room room_account_holder = 4;

    pub fn clear_room_account_holder(&mut self) {
        self.room_account_holder.clear();
    }

    pub fn has_room_account_holder(&self) -> bool {
        self.room_account_holder.is_some()
    }

    // Param is passed by value, moved
    pub fn set_room_account_holder(&mut self, v: Room) {
        self.room_account_holder = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_room_account_holder(&mut self) -> &mut Room {
        if self.room_account_holder.is_none() {
            self.room_account_holder.set_default();
        }
        self.room_account_holder.as_mut().unwrap()
    }

    // Take field
    pub fn take_room_account_holder(&mut self) -> Room {
        self.room_account_holder.take().unwrap_or_else(|| Room::new())
    }

    pub fn get_room_account_holder(&self) -> &Room {
        self.room_account_holder.as_ref().unwrap_or_else(|| Room::default_instance())
    }

    fn get_room_account_holder_for_reflect(&self) -> &::protobuf::SingularPtrField<Room> {
        &self.room_account_holder
    }

    fn mut_room_account_holder_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<Room> {
        &mut self.room_account_holder
    }

    // int32 amount = 5;

    pub fn clear_amount(&mut self) {
        self.amount = 0;
    }

    // Param is passed by value, moved
    pub fn set_amount(&mut self, v: i32) {
        self.amount = v;
    }

    pub fn get_amount(&self) -> i32 {
        self.amount
    }

    fn get_amount_for_reflect(&self) -> &i32 {
        &self.amount
    }

    fn mut_amount_for_reflect(&mut self) -> &mut i32 {
        &mut self.amount
    }

    // .pesto.models.Transaction.Type transaction_type = 6;

    pub fn clear_transaction_type(&mut self) {
        self.transaction_type = Transaction_Type::FROM;
    }

    // Param is passed by value, moved
    pub fn set_transaction_type(&mut self, v: Transaction_Type) {
        self.transaction_type = v;
    }

    pub fn get_transaction_type(&self) -> Transaction_Type {
        self.transaction_type
    }

    fn get_transaction_type_for_reflect(&self) -> &Transaction_Type {
        &self.transaction_type
    }

    fn mut_transaction_type_for_reflect(&mut self) -> &mut Transaction_Type {
        &mut self.transaction_type
    }

    // .google.protobuf.Timestamp timestamp = 7;

    pub fn clear_timestamp(&mut self) {
        self.timestamp.clear();
    }

    pub fn has_timestamp(&self) -> bool {
        self.timestamp.is_some()
    }

    // Param is passed by value, moved
    pub fn set_timestamp(&mut self, v: ::protobuf::well_known_types::Timestamp) {
        self.timestamp = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_timestamp(&mut self) -> &mut ::protobuf::well_known_types::Timestamp {
        if self.timestamp.is_none() {
            self.timestamp.set_default();
        }
        self.timestamp.as_mut().unwrap()
    }

    // Take field
    pub fn take_timestamp(&mut self) -> ::protobuf::well_known_types::Timestamp {
        self.timestamp.take().unwrap_or_else(|| ::protobuf::well_known_types::Timestamp::new())
    }

    pub fn get_timestamp(&self) -> &::protobuf::well_known_types::Timestamp {
        self.timestamp.as_ref().unwrap_or_else(|| ::protobuf::well_known_types::Timestamp::default_instance())
    }

    fn get_timestamp_for_reflect(&self) -> &::protobuf::SingularPtrField<::protobuf::well_known_types::Timestamp> {
        &self.timestamp
    }

    fn mut_timestamp_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<::protobuf::well_known_types::Timestamp> {
        &mut self.timestamp
    }
}

impl ::protobuf::Message for Transaction {
    fn is_initialized(&self) -> bool {
        for v in &self.user_account_holder {
            if !v.is_initialized() {
                return false;
            }
        };
        for v in &self.claim_account_holder {
            if !v.is_initialized() {
                return false;
            }
        };
        for v in &self.room_account_holder {
            if !v.is_initialized() {
                return false;
            }
        };
        for v in &self.timestamp {
            if !v.is_initialized() {
                return false;
            }
        };
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_enum()?;
                    self.account_holder_type = tmp;
                },
                2 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.user_account_holder)?;
                },
                3 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.claim_account_holder)?;
                },
                4 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.room_account_holder)?;
                },
                5 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.amount = tmp;
                },
                6 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_enum()?;
                    self.transaction_type = tmp;
                },
                7 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.timestamp)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if self.account_holder_type != AccountHolderType::USER {
            my_size += ::protobuf::rt::enum_size(1, self.account_holder_type);
        }
        if let Some(ref v) = self.user_account_holder.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if let Some(ref v) = self.claim_account_holder.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if let Some(ref v) = self.room_account_holder.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if self.amount != 0 {
            my_size += ::protobuf::rt::value_size(5, self.amount, ::protobuf::wire_format::WireTypeVarint);
        }
        if self.transaction_type != Transaction_Type::FROM {
            my_size += ::protobuf::rt::enum_size(6, self.transaction_type);
        }
        if let Some(ref v) = self.timestamp.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.account_holder_type != AccountHolderType::USER {
            os.write_enum(1, self.account_holder_type.value())?;
        }
        if let Some(ref v) = self.user_account_holder.as_ref() {
            os.write_tag(2, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if let Some(ref v) = self.claim_account_holder.as_ref() {
            os.write_tag(3, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if let Some(ref v) = self.room_account_holder.as_ref() {
            os.write_tag(4, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if self.amount != 0 {
            os.write_int32(5, self.amount)?;
        }
        if self.transaction_type != Transaction_Type::FROM {
            os.write_enum(6, self.transaction_type.value())?;
        }
        if let Some(ref v) = self.timestamp.as_ref() {
            os.write_tag(7, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &::std::any::Any {
        self as &::std::any::Any
    }
    fn as_any_mut(&mut self) -> &mut ::std::any::Any {
        self as &mut ::std::any::Any
    }
    fn into_any(self: Box<Self>) -> ::std::boxed::Box<::std::any::Any> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        ::protobuf::MessageStatic::descriptor_static(None::<Self>)
    }
}

impl ::protobuf::MessageStatic for Transaction {
    fn new() -> Transaction {
        Transaction::new()
    }

    fn descriptor_static(_: ::std::option::Option<Transaction>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeEnum<AccountHolderType>>(
                    "account_holder_type",
                    Transaction::get_account_holder_type_for_reflect,
                    Transaction::mut_account_holder_type_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Profile>>(
                    "user_account_holder",
                    Transaction::get_user_account_holder_for_reflect,
                    Transaction::mut_user_account_holder_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Claim>>(
                    "claim_account_holder",
                    Transaction::get_claim_account_holder_for_reflect,
                    Transaction::mut_claim_account_holder_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Room>>(
                    "room_account_holder",
                    Transaction::get_room_account_holder_for_reflect,
                    Transaction::mut_room_account_holder_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "amount",
                    Transaction::get_amount_for_reflect,
                    Transaction::mut_amount_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeEnum<Transaction_Type>>(
                    "transaction_type",
                    Transaction::get_transaction_type_for_reflect,
                    Transaction::mut_transaction_type_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<::protobuf::well_known_types::Timestamp>>(
                    "timestamp",
                    Transaction::get_timestamp_for_reflect,
                    Transaction::mut_timestamp_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<Transaction>(
                    "Transaction",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for Transaction {
    fn clear(&mut self) {
        self.clear_account_holder_type();
        self.clear_user_account_holder();
        self.clear_claim_account_holder();
        self.clear_room_account_holder();
        self.clear_amount();
        self.clear_transaction_type();
        self.clear_timestamp();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for Transaction {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Transaction {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(Clone,PartialEq,Eq,Debug,Hash)]
pub enum Transaction_Type {
    FROM = 0,
    TO = 1,
}

impl ::protobuf::ProtobufEnum for Transaction_Type {
    fn value(&self) -> i32 {
        *self as i32
    }

    fn from_i32(value: i32) -> ::std::option::Option<Transaction_Type> {
        match value {
            0 => ::std::option::Option::Some(Transaction_Type::FROM),
            1 => ::std::option::Option::Some(Transaction_Type::TO),
            _ => ::std::option::Option::None
        }
    }

    fn values() -> &'static [Self] {
        static values: &'static [Transaction_Type] = &[
            Transaction_Type::FROM,
            Transaction_Type::TO,
        ];
        values
    }

    fn enum_descriptor_static(_: ::std::option::Option<Transaction_Type>) -> &'static ::protobuf::reflect::EnumDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::EnumDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::EnumDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                ::protobuf::reflect::EnumDescriptor::new("Transaction_Type", file_descriptor_proto())
            })
        }
    }
}

impl ::std::marker::Copy for Transaction_Type {
}

impl ::std::default::Default for Transaction_Type {
    fn default() -> Self {
        Transaction_Type::FROM
    }
}

impl ::protobuf::reflect::ProtobufValue for Transaction_Type {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Enum(self.descriptor())
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct Profile {
    // message fields
    pub uid: i32,
    pub username: ::std::string::String,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for Profile {}

impl Profile {
    pub fn new() -> Profile {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static Profile {
        static mut instance: ::protobuf::lazy::Lazy<Profile> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const Profile,
        };
        unsafe {
            instance.get(Profile::new)
        }
    }

    // int32 uid = 1;

    pub fn clear_uid(&mut self) {
        self.uid = 0;
    }

    // Param is passed by value, moved
    pub fn set_uid(&mut self, v: i32) {
        self.uid = v;
    }

    pub fn get_uid(&self) -> i32 {
        self.uid
    }

    fn get_uid_for_reflect(&self) -> &i32 {
        &self.uid
    }

    fn mut_uid_for_reflect(&mut self) -> &mut i32 {
        &mut self.uid
    }

    // string username = 2;

    pub fn clear_username(&mut self) {
        self.username.clear();
    }

    // Param is passed by value, moved
    pub fn set_username(&mut self, v: ::std::string::String) {
        self.username = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_username(&mut self) -> &mut ::std::string::String {
        &mut self.username
    }

    // Take field
    pub fn take_username(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.username, ::std::string::String::new())
    }

    pub fn get_username(&self) -> &str {
        &self.username
    }

    fn get_username_for_reflect(&self) -> &::std::string::String {
        &self.username
    }

    fn mut_username_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.username
    }
}

impl ::protobuf::Message for Profile {
    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.uid = tmp;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.username)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if self.uid != 0 {
            my_size += ::protobuf::rt::value_size(1, self.uid, ::protobuf::wire_format::WireTypeVarint);
        }
        if !self.username.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.username);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.uid != 0 {
            os.write_int32(1, self.uid)?;
        }
        if !self.username.is_empty() {
            os.write_string(2, &self.username)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &::std::any::Any {
        self as &::std::any::Any
    }
    fn as_any_mut(&mut self) -> &mut ::std::any::Any {
        self as &mut ::std::any::Any
    }
    fn into_any(self: Box<Self>) -> ::std::boxed::Box<::std::any::Any> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        ::protobuf::MessageStatic::descriptor_static(None::<Self>)
    }
}

impl ::protobuf::MessageStatic for Profile {
    fn new() -> Profile {
        Profile::new()
    }

    fn descriptor_static(_: ::std::option::Option<Profile>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "uid",
                    Profile::get_uid_for_reflect,
                    Profile::mut_uid_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "username",
                    Profile::get_username_for_reflect,
                    Profile::mut_username_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<Profile>(
                    "Profile",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for Profile {
    fn clear(&mut self) {
        self.clear_uid();
        self.clear_username();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for Profile {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Profile {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(Clone,PartialEq,Eq,Debug,Hash)]
pub enum AccountHolderType {
    USER = 0,
    CLAIM = 1,
    ROOM = 2,
}

impl ::protobuf::ProtobufEnum for AccountHolderType {
    fn value(&self) -> i32 {
        *self as i32
    }

    fn from_i32(value: i32) -> ::std::option::Option<AccountHolderType> {
        match value {
            0 => ::std::option::Option::Some(AccountHolderType::USER),
            1 => ::std::option::Option::Some(AccountHolderType::CLAIM),
            2 => ::std::option::Option::Some(AccountHolderType::ROOM),
            _ => ::std::option::Option::None
        }
    }

    fn values() -> &'static [Self] {
        static values: &'static [AccountHolderType] = &[
            AccountHolderType::USER,
            AccountHolderType::CLAIM,
            AccountHolderType::ROOM,
        ];
        values
    }

    fn enum_descriptor_static(_: ::std::option::Option<AccountHolderType>) -> &'static ::protobuf::reflect::EnumDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::EnumDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::EnumDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                ::protobuf::reflect::EnumDescriptor::new("AccountHolderType", file_descriptor_proto())
            })
        }
    }
}

impl ::std::marker::Copy for AccountHolderType {
}

impl ::std::default::Default for AccountHolderType {
    fn default() -> Self {
        AccountHolderType::USER
    }
}

impl ::protobuf::reflect::ProtobufValue for AccountHolderType {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Enum(self.descriptor())
    }
}

static file_descriptor_proto_data: &'static [u8] = b"\
    \n\x0cmodels.proto\x12\x0cpesto.models\x1a\x1fgoogle/protobuf/timestamp.\
    proto\"\x8a\x01\n\x04User\x12\x10\n\x03uid\x18\x01\x20\x01(\x05R\x03uid\
    \x12\x1a\n\x08username\x18\x02\x20\x01(\tR\x08username\x12\x19\n\x08phon\
    e_no\x18\x03\x20\x01(\tR\x07phoneNo\x12\x1f\n\x0bpicture_url\x18\x04\x20\
    \x01(\tR\npictureUrl\x12\x18\n\x07balance\x18\x05\x20\x01(\x05R\x07balan\
    ce\"\x91\x01\n\x05Claim\x12\x10\n\x03uid\x18\x01\x20\x01(\x05R\x03uid\
    \x12\x16\n\x06amount\x18\x02\x20\x01(\x05R\x06amount\x12+\n\x05owner\x18\
    \x03\x20\x01(\x0b2\x15.pesto.models.ProfileR\x05owner\x121\n\x08receiver\
    \x18\x04\x20\x01(\x0b2\x15.pesto.models.ProfileR\x08receiver\"\xb3\x01\n\
    \x04Room\x12\x10\n\x03uid\x18\x01\x20\x01(\x05R\x03uid\x12+\n\x05owner\
    \x18\x02\x20\x01(\x0b2\x15.pesto.models.ProfileR\x05owner\x12\x12\n\x04n\
    ame\x18\x03\x20\x01(\tR\x04name\x12*\n\x04item\x18\x04\x20\x03(\x0b2\x16\
    .pesto.models.RoomItemR\x04item\x12,\n\x07invited\x18\x05\x20\x03(\x0b2\
    \x12.pesto.models.UserR\x07invited\"w\n\x08RoomItem\x12\x10\n\x03uid\x18\
    \x01\x20\x01(\x05R\x03uid\x12\x12\n\x04name\x18\x02\x20\x01(\tR\x04name\
    \x12\x14\n\x05value\x18\x03\x20\x01(\x05R\x05value\x12/\n\tlocked_by\x18\
    \x04\x20\x01(\x0b2\x12.pesto.models.UserR\x08lockedBy\"T\n\x07Contact\
    \x12/\n\x07profile\x18\x01\x20\x01(\x0b2\x15.pesto.models.ProfileR\x07pr\
    ofile\x12\x18\n\x07trusted\x18\x02\x20\x01(\x08R\x07trusted\"\xe7\x03\n\
    \x0bTransaction\x12O\n\x13account_holder_type\x18\x01\x20\x01(\x0e2\x1f.\
    pesto.models.AccountHolderTypeR\x11accountHolderType\x12E\n\x13user_acco\
    unt_holder\x18\x02\x20\x01(\x0b2\x15.pesto.models.ProfileR\x11userAccoun\
    tHolder\x12E\n\x14claim_account_holder\x18\x03\x20\x01(\x0b2\x13.pesto.m\
    odels.ClaimR\x12claimAccountHolder\x12B\n\x13room_account_holder\x18\x04\
    \x20\x01(\x0b2\x12.pesto.models.RoomR\x11roomAccountHolder\x12\x16\n\x06\
    amount\x18\x05\x20\x01(\x05R\x06amount\x12I\n\x10transaction_type\x18\
    \x06\x20\x01(\x0e2\x1e.pesto.models.Transaction.TypeR\x0ftransactionType\
    \x128\n\ttimestamp\x18\x07\x20\x01(\x0b2\x1a.google.protobuf.TimestampR\
    \ttimestamp\"\x18\n\x04Type\x12\x08\n\x04FROM\x10\0\x12\x06\n\x02TO\x10\
    \x01\"7\n\x07Profile\x12\x10\n\x03uid\x18\x01\x20\x01(\x05R\x03uid\x12\
    \x1a\n\x08username\x18\x02\x20\x01(\tR\x08username*2\n\x11AccountHolderT\
    ype\x12\x08\n\x04USER\x10\0\x12\t\n\x05CLAIM\x10\x01\x12\x08\n\x04ROOM\
    \x10\x02J\xc8\x13\n\x06\x12\x04\0\0?\x01\n\x08\n\x01\x0c\x12\x03\0\0\x12\
    \n\x08\n\x01\x02\x12\x03\x02\x08\x14\n\t\n\x02\x03\0\x12\x03\x03\x07(\n\
    \n\n\x02\x04\0\x12\x04\x05\0\x0b\x01\n\n\n\x03\x04\0\x01\x12\x03\x05\x08\
    \x0c\n\x0b\n\x04\x04\0\x02\0\x12\x03\x06\x02\x10\n\r\n\x05\x04\0\x02\0\
    \x04\x12\x04\x06\x02\x05\x0e\n\x0c\n\x05\x04\0\x02\0\x05\x12\x03\x06\x02\
    \x07\n\x0c\n\x05\x04\0\x02\0\x01\x12\x03\x06\x08\x0b\n\x0c\n\x05\x04\0\
    \x02\0\x03\x12\x03\x06\x0e\x0f\n\x0b\n\x04\x04\0\x02\x01\x12\x03\x07\x02\
    \x16\n\r\n\x05\x04\0\x02\x01\x04\x12\x04\x07\x02\x06\x10\n\x0c\n\x05\x04\
    \0\x02\x01\x05\x12\x03\x07\x02\x08\n\x0c\n\x05\x04\0\x02\x01\x01\x12\x03\
    \x07\t\x11\n\x0c\n\x05\x04\0\x02\x01\x03\x12\x03\x07\x14\x15\n\x0b\n\x04\
    \x04\0\x02\x02\x12\x03\x08\x02\x16\n\r\n\x05\x04\0\x02\x02\x04\x12\x04\
    \x08\x02\x07\x16\n\x0c\n\x05\x04\0\x02\x02\x05\x12\x03\x08\x02\x08\n\x0c\
    \n\x05\x04\0\x02\x02\x01\x12\x03\x08\t\x11\n\x0c\n\x05\x04\0\x02\x02\x03\
    \x12\x03\x08\x14\x15\n\x0b\n\x04\x04\0\x02\x03\x12\x03\t\x02\x19\n\r\n\
    \x05\x04\0\x02\x03\x04\x12\x04\t\x02\x08\x16\n\x0c\n\x05\x04\0\x02\x03\
    \x05\x12\x03\t\x02\x08\n\x0c\n\x05\x04\0\x02\x03\x01\x12\x03\t\t\x14\n\
    \x0c\n\x05\x04\0\x02\x03\x03\x12\x03\t\x17\x18\n\x0b\n\x04\x04\0\x02\x04\
    \x12\x03\n\x02\x14\n\r\n\x05\x04\0\x02\x04\x04\x12\x04\n\x02\t\x19\n\x0c\
    \n\x05\x04\0\x02\x04\x05\x12\x03\n\x02\x07\n\x0c\n\x05\x04\0\x02\x04\x01\
    \x12\x03\n\x08\x0f\n\x0c\n\x05\x04\0\x02\x04\x03\x12\x03\n\x12\x13\n\n\n\
    \x02\x04\x01\x12\x04\r\0\x12\x01\n\n\n\x03\x04\x01\x01\x12\x03\r\x08\r\n\
    \x0b\n\x04\x04\x01\x02\0\x12\x03\x0e\x02\x10\n\r\n\x05\x04\x01\x02\0\x04\
    \x12\x04\x0e\x02\r\x0f\n\x0c\n\x05\x04\x01\x02\0\x05\x12\x03\x0e\x02\x07\
    \n\x0c\n\x05\x04\x01\x02\0\x01\x12\x03\x0e\x08\x0b\n\x0c\n\x05\x04\x01\
    \x02\0\x03\x12\x03\x0e\x0e\x0f\n\x0b\n\x04\x04\x01\x02\x01\x12\x03\x0f\
    \x02\x13\n\r\n\x05\x04\x01\x02\x01\x04\x12\x04\x0f\x02\x0e\x10\n\x0c\n\
    \x05\x04\x01\x02\x01\x05\x12\x03\x0f\x02\x07\n\x0c\n\x05\x04\x01\x02\x01\
    \x01\x12\x03\x0f\x08\x0e\n\x0c\n\x05\x04\x01\x02\x01\x03\x12\x03\x0f\x11\
    \x12\n\x0b\n\x04\x04\x01\x02\x02\x12\x03\x10\x02\x14\n\r\n\x05\x04\x01\
    \x02\x02\x04\x12\x04\x10\x02\x0f\x13\n\x0c\n\x05\x04\x01\x02\x02\x06\x12\
    \x03\x10\x02\t\n\x0c\n\x05\x04\x01\x02\x02\x01\x12\x03\x10\n\x0f\n\x0c\n\
    \x05\x04\x01\x02\x02\x03\x12\x03\x10\x12\x13\n\x0b\n\x04\x04\x01\x02\x03\
    \x12\x03\x11\x02\x17\n\r\n\x05\x04\x01\x02\x03\x04\x12\x04\x11\x02\x10\
    \x14\n\x0c\n\x05\x04\x01\x02\x03\x06\x12\x03\x11\x02\t\n\x0c\n\x05\x04\
    \x01\x02\x03\x01\x12\x03\x11\n\x12\n\x0c\n\x05\x04\x01\x02\x03\x03\x12\
    \x03\x11\x15\x16\n\n\n\x02\x04\x02\x12\x04\x14\0\x1a\x01\n\n\n\x03\x04\
    \x02\x01\x12\x03\x14\x08\x0c\n\x0b\n\x04\x04\x02\x02\0\x12\x03\x15\x02\
    \x10\n\r\n\x05\x04\x02\x02\0\x04\x12\x04\x15\x02\x14\x0e\n\x0c\n\x05\x04\
    \x02\x02\0\x05\x12\x03\x15\x02\x07\n\x0c\n\x05\x04\x02\x02\0\x01\x12\x03\
    \x15\x08\x0b\n\x0c\n\x05\x04\x02\x02\0\x03\x12\x03\x15\x0e\x0f\n\x0b\n\
    \x04\x04\x02\x02\x01\x12\x03\x16\x02\x14\n\r\n\x05\x04\x02\x02\x01\x04\
    \x12\x04\x16\x02\x15\x10\n\x0c\n\x05\x04\x02\x02\x01\x06\x12\x03\x16\x02\
    \t\n\x0c\n\x05\x04\x02\x02\x01\x01\x12\x03\x16\n\x0f\n\x0c\n\x05\x04\x02\
    \x02\x01\x03\x12\x03\x16\x12\x13\n\x0b\n\x04\x04\x02\x02\x02\x12\x03\x17\
    \x02\x12\n\r\n\x05\x04\x02\x02\x02\x04\x12\x04\x17\x02\x16\x14\n\x0c\n\
    \x05\x04\x02\x02\x02\x05\x12\x03\x17\x02\x08\n\x0c\n\x05\x04\x02\x02\x02\
    \x01\x12\x03\x17\t\r\n\x0c\n\x05\x04\x02\x02\x02\x03\x12\x03\x17\x10\x11\
    \n\x0b\n\x04\x04\x02\x02\x03\x12\x03\x18\x02\x1d\n\x0c\n\x05\x04\x02\x02\
    \x03\x04\x12\x03\x18\x02\n\n\x0c\n\x05\x04\x02\x02\x03\x06\x12\x03\x18\
    \x0b\x13\n\x0c\n\x05\x04\x02\x02\x03\x01\x12\x03\x18\x14\x18\n\x0c\n\x05\
    \x04\x02\x02\x03\x03\x12\x03\x18\x1b\x1c\n\x0b\n\x04\x04\x02\x02\x04\x12\
    \x03\x19\x02\x1c\n\x0c\n\x05\x04\x02\x02\x04\x04\x12\x03\x19\x02\n\n\x0c\
    \n\x05\x04\x02\x02\x04\x06\x12\x03\x19\x0b\x0f\n\x0c\n\x05\x04\x02\x02\
    \x04\x01\x12\x03\x19\x10\x17\n\x0c\n\x05\x04\x02\x02\x04\x03\x12\x03\x19\
    \x1a\x1b\n\n\n\x02\x04\x03\x12\x04\x1c\0!\x01\n\n\n\x03\x04\x03\x01\x12\
    \x03\x1c\x08\x10\n\x0b\n\x04\x04\x03\x02\0\x12\x03\x1d\x02\x10\n\r\n\x05\
    \x04\x03\x02\0\x04\x12\x04\x1d\x02\x1c\x12\n\x0c\n\x05\x04\x03\x02\0\x05\
    \x12\x03\x1d\x02\x07\n\x0c\n\x05\x04\x03\x02\0\x01\x12\x03\x1d\x08\x0b\n\
    \x0c\n\x05\x04\x03\x02\0\x03\x12\x03\x1d\x0e\x0f\n\x0b\n\x04\x04\x03\x02\
    \x01\x12\x03\x1e\x02\x12\n\r\n\x05\x04\x03\x02\x01\x04\x12\x04\x1e\x02\
    \x1d\x10\n\x0c\n\x05\x04\x03\x02\x01\x05\x12\x03\x1e\x02\x08\n\x0c\n\x05\
    \x04\x03\x02\x01\x01\x12\x03\x1e\t\r\n\x0c\n\x05\x04\x03\x02\x01\x03\x12\
    \x03\x1e\x10\x11\n\x0b\n\x04\x04\x03\x02\x02\x12\x03\x1f\x02\x12\n\r\n\
    \x05\x04\x03\x02\x02\x04\x12\x04\x1f\x02\x1e\x12\n\x0c\n\x05\x04\x03\x02\
    \x02\x05\x12\x03\x1f\x02\x07\n\x0c\n\x05\x04\x03\x02\x02\x01\x12\x03\x1f\
    \x08\r\n\x0c\n\x05\x04\x03\x02\x02\x03\x12\x03\x1f\x10\x11\n\x0b\n\x04\
    \x04\x03\x02\x03\x12\x03\x20\x02\x15\n\r\n\x05\x04\x03\x02\x03\x04\x12\
    \x04\x20\x02\x1f\x12\n\x0c\n\x05\x04\x03\x02\x03\x06\x12\x03\x20\x02\x06\
    \n\x0c\n\x05\x04\x03\x02\x03\x01\x12\x03\x20\x07\x10\n\x0c\n\x05\x04\x03\
    \x02\x03\x03\x12\x03\x20\x13\x14\n\n\n\x02\x04\x04\x12\x04#\0&\x01\n\n\n\
    \x03\x04\x04\x01\x12\x03#\x08\x0f\n\x0b\n\x04\x04\x04\x02\0\x12\x03$\x02\
    \x16\n\r\n\x05\x04\x04\x02\0\x04\x12\x04$\x02#\x11\n\x0c\n\x05\x04\x04\
    \x02\0\x06\x12\x03$\x02\t\n\x0c\n\x05\x04\x04\x02\0\x01\x12\x03$\n\x11\n\
    \x0c\n\x05\x04\x04\x02\0\x03\x12\x03$\x14\x15\n\x0b\n\x04\x04\x04\x02\
    \x01\x12\x03%\x02\x13\n\r\n\x05\x04\x04\x02\x01\x04\x12\x04%\x02$\x16\n\
    \x0c\n\x05\x04\x04\x02\x01\x05\x12\x03%\x02\x06\n\x0c\n\x05\x04\x04\x02\
    \x01\x01\x12\x03%\x07\x0e\n\x0c\n\x05\x04\x04\x02\x01\x03\x12\x03%\x11\
    \x12\n\n\n\x02\x04\x05\x12\x04(\04\x01\n\n\n\x03\x04\x05\x01\x12\x03(\
    \x08\x13\n\x0b\n\x04\x04\x05\x02\0\x12\x03)\x02,\n\r\n\x05\x04\x05\x02\0\
    \x04\x12\x04)\x02(\x15\n\x0c\n\x05\x04\x05\x02\0\x06\x12\x03)\x02\x13\n\
    \x0c\n\x05\x04\x05\x02\0\x01\x12\x03)\x14'\n\x0c\n\x05\x04\x05\x02\0\x03\
    \x12\x03)*+\n\x0b\n\x04\x04\x05\x02\x01\x12\x03*\x02\"\n\r\n\x05\x04\x05\
    \x02\x01\x04\x12\x04*\x02),\n\x0c\n\x05\x04\x05\x02\x01\x06\x12\x03*\x02\
    \t\n\x0c\n\x05\x04\x05\x02\x01\x01\x12\x03*\n\x1d\n\x0c\n\x05\x04\x05\
    \x02\x01\x03\x12\x03*\x20!\n\x0b\n\x04\x04\x05\x02\x02\x12\x03+\x02!\n\r\
    \n\x05\x04\x05\x02\x02\x04\x12\x04+\x02*\"\n\x0c\n\x05\x04\x05\x02\x02\
    \x06\x12\x03+\x02\x07\n\x0c\n\x05\x04\x05\x02\x02\x01\x12\x03+\x08\x1c\n\
    \x0c\n\x05\x04\x05\x02\x02\x03\x12\x03+\x1f\x20\n\x0b\n\x04\x04\x05\x02\
    \x03\x12\x03,\x02\x1f\n\r\n\x05\x04\x05\x02\x03\x04\x12\x04,\x02+!\n\x0c\
    \n\x05\x04\x05\x02\x03\x06\x12\x03,\x02\x06\n\x0c\n\x05\x04\x05\x02\x03\
    \x01\x12\x03,\x07\x1a\n\x0c\n\x05\x04\x05\x02\x03\x03\x12\x03,\x1d\x1e\n\
    \x0b\n\x04\x04\x05\x02\x04\x12\x03-\x02\x13\n\r\n\x05\x04\x05\x02\x04\
    \x04\x12\x04-\x02,\x1f\n\x0c\n\x05\x04\x05\x02\x04\x05\x12\x03-\x02\x07\
    \n\x0c\n\x05\x04\x05\x02\x04\x01\x12\x03-\x08\x0e\n\x0c\n\x05\x04\x05\
    \x02\x04\x03\x12\x03-\x11\x12\n\x0c\n\x04\x04\x05\x04\0\x12\x04.\x021\
    \x03\n\x0c\n\x05\x04\x05\x04\0\x01\x12\x03.\x07\x0b\n\r\n\x06\x04\x05\
    \x04\0\x02\0\x12\x03/\x04\r\n\x0e\n\x07\x04\x05\x04\0\x02\0\x01\x12\x03/\
    \x04\x08\n\x0e\n\x07\x04\x05\x04\0\x02\0\x02\x12\x03/\x0b\x0c\n\r\n\x06\
    \x04\x05\x04\0\x02\x01\x12\x030\x04\x0b\n\x0e\n\x07\x04\x05\x04\0\x02\
    \x01\x01\x12\x030\x04\x06\n\x0e\n\x07\x04\x05\x04\0\x02\x01\x02\x12\x030\
    \t\n\n\x0b\n\x04\x04\x05\x02\x05\x12\x032\x02\x1c\n\r\n\x05\x04\x05\x02\
    \x05\x04\x12\x042\x021\x03\n\x0c\n\x05\x04\x05\x02\x05\x06\x12\x032\x02\
    \x06\n\x0c\n\x05\x04\x05\x02\x05\x01\x12\x032\x07\x17\n\x0c\n\x05\x04\
    \x05\x02\x05\x03\x12\x032\x1a\x1b\n\x0b\n\x04\x04\x05\x02\x06\x12\x033\
    \x02*\n\r\n\x05\x04\x05\x02\x06\x04\x12\x043\x022\x1c\n\x0c\n\x05\x04\
    \x05\x02\x06\x06\x12\x033\x02\x1b\n\x0c\n\x05\x04\x05\x02\x06\x01\x12\
    \x033\x1c%\n\x0c\n\x05\x04\x05\x02\x06\x03\x12\x033()\n\n\n\x02\x04\x06\
    \x12\x046\09\x01\n\n\n\x03\x04\x06\x01\x12\x036\x08\x0f\n\x0b\n\x04\x04\
    \x06\x02\0\x12\x037\x02\x10\n\r\n\x05\x04\x06\x02\0\x04\x12\x047\x026\
    \x11\n\x0c\n\x05\x04\x06\x02\0\x05\x12\x037\x02\x07\n\x0c\n\x05\x04\x06\
    \x02\0\x01\x12\x037\x08\x0b\n\x0c\n\x05\x04\x06\x02\0\x03\x12\x037\x0e\
    \x0f\n\x0b\n\x04\x04\x06\x02\x01\x12\x038\x02\x16\n\r\n\x05\x04\x06\x02\
    \x01\x04\x12\x048\x027\x10\n\x0c\n\x05\x04\x06\x02\x01\x05\x12\x038\x02\
    \x08\n\x0c\n\x05\x04\x06\x02\x01\x01\x12\x038\t\x11\n\x0c\n\x05\x04\x06\
    \x02\x01\x03\x12\x038\x14\x15\n\n\n\x02\x05\0\x12\x04;\0?\x01\n\n\n\x03\
    \x05\0\x01\x12\x03;\x05\x16\n\x0b\n\x04\x05\0\x02\0\x12\x03<\x02\x0b\n\
    \x0c\n\x05\x05\0\x02\0\x01\x12\x03<\x02\x06\n\x0c\n\x05\x05\0\x02\0\x02\
    \x12\x03<\t\n\n\x0b\n\x04\x05\0\x02\x01\x12\x03=\x02\x0c\n\x0c\n\x05\x05\
    \0\x02\x01\x01\x12\x03=\x02\x07\n\x0c\n\x05\x05\0\x02\x01\x02\x12\x03=\n\
    \x0b\n\x0b\n\x04\x05\0\x02\x02\x12\x03>\x02\x0b\n\x0c\n\x05\x05\0\x02\
    \x02\x01\x12\x03>\x02\x06\n\x0c\n\x05\x05\0\x02\x02\x02\x12\x03>\t\nb\
    \x06proto3\
";

static mut file_descriptor_proto_lazy: ::protobuf::lazy::Lazy<::protobuf::descriptor::FileDescriptorProto> = ::protobuf::lazy::Lazy {
    lock: ::protobuf::lazy::ONCE_INIT,
    ptr: 0 as *const ::protobuf::descriptor::FileDescriptorProto,
};

fn parse_descriptor_proto() -> ::protobuf::descriptor::FileDescriptorProto {
    ::protobuf::parse_from_bytes(file_descriptor_proto_data).unwrap()
}

pub fn file_descriptor_proto() -> &'static ::protobuf::descriptor::FileDescriptorProto {
    unsafe {
        file_descriptor_proto_lazy.get(|| {
            parse_descriptor_proto()
        })
    }
}
