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
pub struct RegisterRequest {
    // message fields
    pub phone_no: ::std::string::String,
    pub username: ::std::string::String,
    pub password: ::std::string::String,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for RegisterRequest {}

impl RegisterRequest {
    pub fn new() -> RegisterRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static RegisterRequest {
        static mut instance: ::protobuf::lazy::Lazy<RegisterRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const RegisterRequest,
        };
        unsafe {
            instance.get(RegisterRequest::new)
        }
    }

    // string phone_no = 1;

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

    // string password = 3;

    pub fn clear_password(&mut self) {
        self.password.clear();
    }

    // Param is passed by value, moved
    pub fn set_password(&mut self, v: ::std::string::String) {
        self.password = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_password(&mut self) -> &mut ::std::string::String {
        &mut self.password
    }

    // Take field
    pub fn take_password(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.password, ::std::string::String::new())
    }

    pub fn get_password(&self) -> &str {
        &self.password
    }

    fn get_password_for_reflect(&self) -> &::std::string::String {
        &self.password
    }

    fn mut_password_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.password
    }
}

impl ::protobuf::Message for RegisterRequest {
    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.phone_no)?;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.username)?;
                },
                3 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.password)?;
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
        if !self.phone_no.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.phone_no);
        }
        if !self.username.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.username);
        }
        if !self.password.is_empty() {
            my_size += ::protobuf::rt::string_size(3, &self.password);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if !self.phone_no.is_empty() {
            os.write_string(1, &self.phone_no)?;
        }
        if !self.username.is_empty() {
            os.write_string(2, &self.username)?;
        }
        if !self.password.is_empty() {
            os.write_string(3, &self.password)?;
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

impl ::protobuf::MessageStatic for RegisterRequest {
    fn new() -> RegisterRequest {
        RegisterRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<RegisterRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "phone_no",
                    RegisterRequest::get_phone_no_for_reflect,
                    RegisterRequest::mut_phone_no_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "username",
                    RegisterRequest::get_username_for_reflect,
                    RegisterRequest::mut_username_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "password",
                    RegisterRequest::get_password_for_reflect,
                    RegisterRequest::mut_password_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<RegisterRequest>(
                    "RegisterRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for RegisterRequest {
    fn clear(&mut self) {
        self.clear_phone_no();
        self.clear_username();
        self.clear_password();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for RegisterRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RegisterRequest {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct RegisterResponse {
    // message fields
    pub user: ::protobuf::SingularPtrField<super::models::User>,
    pub successful: bool,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for RegisterResponse {}

impl RegisterResponse {
    pub fn new() -> RegisterResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static RegisterResponse {
        static mut instance: ::protobuf::lazy::Lazy<RegisterResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const RegisterResponse,
        };
        unsafe {
            instance.get(RegisterResponse::new)
        }
    }

    // .pesto.models.User user = 1;

    pub fn clear_user(&mut self) {
        self.user.clear();
    }

    pub fn has_user(&self) -> bool {
        self.user.is_some()
    }

    // Param is passed by value, moved
    pub fn set_user(&mut self, v: super::models::User) {
        self.user = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_user(&mut self) -> &mut super::models::User {
        if self.user.is_none() {
            self.user.set_default();
        }
        self.user.as_mut().unwrap()
    }

    // Take field
    pub fn take_user(&mut self) -> super::models::User {
        self.user.take().unwrap_or_else(|| super::models::User::new())
    }

    pub fn get_user(&self) -> &super::models::User {
        self.user.as_ref().unwrap_or_else(|| super::models::User::default_instance())
    }

    fn get_user_for_reflect(&self) -> &::protobuf::SingularPtrField<super::models::User> {
        &self.user
    }

    fn mut_user_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<super::models::User> {
        &mut self.user
    }

    // bool successful = 2;

    pub fn clear_successful(&mut self) {
        self.successful = false;
    }

    // Param is passed by value, moved
    pub fn set_successful(&mut self, v: bool) {
        self.successful = v;
    }

    pub fn get_successful(&self) -> bool {
        self.successful
    }

    fn get_successful_for_reflect(&self) -> &bool {
        &self.successful
    }

    fn mut_successful_for_reflect(&mut self) -> &mut bool {
        &mut self.successful
    }
}

impl ::protobuf::Message for RegisterResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.user {
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
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.user)?;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_bool()?;
                    self.successful = tmp;
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
        if let Some(ref v) = self.user.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if self.successful != false {
            my_size += 2;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if let Some(ref v) = self.user.as_ref() {
            os.write_tag(1, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if self.successful != false {
            os.write_bool(2, self.successful)?;
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

impl ::protobuf::MessageStatic for RegisterResponse {
    fn new() -> RegisterResponse {
        RegisterResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<RegisterResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::User>>(
                    "user",
                    RegisterResponse::get_user_for_reflect,
                    RegisterResponse::mut_user_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "successful",
                    RegisterResponse::get_successful_for_reflect,
                    RegisterResponse::mut_successful_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<RegisterResponse>(
                    "RegisterResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for RegisterResponse {
    fn clear(&mut self) {
        self.clear_user();
        self.clear_successful();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for RegisterResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RegisterResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct LoginRequest {
    // message fields
    pub username: ::std::string::String,
    pub password: ::std::string::String,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for LoginRequest {}

impl LoginRequest {
    pub fn new() -> LoginRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static LoginRequest {
        static mut instance: ::protobuf::lazy::Lazy<LoginRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const LoginRequest,
        };
        unsafe {
            instance.get(LoginRequest::new)
        }
    }

    // string username = 1;

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

    // string password = 2;

    pub fn clear_password(&mut self) {
        self.password.clear();
    }

    // Param is passed by value, moved
    pub fn set_password(&mut self, v: ::std::string::String) {
        self.password = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_password(&mut self) -> &mut ::std::string::String {
        &mut self.password
    }

    // Take field
    pub fn take_password(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.password, ::std::string::String::new())
    }

    pub fn get_password(&self) -> &str {
        &self.password
    }

    fn get_password_for_reflect(&self) -> &::std::string::String {
        &self.password
    }

    fn mut_password_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.password
    }
}

impl ::protobuf::Message for LoginRequest {
    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.username)?;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.password)?;
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
        if !self.username.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.username);
        }
        if !self.password.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.password);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if !self.username.is_empty() {
            os.write_string(1, &self.username)?;
        }
        if !self.password.is_empty() {
            os.write_string(2, &self.password)?;
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

impl ::protobuf::MessageStatic for LoginRequest {
    fn new() -> LoginRequest {
        LoginRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<LoginRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "username",
                    LoginRequest::get_username_for_reflect,
                    LoginRequest::mut_username_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "password",
                    LoginRequest::get_password_for_reflect,
                    LoginRequest::mut_password_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<LoginRequest>(
                    "LoginRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for LoginRequest {
    fn clear(&mut self) {
        self.clear_username();
        self.clear_password();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for LoginRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for LoginRequest {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct LoginResponse {
    // message fields
    pub user: ::protobuf::SingularPtrField<super::models::User>,
    pub successful: bool,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for LoginResponse {}

impl LoginResponse {
    pub fn new() -> LoginResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static LoginResponse {
        static mut instance: ::protobuf::lazy::Lazy<LoginResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const LoginResponse,
        };
        unsafe {
            instance.get(LoginResponse::new)
        }
    }

    // .pesto.models.User user = 1;

    pub fn clear_user(&mut self) {
        self.user.clear();
    }

    pub fn has_user(&self) -> bool {
        self.user.is_some()
    }

    // Param is passed by value, moved
    pub fn set_user(&mut self, v: super::models::User) {
        self.user = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_user(&mut self) -> &mut super::models::User {
        if self.user.is_none() {
            self.user.set_default();
        }
        self.user.as_mut().unwrap()
    }

    // Take field
    pub fn take_user(&mut self) -> super::models::User {
        self.user.take().unwrap_or_else(|| super::models::User::new())
    }

    pub fn get_user(&self) -> &super::models::User {
        self.user.as_ref().unwrap_or_else(|| super::models::User::default_instance())
    }

    fn get_user_for_reflect(&self) -> &::protobuf::SingularPtrField<super::models::User> {
        &self.user
    }

    fn mut_user_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<super::models::User> {
        &mut self.user
    }

    // bool successful = 2;

    pub fn clear_successful(&mut self) {
        self.successful = false;
    }

    // Param is passed by value, moved
    pub fn set_successful(&mut self, v: bool) {
        self.successful = v;
    }

    pub fn get_successful(&self) -> bool {
        self.successful
    }

    fn get_successful_for_reflect(&self) -> &bool {
        &self.successful
    }

    fn mut_successful_for_reflect(&mut self) -> &mut bool {
        &mut self.successful
    }
}

impl ::protobuf::Message for LoginResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.user {
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
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.user)?;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_bool()?;
                    self.successful = tmp;
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
        if let Some(ref v) = self.user.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if self.successful != false {
            my_size += 2;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if let Some(ref v) = self.user.as_ref() {
            os.write_tag(1, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if self.successful != false {
            os.write_bool(2, self.successful)?;
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

impl ::protobuf::MessageStatic for LoginResponse {
    fn new() -> LoginResponse {
        LoginResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<LoginResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::User>>(
                    "user",
                    LoginResponse::get_user_for_reflect,
                    LoginResponse::mut_user_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "successful",
                    LoginResponse::get_successful_for_reflect,
                    LoginResponse::mut_successful_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<LoginResponse>(
                    "LoginResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for LoginResponse {
    fn clear(&mut self) {
        self.clear_user();
        self.clear_successful();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for LoginResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for LoginResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct TopupRequest {
    // message fields
    pub uid: i32,
    pub amount: i32,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for TopupRequest {}

impl TopupRequest {
    pub fn new() -> TopupRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static TopupRequest {
        static mut instance: ::protobuf::lazy::Lazy<TopupRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const TopupRequest,
        };
        unsafe {
            instance.get(TopupRequest::new)
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
}

impl ::protobuf::Message for TopupRequest {
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
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.amount = tmp;
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

impl ::protobuf::MessageStatic for TopupRequest {
    fn new() -> TopupRequest {
        TopupRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<TopupRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "uid",
                    TopupRequest::get_uid_for_reflect,
                    TopupRequest::mut_uid_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "amount",
                    TopupRequest::get_amount_for_reflect,
                    TopupRequest::mut_amount_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<TopupRequest>(
                    "TopupRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for TopupRequest {
    fn clear(&mut self) {
        self.clear_uid();
        self.clear_amount();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for TopupRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for TopupRequest {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct TopupResponse {
    // message fields
    pub user: ::protobuf::SingularPtrField<super::models::User>,
    pub successful: bool,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for TopupResponse {}

impl TopupResponse {
    pub fn new() -> TopupResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static TopupResponse {
        static mut instance: ::protobuf::lazy::Lazy<TopupResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const TopupResponse,
        };
        unsafe {
            instance.get(TopupResponse::new)
        }
    }

    // .pesto.models.User user = 1;

    pub fn clear_user(&mut self) {
        self.user.clear();
    }

    pub fn has_user(&self) -> bool {
        self.user.is_some()
    }

    // Param is passed by value, moved
    pub fn set_user(&mut self, v: super::models::User) {
        self.user = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_user(&mut self) -> &mut super::models::User {
        if self.user.is_none() {
            self.user.set_default();
        }
        self.user.as_mut().unwrap()
    }

    // Take field
    pub fn take_user(&mut self) -> super::models::User {
        self.user.take().unwrap_or_else(|| super::models::User::new())
    }

    pub fn get_user(&self) -> &super::models::User {
        self.user.as_ref().unwrap_or_else(|| super::models::User::default_instance())
    }

    fn get_user_for_reflect(&self) -> &::protobuf::SingularPtrField<super::models::User> {
        &self.user
    }

    fn mut_user_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<super::models::User> {
        &mut self.user
    }

    // bool successful = 2;

    pub fn clear_successful(&mut self) {
        self.successful = false;
    }

    // Param is passed by value, moved
    pub fn set_successful(&mut self, v: bool) {
        self.successful = v;
    }

    pub fn get_successful(&self) -> bool {
        self.successful
    }

    fn get_successful_for_reflect(&self) -> &bool {
        &self.successful
    }

    fn mut_successful_for_reflect(&mut self) -> &mut bool {
        &mut self.successful
    }
}

impl ::protobuf::Message for TopupResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.user {
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
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.user)?;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_bool()?;
                    self.successful = tmp;
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
        if let Some(ref v) = self.user.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if self.successful != false {
            my_size += 2;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if let Some(ref v) = self.user.as_ref() {
            os.write_tag(1, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if self.successful != false {
            os.write_bool(2, self.successful)?;
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

impl ::protobuf::MessageStatic for TopupResponse {
    fn new() -> TopupResponse {
        TopupResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<TopupResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::User>>(
                    "user",
                    TopupResponse::get_user_for_reflect,
                    TopupResponse::mut_user_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "successful",
                    TopupResponse::get_successful_for_reflect,
                    TopupResponse::mut_successful_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<TopupResponse>(
                    "TopupResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for TopupResponse {
    fn clear(&mut self) {
        self.clear_user();
        self.clear_successful();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for TopupResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for TopupResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct TransactionRequest {
    // message fields
    pub payer_id: i32,
    pub payee_id: i32,
    pub amount: i32,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for TransactionRequest {}

impl TransactionRequest {
    pub fn new() -> TransactionRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static TransactionRequest {
        static mut instance: ::protobuf::lazy::Lazy<TransactionRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const TransactionRequest,
        };
        unsafe {
            instance.get(TransactionRequest::new)
        }
    }

    // int32 payer_id = 1;

    pub fn clear_payer_id(&mut self) {
        self.payer_id = 0;
    }

    // Param is passed by value, moved
    pub fn set_payer_id(&mut self, v: i32) {
        self.payer_id = v;
    }

    pub fn get_payer_id(&self) -> i32 {
        self.payer_id
    }

    fn get_payer_id_for_reflect(&self) -> &i32 {
        &self.payer_id
    }

    fn mut_payer_id_for_reflect(&mut self) -> &mut i32 {
        &mut self.payer_id
    }

    // int32 payee_id = 2;

    pub fn clear_payee_id(&mut self) {
        self.payee_id = 0;
    }

    // Param is passed by value, moved
    pub fn set_payee_id(&mut self, v: i32) {
        self.payee_id = v;
    }

    pub fn get_payee_id(&self) -> i32 {
        self.payee_id
    }

    fn get_payee_id_for_reflect(&self) -> &i32 {
        &self.payee_id
    }

    fn mut_payee_id_for_reflect(&mut self) -> &mut i32 {
        &mut self.payee_id
    }

    // int32 amount = 3;

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
}

impl ::protobuf::Message for TransactionRequest {
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
                    self.payer_id = tmp;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.payee_id = tmp;
                },
                3 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.amount = tmp;
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
        if self.payer_id != 0 {
            my_size += ::protobuf::rt::value_size(1, self.payer_id, ::protobuf::wire_format::WireTypeVarint);
        }
        if self.payee_id != 0 {
            my_size += ::protobuf::rt::value_size(2, self.payee_id, ::protobuf::wire_format::WireTypeVarint);
        }
        if self.amount != 0 {
            my_size += ::protobuf::rt::value_size(3, self.amount, ::protobuf::wire_format::WireTypeVarint);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.payer_id != 0 {
            os.write_int32(1, self.payer_id)?;
        }
        if self.payee_id != 0 {
            os.write_int32(2, self.payee_id)?;
        }
        if self.amount != 0 {
            os.write_int32(3, self.amount)?;
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

impl ::protobuf::MessageStatic for TransactionRequest {
    fn new() -> TransactionRequest {
        TransactionRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<TransactionRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "payer_id",
                    TransactionRequest::get_payer_id_for_reflect,
                    TransactionRequest::mut_payer_id_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "payee_id",
                    TransactionRequest::get_payee_id_for_reflect,
                    TransactionRequest::mut_payee_id_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "amount",
                    TransactionRequest::get_amount_for_reflect,
                    TransactionRequest::mut_amount_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<TransactionRequest>(
                    "TransactionRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for TransactionRequest {
    fn clear(&mut self) {
        self.clear_payer_id();
        self.clear_payee_id();
        self.clear_amount();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for TransactionRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for TransactionRequest {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct TransactionResponse {
    // message fields
    pub user: ::protobuf::SingularPtrField<super::models::User>,
    pub transaction_id: i32,
    pub successful: bool,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for TransactionResponse {}

impl TransactionResponse {
    pub fn new() -> TransactionResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static TransactionResponse {
        static mut instance: ::protobuf::lazy::Lazy<TransactionResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const TransactionResponse,
        };
        unsafe {
            instance.get(TransactionResponse::new)
        }
    }

    // .pesto.models.User user = 1;

    pub fn clear_user(&mut self) {
        self.user.clear();
    }

    pub fn has_user(&self) -> bool {
        self.user.is_some()
    }

    // Param is passed by value, moved
    pub fn set_user(&mut self, v: super::models::User) {
        self.user = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_user(&mut self) -> &mut super::models::User {
        if self.user.is_none() {
            self.user.set_default();
        }
        self.user.as_mut().unwrap()
    }

    // Take field
    pub fn take_user(&mut self) -> super::models::User {
        self.user.take().unwrap_or_else(|| super::models::User::new())
    }

    pub fn get_user(&self) -> &super::models::User {
        self.user.as_ref().unwrap_or_else(|| super::models::User::default_instance())
    }

    fn get_user_for_reflect(&self) -> &::protobuf::SingularPtrField<super::models::User> {
        &self.user
    }

    fn mut_user_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<super::models::User> {
        &mut self.user
    }

    // int32 transaction_id = 2;

    pub fn clear_transaction_id(&mut self) {
        self.transaction_id = 0;
    }

    // Param is passed by value, moved
    pub fn set_transaction_id(&mut self, v: i32) {
        self.transaction_id = v;
    }

    pub fn get_transaction_id(&self) -> i32 {
        self.transaction_id
    }

    fn get_transaction_id_for_reflect(&self) -> &i32 {
        &self.transaction_id
    }

    fn mut_transaction_id_for_reflect(&mut self) -> &mut i32 {
        &mut self.transaction_id
    }

    // bool successful = 3;

    pub fn clear_successful(&mut self) {
        self.successful = false;
    }

    // Param is passed by value, moved
    pub fn set_successful(&mut self, v: bool) {
        self.successful = v;
    }

    pub fn get_successful(&self) -> bool {
        self.successful
    }

    fn get_successful_for_reflect(&self) -> &bool {
        &self.successful
    }

    fn mut_successful_for_reflect(&mut self) -> &mut bool {
        &mut self.successful
    }
}

impl ::protobuf::Message for TransactionResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.user {
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
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.user)?;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.transaction_id = tmp;
                },
                3 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_bool()?;
                    self.successful = tmp;
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
        if let Some(ref v) = self.user.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        if self.transaction_id != 0 {
            my_size += ::protobuf::rt::value_size(2, self.transaction_id, ::protobuf::wire_format::WireTypeVarint);
        }
        if self.successful != false {
            my_size += 2;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if let Some(ref v) = self.user.as_ref() {
            os.write_tag(1, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        }
        if self.transaction_id != 0 {
            os.write_int32(2, self.transaction_id)?;
        }
        if self.successful != false {
            os.write_bool(3, self.successful)?;
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

impl ::protobuf::MessageStatic for TransactionResponse {
    fn new() -> TransactionResponse {
        TransactionResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<TransactionResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::User>>(
                    "user",
                    TransactionResponse::get_user_for_reflect,
                    TransactionResponse::mut_user_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "transaction_id",
                    TransactionResponse::get_transaction_id_for_reflect,
                    TransactionResponse::mut_transaction_id_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "successful",
                    TransactionResponse::get_successful_for_reflect,
                    TransactionResponse::mut_successful_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<TransactionResponse>(
                    "TransactionResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for TransactionResponse {
    fn clear(&mut self) {
        self.clear_user();
        self.clear_transaction_id();
        self.clear_successful();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for TransactionResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for TransactionResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct AddContactRequest {
    // message fields
    pub user_id: i32,
    pub contact_username: ::std::string::String,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for AddContactRequest {}

impl AddContactRequest {
    pub fn new() -> AddContactRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static AddContactRequest {
        static mut instance: ::protobuf::lazy::Lazy<AddContactRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const AddContactRequest,
        };
        unsafe {
            instance.get(AddContactRequest::new)
        }
    }

    // int32 user_id = 1;

    pub fn clear_user_id(&mut self) {
        self.user_id = 0;
    }

    // Param is passed by value, moved
    pub fn set_user_id(&mut self, v: i32) {
        self.user_id = v;
    }

    pub fn get_user_id(&self) -> i32 {
        self.user_id
    }

    fn get_user_id_for_reflect(&self) -> &i32 {
        &self.user_id
    }

    fn mut_user_id_for_reflect(&mut self) -> &mut i32 {
        &mut self.user_id
    }

    // string contact_username = 2;

    pub fn clear_contact_username(&mut self) {
        self.contact_username.clear();
    }

    // Param is passed by value, moved
    pub fn set_contact_username(&mut self, v: ::std::string::String) {
        self.contact_username = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_contact_username(&mut self) -> &mut ::std::string::String {
        &mut self.contact_username
    }

    // Take field
    pub fn take_contact_username(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.contact_username, ::std::string::String::new())
    }

    pub fn get_contact_username(&self) -> &str {
        &self.contact_username
    }

    fn get_contact_username_for_reflect(&self) -> &::std::string::String {
        &self.contact_username
    }

    fn mut_contact_username_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.contact_username
    }
}

impl ::protobuf::Message for AddContactRequest {
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
                    self.user_id = tmp;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.contact_username)?;
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
        if self.user_id != 0 {
            my_size += ::protobuf::rt::value_size(1, self.user_id, ::protobuf::wire_format::WireTypeVarint);
        }
        if !self.contact_username.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.contact_username);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.user_id != 0 {
            os.write_int32(1, self.user_id)?;
        }
        if !self.contact_username.is_empty() {
            os.write_string(2, &self.contact_username)?;
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

impl ::protobuf::MessageStatic for AddContactRequest {
    fn new() -> AddContactRequest {
        AddContactRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<AddContactRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "user_id",
                    AddContactRequest::get_user_id_for_reflect,
                    AddContactRequest::mut_user_id_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "contact_username",
                    AddContactRequest::get_contact_username_for_reflect,
                    AddContactRequest::mut_contact_username_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<AddContactRequest>(
                    "AddContactRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for AddContactRequest {
    fn clear(&mut self) {
        self.clear_user_id();
        self.clear_contact_username();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for AddContactRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for AddContactRequest {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct AddContactResponse {
    // message fields
    pub successful: bool,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for AddContactResponse {}

impl AddContactResponse {
    pub fn new() -> AddContactResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static AddContactResponse {
        static mut instance: ::protobuf::lazy::Lazy<AddContactResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const AddContactResponse,
        };
        unsafe {
            instance.get(AddContactResponse::new)
        }
    }

    // bool successful = 1;

    pub fn clear_successful(&mut self) {
        self.successful = false;
    }

    // Param is passed by value, moved
    pub fn set_successful(&mut self, v: bool) {
        self.successful = v;
    }

    pub fn get_successful(&self) -> bool {
        self.successful
    }

    fn get_successful_for_reflect(&self) -> &bool {
        &self.successful
    }

    fn mut_successful_for_reflect(&mut self) -> &mut bool {
        &mut self.successful
    }
}

impl ::protobuf::Message for AddContactResponse {
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
                    let tmp = is.read_bool()?;
                    self.successful = tmp;
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
        if self.successful != false {
            my_size += 2;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.successful != false {
            os.write_bool(1, self.successful)?;
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

impl ::protobuf::MessageStatic for AddContactResponse {
    fn new() -> AddContactResponse {
        AddContactResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<AddContactResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "successful",
                    AddContactResponse::get_successful_for_reflect,
                    AddContactResponse::mut_successful_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<AddContactResponse>(
                    "AddContactResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for AddContactResponse {
    fn clear(&mut self) {
        self.clear_successful();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for AddContactResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for AddContactResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct GetContactsResponse {
    // message fields
    pub contacts: ::protobuf::RepeatedField<super::models::Contact>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for GetContactsResponse {}

impl GetContactsResponse {
    pub fn new() -> GetContactsResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static GetContactsResponse {
        static mut instance: ::protobuf::lazy::Lazy<GetContactsResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const GetContactsResponse,
        };
        unsafe {
            instance.get(GetContactsResponse::new)
        }
    }

    // repeated .pesto.models.Contact contacts = 1;

    pub fn clear_contacts(&mut self) {
        self.contacts.clear();
    }

    // Param is passed by value, moved
    pub fn set_contacts(&mut self, v: ::protobuf::RepeatedField<super::models::Contact>) {
        self.contacts = v;
    }

    // Mutable pointer to the field.
    pub fn mut_contacts(&mut self) -> &mut ::protobuf::RepeatedField<super::models::Contact> {
        &mut self.contacts
    }

    // Take field
    pub fn take_contacts(&mut self) -> ::protobuf::RepeatedField<super::models::Contact> {
        ::std::mem::replace(&mut self.contacts, ::protobuf::RepeatedField::new())
    }

    pub fn get_contacts(&self) -> &[super::models::Contact] {
        &self.contacts
    }

    fn get_contacts_for_reflect(&self) -> &::protobuf::RepeatedField<super::models::Contact> {
        &self.contacts
    }

    fn mut_contacts_for_reflect(&mut self) -> &mut ::protobuf::RepeatedField<super::models::Contact> {
        &mut self.contacts
    }
}

impl ::protobuf::Message for GetContactsResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.contacts {
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
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.contacts)?;
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
        for value in &self.contacts {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        for v in &self.contacts {
            os.write_tag(1, ::protobuf::wire_format::WireTypeLengthDelimited)?;
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

impl ::protobuf::MessageStatic for GetContactsResponse {
    fn new() -> GetContactsResponse {
        GetContactsResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<GetContactsResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::Contact>>(
                    "contacts",
                    GetContactsResponse::get_contacts_for_reflect,
                    GetContactsResponse::mut_contacts_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<GetContactsResponse>(
                    "GetContactsResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for GetContactsResponse {
    fn clear(&mut self) {
        self.clear_contacts();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for GetContactsResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for GetContactsResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct GetTransactionsResponse {
    // message fields
    pub trnsaction: ::protobuf::RepeatedField<super::models::Transaction>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for GetTransactionsResponse {}

impl GetTransactionsResponse {
    pub fn new() -> GetTransactionsResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static GetTransactionsResponse {
        static mut instance: ::protobuf::lazy::Lazy<GetTransactionsResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const GetTransactionsResponse,
        };
        unsafe {
            instance.get(GetTransactionsResponse::new)
        }
    }

    // repeated .pesto.models.Transaction trnsaction = 1;

    pub fn clear_trnsaction(&mut self) {
        self.trnsaction.clear();
    }

    // Param is passed by value, moved
    pub fn set_trnsaction(&mut self, v: ::protobuf::RepeatedField<super::models::Transaction>) {
        self.trnsaction = v;
    }

    // Mutable pointer to the field.
    pub fn mut_trnsaction(&mut self) -> &mut ::protobuf::RepeatedField<super::models::Transaction> {
        &mut self.trnsaction
    }

    // Take field
    pub fn take_trnsaction(&mut self) -> ::protobuf::RepeatedField<super::models::Transaction> {
        ::std::mem::replace(&mut self.trnsaction, ::protobuf::RepeatedField::new())
    }

    pub fn get_trnsaction(&self) -> &[super::models::Transaction] {
        &self.trnsaction
    }

    fn get_trnsaction_for_reflect(&self) -> &::protobuf::RepeatedField<super::models::Transaction> {
        &self.trnsaction
    }

    fn mut_trnsaction_for_reflect(&mut self) -> &mut ::protobuf::RepeatedField<super::models::Transaction> {
        &mut self.trnsaction
    }
}

impl ::protobuf::Message for GetTransactionsResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.trnsaction {
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
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.trnsaction)?;
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
        for value in &self.trnsaction {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        for v in &self.trnsaction {
            os.write_tag(1, ::protobuf::wire_format::WireTypeLengthDelimited)?;
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

impl ::protobuf::MessageStatic for GetTransactionsResponse {
    fn new() -> GetTransactionsResponse {
        GetTransactionsResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<GetTransactionsResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::Transaction>>(
                    "trnsaction",
                    GetTransactionsResponse::get_trnsaction_for_reflect,
                    GetTransactionsResponse::mut_trnsaction_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<GetTransactionsResponse>(
                    "GetTransactionsResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for GetTransactionsResponse {
    fn clear(&mut self) {
        self.clear_trnsaction();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for GetTransactionsResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for GetTransactionsResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

static file_descriptor_proto_data: &'static [u8] = b"\
    \n\x13user_messages.proto\x12\x13pesto.user_messages\x1a\x0cmodels.proto\
    \"d\n\x0fRegisterRequest\x12\x19\n\x08phone_no\x18\x01\x20\x01(\tR\x07ph\
    oneNo\x12\x1a\n\x08username\x18\x02\x20\x01(\tR\x08username\x12\x1a\n\
    \x08password\x18\x03\x20\x01(\tR\x08password\"Z\n\x10RegisterResponse\
    \x12&\n\x04user\x18\x01\x20\x01(\x0b2\x12.pesto.models.UserR\x04user\x12\
    \x1e\n\nsuccessful\x18\x02\x20\x01(\x08R\nsuccessful\"F\n\x0cLoginReques\
    t\x12\x1a\n\x08username\x18\x01\x20\x01(\tR\x08username\x12\x1a\n\x08pas\
    sword\x18\x02\x20\x01(\tR\x08password\"W\n\rLoginResponse\x12&\n\x04user\
    \x18\x01\x20\x01(\x0b2\x12.pesto.models.UserR\x04user\x12\x1e\n\nsuccess\
    ful\x18\x02\x20\x01(\x08R\nsuccessful\"8\n\x0cTopupRequest\x12\x10\n\x03\
    uid\x18\x01\x20\x01(\x05R\x03uid\x12\x16\n\x06amount\x18\x02\x20\x01(\
    \x05R\x06amount\"W\n\rTopupResponse\x12&\n\x04user\x18\x01\x20\x01(\x0b2\
    \x12.pesto.models.UserR\x04user\x12\x1e\n\nsuccessful\x18\x02\x20\x01(\
    \x08R\nsuccessful\"b\n\x12TransactionRequest\x12\x19\n\x08payer_id\x18\
    \x01\x20\x01(\x05R\x07payerId\x12\x19\n\x08payee_id\x18\x02\x20\x01(\x05\
    R\x07payeeId\x12\x16\n\x06amount\x18\x03\x20\x01(\x05R\x06amount\"\x84\
    \x01\n\x13TransactionResponse\x12&\n\x04user\x18\x01\x20\x01(\x0b2\x12.p\
    esto.models.UserR\x04user\x12%\n\x0etransaction_id\x18\x02\x20\x01(\x05R\
    \rtransactionId\x12\x1e\n\nsuccessful\x18\x03\x20\x01(\x08R\nsuccessful\
    \"W\n\x11AddContactRequest\x12\x17\n\x07user_id\x18\x01\x20\x01(\x05R\
    \x06userId\x12)\n\x10contact_username\x18\x02\x20\x01(\tR\x0fcontactUser\
    name\"4\n\x12AddContactResponse\x12\x1e\n\nsuccessful\x18\x01\x20\x01(\
    \x08R\nsuccessful\"H\n\x13GetContactsResponse\x121\n\x08contacts\x18\x01\
    \x20\x03(\x0b2\x15.pesto.models.ContactR\x08contacts\"T\n\x17GetTransact\
    ionsResponse\x129\n\ntrnsaction\x18\x01\x20\x03(\x0b2\x19.pesto.models.T\
    ransactionR\ntrnsactionJ\xd5\x0f\n\x06\x12\x04\0\0@\x01\n\x08\n\x01\x0c\
    \x12\x03\0\0\x12\n\x08\n\x01\x02\x12\x03\x02\x08\x1b\n\t\n\x02\x03\0\x12\
    \x03\x04\x07\x15\n\n\n\x02\x04\0\x12\x04\x06\0\n\x01\n\n\n\x03\x04\0\x01\
    \x12\x03\x06\x08\x17\n\x0b\n\x04\x04\0\x02\0\x12\x03\x07\x02\x16\n\r\n\
    \x05\x04\0\x02\0\x04\x12\x04\x07\x02\x06\x19\n\x0c\n\x05\x04\0\x02\0\x05\
    \x12\x03\x07\x02\x08\n\x0c\n\x05\x04\0\x02\0\x01\x12\x03\x07\t\x11\n\x0c\
    \n\x05\x04\0\x02\0\x03\x12\x03\x07\x14\x15\n\x0b\n\x04\x04\0\x02\x01\x12\
    \x03\x08\x02\x16\n\r\n\x05\x04\0\x02\x01\x04\x12\x04\x08\x02\x07\x16\n\
    \x0c\n\x05\x04\0\x02\x01\x05\x12\x03\x08\x02\x08\n\x0c\n\x05\x04\0\x02\
    \x01\x01\x12\x03\x08\t\x11\n\x0c\n\x05\x04\0\x02\x01\x03\x12\x03\x08\x14\
    \x15\n\x0b\n\x04\x04\0\x02\x02\x12\x03\t\x02\x16\n\r\n\x05\x04\0\x02\x02\
    \x04\x12\x04\t\x02\x08\x16\n\x0c\n\x05\x04\0\x02\x02\x05\x12\x03\t\x02\
    \x08\n\x0c\n\x05\x04\0\x02\x02\x01\x12\x03\t\t\x11\n\x0c\n\x05\x04\0\x02\
    \x02\x03\x12\x03\t\x14\x15\n\n\n\x02\x04\x01\x12\x04\x0c\0\x0f\x01\n\n\n\
    \x03\x04\x01\x01\x12\x03\x0c\x08\x18\n\x0b\n\x04\x04\x01\x02\0\x12\x03\r\
    \x02\x17\n\r\n\x05\x04\x01\x02\0\x04\x12\x04\r\x02\x0c\x1a\n\x0c\n\x05\
    \x04\x01\x02\0\x06\x12\x03\r\x02\r\n\x0c\n\x05\x04\x01\x02\0\x01\x12\x03\
    \r\x0e\x12\n\x0c\n\x05\x04\x01\x02\0\x03\x12\x03\r\x15\x16\n\x0b\n\x04\
    \x04\x01\x02\x01\x12\x03\x0e\x02\x16\n\r\n\x05\x04\x01\x02\x01\x04\x12\
    \x04\x0e\x02\r\x17\n\x0c\n\x05\x04\x01\x02\x01\x05\x12\x03\x0e\x02\x06\n\
    \x0c\n\x05\x04\x01\x02\x01\x01\x12\x03\x0e\x07\x11\n\x0c\n\x05\x04\x01\
    \x02\x01\x03\x12\x03\x0e\x14\x15\n\n\n\x02\x04\x02\x12\x04\x11\0\x14\x01\
    \n\n\n\x03\x04\x02\x01\x12\x03\x11\x08\x14\n\x0b\n\x04\x04\x02\x02\0\x12\
    \x03\x12\x02\x16\n\r\n\x05\x04\x02\x02\0\x04\x12\x04\x12\x02\x11\x16\n\
    \x0c\n\x05\x04\x02\x02\0\x05\x12\x03\x12\x02\x08\n\x0c\n\x05\x04\x02\x02\
    \0\x01\x12\x03\x12\t\x11\n\x0c\n\x05\x04\x02\x02\0\x03\x12\x03\x12\x14\
    \x15\n\x0b\n\x04\x04\x02\x02\x01\x12\x03\x13\x02\x16\n\r\n\x05\x04\x02\
    \x02\x01\x04\x12\x04\x13\x02\x12\x16\n\x0c\n\x05\x04\x02\x02\x01\x05\x12\
    \x03\x13\x02\x08\n\x0c\n\x05\x04\x02\x02\x01\x01\x12\x03\x13\t\x11\n\x0c\
    \n\x05\x04\x02\x02\x01\x03\x12\x03\x13\x14\x15\n\n\n\x02\x04\x03\x12\x04\
    \x16\0\x19\x01\n\n\n\x03\x04\x03\x01\x12\x03\x16\x08\x15\n\x0b\n\x04\x04\
    \x03\x02\0\x12\x03\x17\x02\x17\n\r\n\x05\x04\x03\x02\0\x04\x12\x04\x17\
    \x02\x16\x17\n\x0c\n\x05\x04\x03\x02\0\x06\x12\x03\x17\x02\r\n\x0c\n\x05\
    \x04\x03\x02\0\x01\x12\x03\x17\x0e\x12\n\x0c\n\x05\x04\x03\x02\0\x03\x12\
    \x03\x17\x15\x16\n\x0b\n\x04\x04\x03\x02\x01\x12\x03\x18\x02\x16\n\r\n\
    \x05\x04\x03\x02\x01\x04\x12\x04\x18\x02\x17\x17\n\x0c\n\x05\x04\x03\x02\
    \x01\x05\x12\x03\x18\x02\x06\n\x0c\n\x05\x04\x03\x02\x01\x01\x12\x03\x18\
    \x07\x11\n\x0c\n\x05\x04\x03\x02\x01\x03\x12\x03\x18\x14\x15\n\n\n\x02\
    \x04\x04\x12\x04\x1b\0\x1e\x01\n\n\n\x03\x04\x04\x01\x12\x03\x1b\x08\x14\
    \n\x0b\n\x04\x04\x04\x02\0\x12\x03\x1c\x02\x10\n\r\n\x05\x04\x04\x02\0\
    \x04\x12\x04\x1c\x02\x1b\x16\n\x0c\n\x05\x04\x04\x02\0\x05\x12\x03\x1c\
    \x02\x07\n\x0c\n\x05\x04\x04\x02\0\x01\x12\x03\x1c\x08\x0b\n\x0c\n\x05\
    \x04\x04\x02\0\x03\x12\x03\x1c\x0e\x0f\n\x0b\n\x04\x04\x04\x02\x01\x12\
    \x03\x1d\x02\x13\n\r\n\x05\x04\x04\x02\x01\x04\x12\x04\x1d\x02\x1c\x10\n\
    \x0c\n\x05\x04\x04\x02\x01\x05\x12\x03\x1d\x02\x07\n\x0c\n\x05\x04\x04\
    \x02\x01\x01\x12\x03\x1d\x08\x0e\n\x0c\n\x05\x04\x04\x02\x01\x03\x12\x03\
    \x1d\x11\x12\n\n\n\x02\x04\x05\x12\x04\x20\0#\x01\n\n\n\x03\x04\x05\x01\
    \x12\x03\x20\x08\x15\n\x0b\n\x04\x04\x05\x02\0\x12\x03!\x02\x17\n\r\n\
    \x05\x04\x05\x02\0\x04\x12\x04!\x02\x20\x17\n\x0c\n\x05\x04\x05\x02\0\
    \x06\x12\x03!\x02\r\n\x0c\n\x05\x04\x05\x02\0\x01\x12\x03!\x0e\x12\n\x0c\
    \n\x05\x04\x05\x02\0\x03\x12\x03!\x15\x16\n\x0b\n\x04\x04\x05\x02\x01\
    \x12\x03\"\x02\x16\n\r\n\x05\x04\x05\x02\x01\x04\x12\x04\"\x02!\x17\n\
    \x0c\n\x05\x04\x05\x02\x01\x05\x12\x03\"\x02\x06\n\x0c\n\x05\x04\x05\x02\
    \x01\x01\x12\x03\"\x07\x11\n\x0c\n\x05\x04\x05\x02\x01\x03\x12\x03\"\x14\
    \x15\n\n\n\x02\x04\x06\x12\x04%\0)\x01\n\n\n\x03\x04\x06\x01\x12\x03%\
    \x08\x1a\n\x0b\n\x04\x04\x06\x02\0\x12\x03&\x02\x15\n\r\n\x05\x04\x06\
    \x02\0\x04\x12\x04&\x02%\x1c\n\x0c\n\x05\x04\x06\x02\0\x05\x12\x03&\x02\
    \x07\n\x0c\n\x05\x04\x06\x02\0\x01\x12\x03&\x08\x10\n\x0c\n\x05\x04\x06\
    \x02\0\x03\x12\x03&\x13\x14\n\x0b\n\x04\x04\x06\x02\x01\x12\x03'\x02\x15\
    \n\r\n\x05\x04\x06\x02\x01\x04\x12\x04'\x02&\x15\n\x0c\n\x05\x04\x06\x02\
    \x01\x05\x12\x03'\x02\x07\n\x0c\n\x05\x04\x06\x02\x01\x01\x12\x03'\x08\
    \x10\n\x0c\n\x05\x04\x06\x02\x01\x03\x12\x03'\x13\x14\n\x0b\n\x04\x04\
    \x06\x02\x02\x12\x03(\x02\x13\n\r\n\x05\x04\x06\x02\x02\x04\x12\x04(\x02\
    '\x15\n\x0c\n\x05\x04\x06\x02\x02\x05\x12\x03(\x02\x07\n\x0c\n\x05\x04\
    \x06\x02\x02\x01\x12\x03(\x08\x0e\n\x0c\n\x05\x04\x06\x02\x02\x03\x12\
    \x03(\x11\x12\n\n\n\x02\x04\x07\x12\x04+\0/\x01\n\n\n\x03\x04\x07\x01\
    \x12\x03+\x08\x1b\n\x0b\n\x04\x04\x07\x02\0\x12\x03,\x02\x17\n\r\n\x05\
    \x04\x07\x02\0\x04\x12\x04,\x02+\x1d\n\x0c\n\x05\x04\x07\x02\0\x06\x12\
    \x03,\x02\r\n\x0c\n\x05\x04\x07\x02\0\x01\x12\x03,\x0e\x12\n\x0c\n\x05\
    \x04\x07\x02\0\x03\x12\x03,\x15\x16\n\x0b\n\x04\x04\x07\x02\x01\x12\x03-\
    \x02\x1b\n\r\n\x05\x04\x07\x02\x01\x04\x12\x04-\x02,\x17\n\x0c\n\x05\x04\
    \x07\x02\x01\x05\x12\x03-\x02\x07\n\x0c\n\x05\x04\x07\x02\x01\x01\x12\
    \x03-\x08\x16\n\x0c\n\x05\x04\x07\x02\x01\x03\x12\x03-\x19\x1a\n\x0b\n\
    \x04\x04\x07\x02\x02\x12\x03.\x02\x16\n\r\n\x05\x04\x07\x02\x02\x04\x12\
    \x04.\x02-\x1b\n\x0c\n\x05\x04\x07\x02\x02\x05\x12\x03.\x02\x06\n\x0c\n\
    \x05\x04\x07\x02\x02\x01\x12\x03.\x07\x11\n\x0c\n\x05\x04\x07\x02\x02\
    \x03\x12\x03.\x14\x15\n\n\n\x02\x04\x08\x12\x041\04\x01\n\n\n\x03\x04\
    \x08\x01\x12\x031\x08\x19\n\x0b\n\x04\x04\x08\x02\0\x12\x032\x02\x14\n\r\
    \n\x05\x04\x08\x02\0\x04\x12\x042\x021\x1b\n\x0c\n\x05\x04\x08\x02\0\x05\
    \x12\x032\x02\x07\n\x0c\n\x05\x04\x08\x02\0\x01\x12\x032\x08\x0f\n\x0c\n\
    \x05\x04\x08\x02\0\x03\x12\x032\x12\x13\n\x0b\n\x04\x04\x08\x02\x01\x12\
    \x033\x02\x1e\n\r\n\x05\x04\x08\x02\x01\x04\x12\x043\x022\x14\n\x0c\n\
    \x05\x04\x08\x02\x01\x05\x12\x033\x02\x08\n\x0c\n\x05\x04\x08\x02\x01\
    \x01\x12\x033\t\x19\n\x0c\n\x05\x04\x08\x02\x01\x03\x12\x033\x1c\x1d\n\n\
    \n\x02\x04\t\x12\x046\08\x01\n\n\n\x03\x04\t\x01\x12\x036\x08\x1a\n\x0b\
    \n\x04\x04\t\x02\0\x12\x037\x02\x16\n\r\n\x05\x04\t\x02\0\x04\x12\x047\
    \x026\x1c\n\x0c\n\x05\x04\t\x02\0\x05\x12\x037\x02\x06\n\x0c\n\x05\x04\t\
    \x02\0\x01\x12\x037\x07\x11\n\x0c\n\x05\x04\t\x02\0\x03\x12\x037\x14\x15\
    \n\n\n\x02\x04\n\x12\x04:\0<\x01\n\n\n\x03\x04\n\x01\x12\x03:\x08\x1b\n\
    \x0b\n\x04\x04\n\x02\0\x12\x03;\x02'\n\x0c\n\x05\x04\n\x02\0\x04\x12\x03\
    ;\x02\n\n\x0c\n\x05\x04\n\x02\0\x06\x12\x03;\x0b\x19\n\x0c\n\x05\x04\n\
    \x02\0\x01\x12\x03;\x1a\"\n\x0c\n\x05\x04\n\x02\0\x03\x12\x03;%&\n\n\n\
    \x02\x04\x0b\x12\x04>\0@\x01\n\n\n\x03\x04\x0b\x01\x12\x03>\x08\x1f\n\
    \x0b\n\x04\x04\x0b\x02\0\x12\x03?\x02-\n\x0c\n\x05\x04\x0b\x02\0\x04\x12\
    \x03?\x02\n\n\x0c\n\x05\x04\x0b\x02\0\x06\x12\x03?\x0b\x1d\n\x0c\n\x05\
    \x04\x0b\x02\0\x01\x12\x03?\x1e(\n\x0c\n\x05\x04\x0b\x02\0\x03\x12\x03?+\
    ,b\x06proto3\
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
