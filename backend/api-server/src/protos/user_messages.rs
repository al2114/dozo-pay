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
pub struct RegisterDeviceTokenRequest {
    // message fields
    pub user_id: i32,
    pub device_token: ::std::string::String,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for RegisterDeviceTokenRequest {}

impl RegisterDeviceTokenRequest {
    pub fn new() -> RegisterDeviceTokenRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static RegisterDeviceTokenRequest {
        static mut instance: ::protobuf::lazy::Lazy<RegisterDeviceTokenRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const RegisterDeviceTokenRequest,
        };
        unsafe {
            instance.get(RegisterDeviceTokenRequest::new)
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

    // string device_token = 2;

    pub fn clear_device_token(&mut self) {
        self.device_token.clear();
    }

    // Param is passed by value, moved
    pub fn set_device_token(&mut self, v: ::std::string::String) {
        self.device_token = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_device_token(&mut self) -> &mut ::std::string::String {
        &mut self.device_token
    }

    // Take field
    pub fn take_device_token(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.device_token, ::std::string::String::new())
    }

    pub fn get_device_token(&self) -> &str {
        &self.device_token
    }

    fn get_device_token_for_reflect(&self) -> &::std::string::String {
        &self.device_token
    }

    fn mut_device_token_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.device_token
    }
}

impl ::protobuf::Message for RegisterDeviceTokenRequest {
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
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.device_token)?;
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
        if !self.device_token.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.device_token);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.user_id != 0 {
            os.write_int32(1, self.user_id)?;
        }
        if !self.device_token.is_empty() {
            os.write_string(2, &self.device_token)?;
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

impl ::protobuf::MessageStatic for RegisterDeviceTokenRequest {
    fn new() -> RegisterDeviceTokenRequest {
        RegisterDeviceTokenRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<RegisterDeviceTokenRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "user_id",
                    RegisterDeviceTokenRequest::get_user_id_for_reflect,
                    RegisterDeviceTokenRequest::mut_user_id_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "device_token",
                    RegisterDeviceTokenRequest::get_device_token_for_reflect,
                    RegisterDeviceTokenRequest::mut_device_token_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<RegisterDeviceTokenRequest>(
                    "RegisterDeviceTokenRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for RegisterDeviceTokenRequest {
    fn clear(&mut self) {
        self.clear_user_id();
        self.clear_device_token();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for RegisterDeviceTokenRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RegisterDeviceTokenRequest {
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
pub struct SuccessResponse {
    // message fields
    pub successful: bool,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for SuccessResponse {}

impl SuccessResponse {
    pub fn new() -> SuccessResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static SuccessResponse {
        static mut instance: ::protobuf::lazy::Lazy<SuccessResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const SuccessResponse,
        };
        unsafe {
            instance.get(SuccessResponse::new)
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

impl ::protobuf::Message for SuccessResponse {
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

impl ::protobuf::MessageStatic for SuccessResponse {
    fn new() -> SuccessResponse {
        SuccessResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<SuccessResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "successful",
                    SuccessResponse::get_successful_for_reflect,
                    SuccessResponse::mut_successful_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<SuccessResponse>(
                    "SuccessResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for SuccessResponse {
    fn clear(&mut self) {
        self.clear_successful();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for SuccessResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for SuccessResponse {
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
    pub transactions: ::protobuf::RepeatedField<super::models::Transaction>,
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

    // repeated .pesto.models.Transaction transactions = 1;

    pub fn clear_transactions(&mut self) {
        self.transactions.clear();
    }

    // Param is passed by value, moved
    pub fn set_transactions(&mut self, v: ::protobuf::RepeatedField<super::models::Transaction>) {
        self.transactions = v;
    }

    // Mutable pointer to the field.
    pub fn mut_transactions(&mut self) -> &mut ::protobuf::RepeatedField<super::models::Transaction> {
        &mut self.transactions
    }

    // Take field
    pub fn take_transactions(&mut self) -> ::protobuf::RepeatedField<super::models::Transaction> {
        ::std::mem::replace(&mut self.transactions, ::protobuf::RepeatedField::new())
    }

    pub fn get_transactions(&self) -> &[super::models::Transaction] {
        &self.transactions
    }

    fn get_transactions_for_reflect(&self) -> &::protobuf::RepeatedField<super::models::Transaction> {
        &self.transactions
    }

    fn mut_transactions_for_reflect(&mut self) -> &mut ::protobuf::RepeatedField<super::models::Transaction> {
        &mut self.transactions
    }
}

impl ::protobuf::Message for GetTransactionsResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.transactions {
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
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.transactions)?;
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
        for value in &self.transactions {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        for v in &self.transactions {
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
                    "transactions",
                    GetTransactionsResponse::get_transactions_for_reflect,
                    GetTransactionsResponse::mut_transactions_for_reflect,
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
        self.clear_transactions();
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

#[derive(PartialEq,Clone,Default)]
pub struct CheckPasscodeRequest {
    // message fields
    pub passcode: ::std::string::String,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for CheckPasscodeRequest {}

impl CheckPasscodeRequest {
    pub fn new() -> CheckPasscodeRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static CheckPasscodeRequest {
        static mut instance: ::protobuf::lazy::Lazy<CheckPasscodeRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const CheckPasscodeRequest,
        };
        unsafe {
            instance.get(CheckPasscodeRequest::new)
        }
    }

    // string passcode = 1;

    pub fn clear_passcode(&mut self) {
        self.passcode.clear();
    }

    // Param is passed by value, moved
    pub fn set_passcode(&mut self, v: ::std::string::String) {
        self.passcode = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_passcode(&mut self) -> &mut ::std::string::String {
        &mut self.passcode
    }

    // Take field
    pub fn take_passcode(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.passcode, ::std::string::String::new())
    }

    pub fn get_passcode(&self) -> &str {
        &self.passcode
    }

    fn get_passcode_for_reflect(&self) -> &::std::string::String {
        &self.passcode
    }

    fn mut_passcode_for_reflect(&mut self) -> &mut ::std::string::String {
        &mut self.passcode
    }
}

impl ::protobuf::Message for CheckPasscodeRequest {
    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.passcode)?;
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
        if !self.passcode.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.passcode);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if !self.passcode.is_empty() {
            os.write_string(1, &self.passcode)?;
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

impl ::protobuf::MessageStatic for CheckPasscodeRequest {
    fn new() -> CheckPasscodeRequest {
        CheckPasscodeRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<CheckPasscodeRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "passcode",
                    CheckPasscodeRequest::get_passcode_for_reflect,
                    CheckPasscodeRequest::mut_passcode_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<CheckPasscodeRequest>(
                    "CheckPasscodeRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for CheckPasscodeRequest {
    fn clear(&mut self) {
        self.clear_passcode();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for CheckPasscodeRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for CheckPasscodeRequest {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct CreateClaimRequest {
    // message fields
    pub amount: i32,
    pub owner_id: i32,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for CreateClaimRequest {}

impl CreateClaimRequest {
    pub fn new() -> CreateClaimRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static CreateClaimRequest {
        static mut instance: ::protobuf::lazy::Lazy<CreateClaimRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const CreateClaimRequest,
        };
        unsafe {
            instance.get(CreateClaimRequest::new)
        }
    }

    // int32 amount = 1;

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

    // int32 owner_id = 2;

    pub fn clear_owner_id(&mut self) {
        self.owner_id = 0;
    }

    // Param is passed by value, moved
    pub fn set_owner_id(&mut self, v: i32) {
        self.owner_id = v;
    }

    pub fn get_owner_id(&self) -> i32 {
        self.owner_id
    }

    fn get_owner_id_for_reflect(&self) -> &i32 {
        &self.owner_id
    }

    fn mut_owner_id_for_reflect(&mut self) -> &mut i32 {
        &mut self.owner_id
    }
}

impl ::protobuf::Message for CreateClaimRequest {
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
                    self.amount = tmp;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.owner_id = tmp;
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
        if self.amount != 0 {
            my_size += ::protobuf::rt::value_size(1, self.amount, ::protobuf::wire_format::WireTypeVarint);
        }
        if self.owner_id != 0 {
            my_size += ::protobuf::rt::value_size(2, self.owner_id, ::protobuf::wire_format::WireTypeVarint);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.amount != 0 {
            os.write_int32(1, self.amount)?;
        }
        if self.owner_id != 0 {
            os.write_int32(2, self.owner_id)?;
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

impl ::protobuf::MessageStatic for CreateClaimRequest {
    fn new() -> CreateClaimRequest {
        CreateClaimRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<CreateClaimRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "amount",
                    CreateClaimRequest::get_amount_for_reflect,
                    CreateClaimRequest::mut_amount_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "owner_id",
                    CreateClaimRequest::get_owner_id_for_reflect,
                    CreateClaimRequest::mut_owner_id_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<CreateClaimRequest>(
                    "CreateClaimRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for CreateClaimRequest {
    fn clear(&mut self) {
        self.clear_amount();
        self.clear_owner_id();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for CreateClaimRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for CreateClaimRequest {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct CreateClaimResponse {
    // message fields
    pub successful: bool,
    pub claim: ::protobuf::SingularPtrField<super::models::Claim>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for CreateClaimResponse {}

impl CreateClaimResponse {
    pub fn new() -> CreateClaimResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static CreateClaimResponse {
        static mut instance: ::protobuf::lazy::Lazy<CreateClaimResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const CreateClaimResponse,
        };
        unsafe {
            instance.get(CreateClaimResponse::new)
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

    // .pesto.models.Claim claim = 2;

    pub fn clear_claim(&mut self) {
        self.claim.clear();
    }

    pub fn has_claim(&self) -> bool {
        self.claim.is_some()
    }

    // Param is passed by value, moved
    pub fn set_claim(&mut self, v: super::models::Claim) {
        self.claim = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_claim(&mut self) -> &mut super::models::Claim {
        if self.claim.is_none() {
            self.claim.set_default();
        }
        self.claim.as_mut().unwrap()
    }

    // Take field
    pub fn take_claim(&mut self) -> super::models::Claim {
        self.claim.take().unwrap_or_else(|| super::models::Claim::new())
    }

    pub fn get_claim(&self) -> &super::models::Claim {
        self.claim.as_ref().unwrap_or_else(|| super::models::Claim::default_instance())
    }

    fn get_claim_for_reflect(&self) -> &::protobuf::SingularPtrField<super::models::Claim> {
        &self.claim
    }

    fn mut_claim_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<super::models::Claim> {
        &mut self.claim
    }
}

impl ::protobuf::Message for CreateClaimResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.claim {
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
                    let tmp = is.read_bool()?;
                    self.successful = tmp;
                },
                2 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.claim)?;
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
        if let Some(ref v) = self.claim.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.successful != false {
            os.write_bool(1, self.successful)?;
        }
        if let Some(ref v) = self.claim.as_ref() {
            os.write_tag(2, ::protobuf::wire_format::WireTypeLengthDelimited)?;
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

impl ::protobuf::MessageStatic for CreateClaimResponse {
    fn new() -> CreateClaimResponse {
        CreateClaimResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<CreateClaimResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "successful",
                    CreateClaimResponse::get_successful_for_reflect,
                    CreateClaimResponse::mut_successful_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::Claim>>(
                    "claim",
                    CreateClaimResponse::get_claim_for_reflect,
                    CreateClaimResponse::mut_claim_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<CreateClaimResponse>(
                    "CreateClaimResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for CreateClaimResponse {
    fn clear(&mut self) {
        self.clear_successful();
        self.clear_claim();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for CreateClaimResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for CreateClaimResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct GetClaimResponse {
    // message fields
    pub claim: ::protobuf::SingularPtrField<super::models::Claim>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for GetClaimResponse {}

impl GetClaimResponse {
    pub fn new() -> GetClaimResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static GetClaimResponse {
        static mut instance: ::protobuf::lazy::Lazy<GetClaimResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const GetClaimResponse,
        };
        unsafe {
            instance.get(GetClaimResponse::new)
        }
    }

    // .pesto.models.Claim claim = 2;

    pub fn clear_claim(&mut self) {
        self.claim.clear();
    }

    pub fn has_claim(&self) -> bool {
        self.claim.is_some()
    }

    // Param is passed by value, moved
    pub fn set_claim(&mut self, v: super::models::Claim) {
        self.claim = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_claim(&mut self) -> &mut super::models::Claim {
        if self.claim.is_none() {
            self.claim.set_default();
        }
        self.claim.as_mut().unwrap()
    }

    // Take field
    pub fn take_claim(&mut self) -> super::models::Claim {
        self.claim.take().unwrap_or_else(|| super::models::Claim::new())
    }

    pub fn get_claim(&self) -> &super::models::Claim {
        self.claim.as_ref().unwrap_or_else(|| super::models::Claim::default_instance())
    }

    fn get_claim_for_reflect(&self) -> &::protobuf::SingularPtrField<super::models::Claim> {
        &self.claim
    }

    fn mut_claim_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<super::models::Claim> {
        &mut self.claim
    }
}

impl ::protobuf::Message for GetClaimResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.claim {
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
                2 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.claim)?;
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
        if let Some(ref v) = self.claim.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if let Some(ref v) = self.claim.as_ref() {
            os.write_tag(2, ::protobuf::wire_format::WireTypeLengthDelimited)?;
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

impl ::protobuf::MessageStatic for GetClaimResponse {
    fn new() -> GetClaimResponse {
        GetClaimResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<GetClaimResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::Claim>>(
                    "claim",
                    GetClaimResponse::get_claim_for_reflect,
                    GetClaimResponse::mut_claim_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<GetClaimResponse>(
                    "GetClaimResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for GetClaimResponse {
    fn clear(&mut self) {
        self.clear_claim();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for GetClaimResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for GetClaimResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct AcceptClaimRequest {
    // message fields
    pub claim_id: i32,
    pub receiver_id: i32,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for AcceptClaimRequest {}

impl AcceptClaimRequest {
    pub fn new() -> AcceptClaimRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static AcceptClaimRequest {
        static mut instance: ::protobuf::lazy::Lazy<AcceptClaimRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const AcceptClaimRequest,
        };
        unsafe {
            instance.get(AcceptClaimRequest::new)
        }
    }

    // int32 claim_id = 1;

    pub fn clear_claim_id(&mut self) {
        self.claim_id = 0;
    }

    // Param is passed by value, moved
    pub fn set_claim_id(&mut self, v: i32) {
        self.claim_id = v;
    }

    pub fn get_claim_id(&self) -> i32 {
        self.claim_id
    }

    fn get_claim_id_for_reflect(&self) -> &i32 {
        &self.claim_id
    }

    fn mut_claim_id_for_reflect(&mut self) -> &mut i32 {
        &mut self.claim_id
    }

    // int32 receiver_id = 2;

    pub fn clear_receiver_id(&mut self) {
        self.receiver_id = 0;
    }

    // Param is passed by value, moved
    pub fn set_receiver_id(&mut self, v: i32) {
        self.receiver_id = v;
    }

    pub fn get_receiver_id(&self) -> i32 {
        self.receiver_id
    }

    fn get_receiver_id_for_reflect(&self) -> &i32 {
        &self.receiver_id
    }

    fn mut_receiver_id_for_reflect(&mut self) -> &mut i32 {
        &mut self.receiver_id
    }
}

impl ::protobuf::Message for AcceptClaimRequest {
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
                    self.claim_id = tmp;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_int32()?;
                    self.receiver_id = tmp;
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
        if self.claim_id != 0 {
            my_size += ::protobuf::rt::value_size(1, self.claim_id, ::protobuf::wire_format::WireTypeVarint);
        }
        if self.receiver_id != 0 {
            my_size += ::protobuf::rt::value_size(2, self.receiver_id, ::protobuf::wire_format::WireTypeVarint);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.claim_id != 0 {
            os.write_int32(1, self.claim_id)?;
        }
        if self.receiver_id != 0 {
            os.write_int32(2, self.receiver_id)?;
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

impl ::protobuf::MessageStatic for AcceptClaimRequest {
    fn new() -> AcceptClaimRequest {
        AcceptClaimRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<AcceptClaimRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "claim_id",
                    AcceptClaimRequest::get_claim_id_for_reflect,
                    AcceptClaimRequest::mut_claim_id_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "receiver_id",
                    AcceptClaimRequest::get_receiver_id_for_reflect,
                    AcceptClaimRequest::mut_receiver_id_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<AcceptClaimRequest>(
                    "AcceptClaimRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for AcceptClaimRequest {
    fn clear(&mut self) {
        self.clear_claim_id();
        self.clear_receiver_id();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for AcceptClaimRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for AcceptClaimRequest {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct AcceptClaimResponse {
    // message fields
    pub successful: bool,
    pub claim: ::protobuf::SingularPtrField<super::models::Claim>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for AcceptClaimResponse {}

impl AcceptClaimResponse {
    pub fn new() -> AcceptClaimResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static AcceptClaimResponse {
        static mut instance: ::protobuf::lazy::Lazy<AcceptClaimResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const AcceptClaimResponse,
        };
        unsafe {
            instance.get(AcceptClaimResponse::new)
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

    // .pesto.models.Claim claim = 2;

    pub fn clear_claim(&mut self) {
        self.claim.clear();
    }

    pub fn has_claim(&self) -> bool {
        self.claim.is_some()
    }

    // Param is passed by value, moved
    pub fn set_claim(&mut self, v: super::models::Claim) {
        self.claim = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_claim(&mut self) -> &mut super::models::Claim {
        if self.claim.is_none() {
            self.claim.set_default();
        }
        self.claim.as_mut().unwrap()
    }

    // Take field
    pub fn take_claim(&mut self) -> super::models::Claim {
        self.claim.take().unwrap_or_else(|| super::models::Claim::new())
    }

    pub fn get_claim(&self) -> &super::models::Claim {
        self.claim.as_ref().unwrap_or_else(|| super::models::Claim::default_instance())
    }

    fn get_claim_for_reflect(&self) -> &::protobuf::SingularPtrField<super::models::Claim> {
        &self.claim
    }

    fn mut_claim_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<super::models::Claim> {
        &mut self.claim
    }
}

impl ::protobuf::Message for AcceptClaimResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.claim {
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
                    let tmp = is.read_bool()?;
                    self.successful = tmp;
                },
                2 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.claim)?;
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
        if let Some(ref v) = self.claim.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.successful != false {
            os.write_bool(1, self.successful)?;
        }
        if let Some(ref v) = self.claim.as_ref() {
            os.write_tag(2, ::protobuf::wire_format::WireTypeLengthDelimited)?;
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

impl ::protobuf::MessageStatic for AcceptClaimResponse {
    fn new() -> AcceptClaimResponse {
        AcceptClaimResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<AcceptClaimResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "successful",
                    AcceptClaimResponse::get_successful_for_reflect,
                    AcceptClaimResponse::mut_successful_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::Claim>>(
                    "claim",
                    AcceptClaimResponse::get_claim_for_reflect,
                    AcceptClaimResponse::mut_claim_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<AcceptClaimResponse>(
                    "AcceptClaimResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for AcceptClaimResponse {
    fn clear(&mut self) {
        self.clear_successful();
        self.clear_claim();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for AcceptClaimResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for AcceptClaimResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct RevokeClaimRequest {
    // message fields
    pub claim_id: i32,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for RevokeClaimRequest {}

impl RevokeClaimRequest {
    pub fn new() -> RevokeClaimRequest {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static RevokeClaimRequest {
        static mut instance: ::protobuf::lazy::Lazy<RevokeClaimRequest> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const RevokeClaimRequest,
        };
        unsafe {
            instance.get(RevokeClaimRequest::new)
        }
    }

    // int32 claim_id = 1;

    pub fn clear_claim_id(&mut self) {
        self.claim_id = 0;
    }

    // Param is passed by value, moved
    pub fn set_claim_id(&mut self, v: i32) {
        self.claim_id = v;
    }

    pub fn get_claim_id(&self) -> i32 {
        self.claim_id
    }

    fn get_claim_id_for_reflect(&self) -> &i32 {
        &self.claim_id
    }

    fn mut_claim_id_for_reflect(&mut self) -> &mut i32 {
        &mut self.claim_id
    }
}

impl ::protobuf::Message for RevokeClaimRequest {
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
                    self.claim_id = tmp;
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
        if self.claim_id != 0 {
            my_size += ::protobuf::rt::value_size(1, self.claim_id, ::protobuf::wire_format::WireTypeVarint);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.claim_id != 0 {
            os.write_int32(1, self.claim_id)?;
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

impl ::protobuf::MessageStatic for RevokeClaimRequest {
    fn new() -> RevokeClaimRequest {
        RevokeClaimRequest::new()
    }

    fn descriptor_static(_: ::std::option::Option<RevokeClaimRequest>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeInt32>(
                    "claim_id",
                    RevokeClaimRequest::get_claim_id_for_reflect,
                    RevokeClaimRequest::mut_claim_id_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<RevokeClaimRequest>(
                    "RevokeClaimRequest",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for RevokeClaimRequest {
    fn clear(&mut self) {
        self.clear_claim_id();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for RevokeClaimRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RevokeClaimRequest {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct RevokeClaimResponse {
    // message fields
    pub successful: bool,
    pub claim: ::protobuf::SingularPtrField<super::models::Claim>,
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for RevokeClaimResponse {}

impl RevokeClaimResponse {
    pub fn new() -> RevokeClaimResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static RevokeClaimResponse {
        static mut instance: ::protobuf::lazy::Lazy<RevokeClaimResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const RevokeClaimResponse,
        };
        unsafe {
            instance.get(RevokeClaimResponse::new)
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

    // .pesto.models.Claim claim = 2;

    pub fn clear_claim(&mut self) {
        self.claim.clear();
    }

    pub fn has_claim(&self) -> bool {
        self.claim.is_some()
    }

    // Param is passed by value, moved
    pub fn set_claim(&mut self, v: super::models::Claim) {
        self.claim = ::protobuf::SingularPtrField::some(v);
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_claim(&mut self) -> &mut super::models::Claim {
        if self.claim.is_none() {
            self.claim.set_default();
        }
        self.claim.as_mut().unwrap()
    }

    // Take field
    pub fn take_claim(&mut self) -> super::models::Claim {
        self.claim.take().unwrap_or_else(|| super::models::Claim::new())
    }

    pub fn get_claim(&self) -> &super::models::Claim {
        self.claim.as_ref().unwrap_or_else(|| super::models::Claim::default_instance())
    }

    fn get_claim_for_reflect(&self) -> &::protobuf::SingularPtrField<super::models::Claim> {
        &self.claim
    }

    fn mut_claim_for_reflect(&mut self) -> &mut ::protobuf::SingularPtrField<super::models::Claim> {
        &mut self.claim
    }
}

impl ::protobuf::Message for RevokeClaimResponse {
    fn is_initialized(&self) -> bool {
        for v in &self.claim {
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
                    let tmp = is.read_bool()?;
                    self.successful = tmp;
                },
                2 => {
                    ::protobuf::rt::read_singular_message_into(wire_type, is, &mut self.claim)?;
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
        if let Some(ref v) = self.claim.as_ref() {
            let len = v.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if self.successful != false {
            os.write_bool(1, self.successful)?;
        }
        if let Some(ref v) = self.claim.as_ref() {
            os.write_tag(2, ::protobuf::wire_format::WireTypeLengthDelimited)?;
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

impl ::protobuf::MessageStatic for RevokeClaimResponse {
    fn new() -> RevokeClaimResponse {
        RevokeClaimResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<RevokeClaimResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "successful",
                    RevokeClaimResponse::get_successful_for_reflect,
                    RevokeClaimResponse::mut_successful_for_reflect,
                ));
                fields.push(::protobuf::reflect::accessor::make_singular_ptr_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::models::Claim>>(
                    "claim",
                    RevokeClaimResponse::get_claim_for_reflect,
                    RevokeClaimResponse::mut_claim_for_reflect,
                ));
                ::protobuf::reflect::MessageDescriptor::new::<RevokeClaimResponse>(
                    "RevokeClaimResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for RevokeClaimResponse {
    fn clear(&mut self) {
        self.clear_successful();
        self.clear_claim();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for RevokeClaimResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RevokeClaimResponse {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct NoResponse {
    // special fields
    unknown_fields: ::protobuf::UnknownFields,
    cached_size: ::protobuf::CachedSize,
}

// see codegen.rs for the explanation why impl Sync explicitly
unsafe impl ::std::marker::Sync for NoResponse {}

impl NoResponse {
    pub fn new() -> NoResponse {
        ::std::default::Default::default()
    }

    pub fn default_instance() -> &'static NoResponse {
        static mut instance: ::protobuf::lazy::Lazy<NoResponse> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const NoResponse,
        };
        unsafe {
            instance.get(NoResponse::new)
        }
    }
}

impl ::protobuf::Message for NoResponse {
    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
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
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
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

impl ::protobuf::MessageStatic for NoResponse {
    fn new() -> NoResponse {
        NoResponse::new()
    }

    fn descriptor_static(_: ::std::option::Option<NoResponse>) -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let fields = ::std::vec::Vec::new();
                ::protobuf::reflect::MessageDescriptor::new::<NoResponse>(
                    "NoResponse",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }
}

impl ::protobuf::Clear for NoResponse {
    fn clear(&mut self) {
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for NoResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for NoResponse {
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
    \x1e\n\nsuccessful\x18\x02\x20\x01(\x08R\nsuccessful\"X\n\x1aRegisterDev\
    iceTokenRequest\x12\x17\n\x07user_id\x18\x01\x20\x01(\x05R\x06userId\x12\
    !\n\x0cdevice_token\x18\x02\x20\x01(\tR\x0bdeviceToken\"F\n\x0cLoginRequ\
    est\x12\x1a\n\x08username\x18\x01\x20\x01(\tR\x08username\x12\x1a\n\x08p\
    assword\x18\x02\x20\x01(\tR\x08password\"W\n\rLoginResponse\x12&\n\x04us\
    er\x18\x01\x20\x01(\x0b2\x12.pesto.models.UserR\x04user\x12\x1e\n\nsucce\
    ssful\x18\x02\x20\x01(\x08R\nsuccessful\"8\n\x0cTopupRequest\x12\x10\n\
    \x03uid\x18\x01\x20\x01(\x05R\x03uid\x12\x16\n\x06amount\x18\x02\x20\x01\
    (\x05R\x06amount\"W\n\rTopupResponse\x12&\n\x04user\x18\x01\x20\x01(\x0b\
    2\x12.pesto.models.UserR\x04user\x12\x1e\n\nsuccessful\x18\x02\x20\x01(\
    \x08R\nsuccessful\"b\n\x12TransactionRequest\x12\x19\n\x08payer_id\x18\
    \x01\x20\x01(\x05R\x07payerId\x12\x19\n\x08payee_id\x18\x02\x20\x01(\x05\
    R\x07payeeId\x12\x16\n\x06amount\x18\x03\x20\x01(\x05R\x06amount\"\x84\
    \x01\n\x13TransactionResponse\x12&\n\x04user\x18\x01\x20\x01(\x0b2\x12.p\
    esto.models.UserR\x04user\x12%\n\x0etransaction_id\x18\x02\x20\x01(\x05R\
    \rtransactionId\x12\x1e\n\nsuccessful\x18\x03\x20\x01(\x08R\nsuccessful\
    \"W\n\x11AddContactRequest\x12\x17\n\x07user_id\x18\x01\x20\x01(\x05R\
    \x06userId\x12)\n\x10contact_username\x18\x02\x20\x01(\tR\x0fcontactUser\
    name\"1\n\x0fSuccessResponse\x12\x1e\n\nsuccessful\x18\x01\x20\x01(\x08R\
    \nsuccessful\"H\n\x13GetContactsResponse\x121\n\x08contacts\x18\x01\x20\
    \x03(\x0b2\x15.pesto.models.ContactR\x08contacts\"X\n\x17GetTransactions\
    Response\x12=\n\x0ctransactions\x18\x01\x20\x03(\x0b2\x19.pesto.models.T\
    ransactionR\x0ctransactions\"2\n\x14CheckPasscodeRequest\x12\x1a\n\x08pa\
    sscode\x18\x01\x20\x01(\tR\x08passcode\"G\n\x12CreateClaimRequest\x12\
    \x16\n\x06amount\x18\x01\x20\x01(\x05R\x06amount\x12\x19\n\x08owner_id\
    \x18\x02\x20\x01(\x05R\x07ownerId\"`\n\x13CreateClaimResponse\x12\x1e\n\
    \nsuccessful\x18\x01\x20\x01(\x08R\nsuccessful\x12)\n\x05claim\x18\x02\
    \x20\x01(\x0b2\x13.pesto.models.ClaimR\x05claim\"=\n\x10GetClaimResponse\
    \x12)\n\x05claim\x18\x02\x20\x01(\x0b2\x13.pesto.models.ClaimR\x05claim\
    \"P\n\x12AcceptClaimRequest\x12\x19\n\x08claim_id\x18\x01\x20\x01(\x05R\
    \x07claimId\x12\x1f\n\x0breceiver_id\x18\x02\x20\x01(\x05R\nreceiverId\"\
    `\n\x13AcceptClaimResponse\x12\x1e\n\nsuccessful\x18\x01\x20\x01(\x08R\n\
    successful\x12)\n\x05claim\x18\x02\x20\x01(\x0b2\x13.pesto.models.ClaimR\
    \x05claim\"/\n\x12RevokeClaimRequest\x12\x19\n\x08claim_id\x18\x01\x20\
    \x01(\x05R\x07claimId\"`\n\x13RevokeClaimResponse\x12\x1e\n\nsuccessful\
    \x18\x01\x20\x01(\x08R\nsuccessful\x12)\n\x05claim\x18\x02\x20\x01(\x0b2\
    \x13.pesto.models.ClaimR\x05claim\"\x0c\n\nNoResponseJ\xf5\x19\n\x06\x12\
    \x04\0\0l\x15\n\x08\n\x01\x0c\x12\x03\0\0\x12\n\x08\n\x01\x02\x12\x03\
    \x02\x08\x1b\n\t\n\x02\x03\0\x12\x03\x04\x07\x15\n\n\n\x02\x04\0\x12\x04\
    \x06\0\n\x01\n\n\n\x03\x04\0\x01\x12\x03\x06\x08\x17\n\x0b\n\x04\x04\0\
    \x02\0\x12\x03\x07\x02\x16\n\r\n\x05\x04\0\x02\0\x04\x12\x04\x07\x02\x06\
    \x19\n\x0c\n\x05\x04\0\x02\0\x05\x12\x03\x07\x02\x08\n\x0c\n\x05\x04\0\
    \x02\0\x01\x12\x03\x07\t\x11\n\x0c\n\x05\x04\0\x02\0\x03\x12\x03\x07\x14\
    \x15\n\x0b\n\x04\x04\0\x02\x01\x12\x03\x08\x02\x16\n\r\n\x05\x04\0\x02\
    \x01\x04\x12\x04\x08\x02\x07\x16\n\x0c\n\x05\x04\0\x02\x01\x05\x12\x03\
    \x08\x02\x08\n\x0c\n\x05\x04\0\x02\x01\x01\x12\x03\x08\t\x11\n\x0c\n\x05\
    \x04\0\x02\x01\x03\x12\x03\x08\x14\x15\n\x0b\n\x04\x04\0\x02\x02\x12\x03\
    \t\x02\x16\n\r\n\x05\x04\0\x02\x02\x04\x12\x04\t\x02\x08\x16\n\x0c\n\x05\
    \x04\0\x02\x02\x05\x12\x03\t\x02\x08\n\x0c\n\x05\x04\0\x02\x02\x01\x12\
    \x03\t\t\x11\n\x0c\n\x05\x04\0\x02\x02\x03\x12\x03\t\x14\x15\n\n\n\x02\
    \x04\x01\x12\x04\x0c\0\x0f\x01\n\n\n\x03\x04\x01\x01\x12\x03\x0c\x08\x18\
    \n\x0b\n\x04\x04\x01\x02\0\x12\x03\r\x02\x17\n\r\n\x05\x04\x01\x02\0\x04\
    \x12\x04\r\x02\x0c\x1a\n\x0c\n\x05\x04\x01\x02\0\x06\x12\x03\r\x02\r\n\
    \x0c\n\x05\x04\x01\x02\0\x01\x12\x03\r\x0e\x12\n\x0c\n\x05\x04\x01\x02\0\
    \x03\x12\x03\r\x15\x16\n\x0b\n\x04\x04\x01\x02\x01\x12\x03\x0e\x02\x16\n\
    \r\n\x05\x04\x01\x02\x01\x04\x12\x04\x0e\x02\r\x17\n\x0c\n\x05\x04\x01\
    \x02\x01\x05\x12\x03\x0e\x02\x06\n\x0c\n\x05\x04\x01\x02\x01\x01\x12\x03\
    \x0e\x07\x11\n\x0c\n\x05\x04\x01\x02\x01\x03\x12\x03\x0e\x14\x15\n\n\n\
    \x02\x04\x02\x12\x04\x11\0\x14\x01\n\n\n\x03\x04\x02\x01\x12\x03\x11\x08\
    \"\n\x0b\n\x04\x04\x02\x02\0\x12\x03\x12\x02\x14\n\r\n\x05\x04\x02\x02\0\
    \x04\x12\x04\x12\x02\x11$\n\x0c\n\x05\x04\x02\x02\0\x05\x12\x03\x12\x02\
    \x07\n\x0c\n\x05\x04\x02\x02\0\x01\x12\x03\x12\x08\x0f\n\x0c\n\x05\x04\
    \x02\x02\0\x03\x12\x03\x12\x12\x13\n\x0b\n\x04\x04\x02\x02\x01\x12\x03\
    \x13\x02\x1a\n\r\n\x05\x04\x02\x02\x01\x04\x12\x04\x13\x02\x12\x14\n\x0c\
    \n\x05\x04\x02\x02\x01\x05\x12\x03\x13\x02\x08\n\x0c\n\x05\x04\x02\x02\
    \x01\x01\x12\x03\x13\t\x15\n\x0c\n\x05\x04\x02\x02\x01\x03\x12\x03\x13\
    \x18\x19\n\n\n\x02\x04\x03\x12\x04\x16\0\x19\x01\n\n\n\x03\x04\x03\x01\
    \x12\x03\x16\x08\x14\n\x0b\n\x04\x04\x03\x02\0\x12\x03\x17\x02\x16\n\r\n\
    \x05\x04\x03\x02\0\x04\x12\x04\x17\x02\x16\x16\n\x0c\n\x05\x04\x03\x02\0\
    \x05\x12\x03\x17\x02\x08\n\x0c\n\x05\x04\x03\x02\0\x01\x12\x03\x17\t\x11\
    \n\x0c\n\x05\x04\x03\x02\0\x03\x12\x03\x17\x14\x15\n\x0b\n\x04\x04\x03\
    \x02\x01\x12\x03\x18\x02\x16\n\r\n\x05\x04\x03\x02\x01\x04\x12\x04\x18\
    \x02\x17\x16\n\x0c\n\x05\x04\x03\x02\x01\x05\x12\x03\x18\x02\x08\n\x0c\n\
    \x05\x04\x03\x02\x01\x01\x12\x03\x18\t\x11\n\x0c\n\x05\x04\x03\x02\x01\
    \x03\x12\x03\x18\x14\x15\n\n\n\x02\x04\x04\x12\x04\x1b\0\x1e\x01\n\n\n\
    \x03\x04\x04\x01\x12\x03\x1b\x08\x15\n\x0b\n\x04\x04\x04\x02\0\x12\x03\
    \x1c\x02\x17\n\r\n\x05\x04\x04\x02\0\x04\x12\x04\x1c\x02\x1b\x17\n\x0c\n\
    \x05\x04\x04\x02\0\x06\x12\x03\x1c\x02\r\n\x0c\n\x05\x04\x04\x02\0\x01\
    \x12\x03\x1c\x0e\x12\n\x0c\n\x05\x04\x04\x02\0\x03\x12\x03\x1c\x15\x16\n\
    \x0b\n\x04\x04\x04\x02\x01\x12\x03\x1d\x02\x16\n\r\n\x05\x04\x04\x02\x01\
    \x04\x12\x04\x1d\x02\x1c\x17\n\x0c\n\x05\x04\x04\x02\x01\x05\x12\x03\x1d\
    \x02\x06\n\x0c\n\x05\x04\x04\x02\x01\x01\x12\x03\x1d\x07\x11\n\x0c\n\x05\
    \x04\x04\x02\x01\x03\x12\x03\x1d\x14\x15\n\n\n\x02\x04\x05\x12\x04\x20\0\
    #\x01\n\n\n\x03\x04\x05\x01\x12\x03\x20\x08\x14\n\"\n\x04\x04\x05\x02\0\
    \x12\x03!\x02\x10\"\x15\x20TODO:\x20Fix\x20this\x20name\n\n\r\n\x05\x04\
    \x05\x02\0\x04\x12\x04!\x02\x20\x16\n\x0c\n\x05\x04\x05\x02\0\x05\x12\
    \x03!\x02\x07\n\x0c\n\x05\x04\x05\x02\0\x01\x12\x03!\x08\x0b\n\x0c\n\x05\
    \x04\x05\x02\0\x03\x12\x03!\x0e\x0f\n\x0b\n\x04\x04\x05\x02\x01\x12\x03\
    \"\x02\x13\n\r\n\x05\x04\x05\x02\x01\x04\x12\x04\"\x02!\x10\n\x0c\n\x05\
    \x04\x05\x02\x01\x05\x12\x03\"\x02\x07\n\x0c\n\x05\x04\x05\x02\x01\x01\
    \x12\x03\"\x08\x0e\n\x0c\n\x05\x04\x05\x02\x01\x03\x12\x03\"\x11\x12\n\n\
    \n\x02\x04\x06\x12\x04%\0(\x01\n\n\n\x03\x04\x06\x01\x12\x03%\x08\x15\n\
    \x0b\n\x04\x04\x06\x02\0\x12\x03&\x02\x17\n\r\n\x05\x04\x06\x02\0\x04\
    \x12\x04&\x02%\x17\n\x0c\n\x05\x04\x06\x02\0\x06\x12\x03&\x02\r\n\x0c\n\
    \x05\x04\x06\x02\0\x01\x12\x03&\x0e\x12\n\x0c\n\x05\x04\x06\x02\0\x03\
    \x12\x03&\x15\x16\n\x0b\n\x04\x04\x06\x02\x01\x12\x03'\x02\x16\n\r\n\x05\
    \x04\x06\x02\x01\x04\x12\x04'\x02&\x17\n\x0c\n\x05\x04\x06\x02\x01\x05\
    \x12\x03'\x02\x06\n\x0c\n\x05\x04\x06\x02\x01\x01\x12\x03'\x07\x11\n\x0c\
    \n\x05\x04\x06\x02\x01\x03\x12\x03'\x14\x15\n\n\n\x02\x04\x07\x12\x04*\0\
    .\x01\n\n\n\x03\x04\x07\x01\x12\x03*\x08\x1a\n\x0b\n\x04\x04\x07\x02\0\
    \x12\x03+\x02\x15\n\r\n\x05\x04\x07\x02\0\x04\x12\x04+\x02*\x1c\n\x0c\n\
    \x05\x04\x07\x02\0\x05\x12\x03+\x02\x07\n\x0c\n\x05\x04\x07\x02\0\x01\
    \x12\x03+\x08\x10\n\x0c\n\x05\x04\x07\x02\0\x03\x12\x03+\x13\x14\n\x0b\n\
    \x04\x04\x07\x02\x01\x12\x03,\x02\x15\n\r\n\x05\x04\x07\x02\x01\x04\x12\
    \x04,\x02+\x15\n\x0c\n\x05\x04\x07\x02\x01\x05\x12\x03,\x02\x07\n\x0c\n\
    \x05\x04\x07\x02\x01\x01\x12\x03,\x08\x10\n\x0c\n\x05\x04\x07\x02\x01\
    \x03\x12\x03,\x13\x14\n\x0b\n\x04\x04\x07\x02\x02\x12\x03-\x02\x13\n\r\n\
    \x05\x04\x07\x02\x02\x04\x12\x04-\x02,\x15\n\x0c\n\x05\x04\x07\x02\x02\
    \x05\x12\x03-\x02\x07\n\x0c\n\x05\x04\x07\x02\x02\x01\x12\x03-\x08\x0e\n\
    \x0c\n\x05\x04\x07\x02\x02\x03\x12\x03-\x11\x12\n\n\n\x02\x04\x08\x12\
    \x040\04\x01\n\n\n\x03\x04\x08\x01\x12\x030\x08\x1b\n\x0b\n\x04\x04\x08\
    \x02\0\x12\x031\x02\x17\n\r\n\x05\x04\x08\x02\0\x04\x12\x041\x020\x1d\n\
    \x0c\n\x05\x04\x08\x02\0\x06\x12\x031\x02\r\n\x0c\n\x05\x04\x08\x02\0\
    \x01\x12\x031\x0e\x12\n\x0c\n\x05\x04\x08\x02\0\x03\x12\x031\x15\x16\n\
    \x0b\n\x04\x04\x08\x02\x01\x12\x032\x02\x1b\n\r\n\x05\x04\x08\x02\x01\
    \x04\x12\x042\x021\x17\n\x0c\n\x05\x04\x08\x02\x01\x05\x12\x032\x02\x07\
    \n\x0c\n\x05\x04\x08\x02\x01\x01\x12\x032\x08\x16\n\x0c\n\x05\x04\x08\
    \x02\x01\x03\x12\x032\x19\x1a\n\x0b\n\x04\x04\x08\x02\x02\x12\x033\x02\
    \x16\n\r\n\x05\x04\x08\x02\x02\x04\x12\x043\x022\x1b\n\x0c\n\x05\x04\x08\
    \x02\x02\x05\x12\x033\x02\x06\n\x0c\n\x05\x04\x08\x02\x02\x01\x12\x033\
    \x07\x11\n\x0c\n\x05\x04\x08\x02\x02\x03\x12\x033\x14\x15\n\n\n\x02\x04\
    \t\x12\x046\09\x01\n\n\n\x03\x04\t\x01\x12\x036\x08\x19\n\x0b\n\x04\x04\
    \t\x02\0\x12\x037\x02\x14\n\r\n\x05\x04\t\x02\0\x04\x12\x047\x026\x1b\n\
    \x0c\n\x05\x04\t\x02\0\x05\x12\x037\x02\x07\n\x0c\n\x05\x04\t\x02\0\x01\
    \x12\x037\x08\x0f\n\x0c\n\x05\x04\t\x02\0\x03\x12\x037\x12\x13\n\x0b\n\
    \x04\x04\t\x02\x01\x12\x038\x02\x1e\n\r\n\x05\x04\t\x02\x01\x04\x12\x048\
    \x027\x14\n\x0c\n\x05\x04\t\x02\x01\x05\x12\x038\x02\x08\n\x0c\n\x05\x04\
    \t\x02\x01\x01\x12\x038\t\x19\n\x0c\n\x05\x04\t\x02\x01\x03\x12\x038\x1c\
    \x1d\n\n\n\x02\x04\n\x12\x04;\0=\x01\n\n\n\x03\x04\n\x01\x12\x03;\x08\
    \x17\n\x0b\n\x04\x04\n\x02\0\x12\x03<\x02\x16\n\r\n\x05\x04\n\x02\0\x04\
    \x12\x04<\x02;\x19\n\x0c\n\x05\x04\n\x02\0\x05\x12\x03<\x02\x06\n\x0c\n\
    \x05\x04\n\x02\0\x01\x12\x03<\x07\x11\n\x0c\n\x05\x04\n\x02\0\x03\x12\
    \x03<\x14\x15\n\n\n\x02\x04\x0b\x12\x04?\0A\x01\n\n\n\x03\x04\x0b\x01\
    \x12\x03?\x08\x1b\n\x0b\n\x04\x04\x0b\x02\0\x12\x03@\x02'\n\x0c\n\x05\
    \x04\x0b\x02\0\x04\x12\x03@\x02\n\n\x0c\n\x05\x04\x0b\x02\0\x06\x12\x03@\
    \x0b\x19\n\x0c\n\x05\x04\x0b\x02\0\x01\x12\x03@\x1a\"\n\x0c\n\x05\x04\
    \x0b\x02\0\x03\x12\x03@%&\n\n\n\x02\x04\x0c\x12\x04C\0E\x01\n\n\n\x03\
    \x04\x0c\x01\x12\x03C\x08\x1f\n\x0b\n\x04\x04\x0c\x02\0\x12\x03D\x02/\n\
    \x0c\n\x05\x04\x0c\x02\0\x04\x12\x03D\x02\n\n\x0c\n\x05\x04\x0c\x02\0\
    \x06\x12\x03D\x0b\x1d\n\x0c\n\x05\x04\x0c\x02\0\x01\x12\x03D\x1e*\n\x0c\
    \n\x05\x04\x0c\x02\0\x03\x12\x03D-.\n\n\n\x02\x04\r\x12\x04G\0I\x01\n\n\
    \n\x03\x04\r\x01\x12\x03G\x08\x1c\n\x0b\n\x04\x04\r\x02\0\x12\x03H\x02\
    \x16\n\r\n\x05\x04\r\x02\0\x04\x12\x04H\x02G\x1e\n\x0c\n\x05\x04\r\x02\0\
    \x05\x12\x03H\x02\x08\n\x0c\n\x05\x04\r\x02\0\x01\x12\x03H\t\x11\n\x0c\n\
    \x05\x04\r\x02\0\x03\x12\x03H\x14\x15\n\n\n\x02\x04\x0e\x12\x04K\0N\x01\
    \n\n\n\x03\x04\x0e\x01\x12\x03K\x08\x1a\n\x0b\n\x04\x04\x0e\x02\0\x12\
    \x03L\x02\x13\n\r\n\x05\x04\x0e\x02\0\x04\x12\x04L\x02K\x1c\n\x0c\n\x05\
    \x04\x0e\x02\0\x05\x12\x03L\x02\x07\n\x0c\n\x05\x04\x0e\x02\0\x01\x12\
    \x03L\x08\x0e\n\x0c\n\x05\x04\x0e\x02\0\x03\x12\x03L\x11\x12\n\x0b\n\x04\
    \x04\x0e\x02\x01\x12\x03M\x02\x15\n\r\n\x05\x04\x0e\x02\x01\x04\x12\x04M\
    \x02L\x13\n\x0c\n\x05\x04\x0e\x02\x01\x05\x12\x03M\x02\x07\n\x0c\n\x05\
    \x04\x0e\x02\x01\x01\x12\x03M\x08\x10\n\x0c\n\x05\x04\x0e\x02\x01\x03\
    \x12\x03M\x13\x14\n\n\n\x02\x04\x0f\x12\x04P\0S\x01\n\n\n\x03\x04\x0f\
    \x01\x12\x03P\x08\x1b\n\x0b\n\x04\x04\x0f\x02\0\x12\x03Q\x02\x16\n\r\n\
    \x05\x04\x0f\x02\0\x04\x12\x04Q\x02P\x1d\n\x0c\n\x05\x04\x0f\x02\0\x05\
    \x12\x03Q\x02\x06\n\x0c\n\x05\x04\x0f\x02\0\x01\x12\x03Q\x07\x11\n\x0c\n\
    \x05\x04\x0f\x02\0\x03\x12\x03Q\x14\x15\n\x0b\n\x04\x04\x0f\x02\x01\x12\
    \x03R\x02\x19\n\r\n\x05\x04\x0f\x02\x01\x04\x12\x04R\x02Q\x16\n\x0c\n\
    \x05\x04\x0f\x02\x01\x06\x12\x03R\x02\x0e\n\x0c\n\x05\x04\x0f\x02\x01\
    \x01\x12\x03R\x0f\x14\n\x0c\n\x05\x04\x0f\x02\x01\x03\x12\x03R\x17\x18\n\
    \n\n\x02\x04\x10\x12\x04U\0W\x01\n\n\n\x03\x04\x10\x01\x12\x03U\x08\x18\
    \n\x0b\n\x04\x04\x10\x02\0\x12\x03V\x02\x19\n\r\n\x05\x04\x10\x02\0\x04\
    \x12\x04V\x02U\x1a\n\x0c\n\x05\x04\x10\x02\0\x06\x12\x03V\x02\x0e\n\x0c\
    \n\x05\x04\x10\x02\0\x01\x12\x03V\x0f\x14\n\x0c\n\x05\x04\x10\x02\0\x03\
    \x12\x03V\x17\x18\n\n\n\x02\x04\x11\x12\x04Y\0\\\x01\n\n\n\x03\x04\x11\
    \x01\x12\x03Y\x08\x1a\n\x0b\n\x04\x04\x11\x02\0\x12\x03Z\x02\x15\n\r\n\
    \x05\x04\x11\x02\0\x04\x12\x04Z\x02Y\x1c\n\x0c\n\x05\x04\x11\x02\0\x05\
    \x12\x03Z\x02\x07\n\x0c\n\x05\x04\x11\x02\0\x01\x12\x03Z\x08\x10\n\x0c\n\
    \x05\x04\x11\x02\0\x03\x12\x03Z\x13\x14\n\x0b\n\x04\x04\x11\x02\x01\x12\
    \x03[\x02\x18\n\r\n\x05\x04\x11\x02\x01\x04\x12\x04[\x02Z\x15\n\x0c\n\
    \x05\x04\x11\x02\x01\x05\x12\x03[\x02\x07\n\x0c\n\x05\x04\x11\x02\x01\
    \x01\x12\x03[\x08\x13\n\x0c\n\x05\x04\x11\x02\x01\x03\x12\x03[\x16\x17\n\
    \n\n\x02\x04\x12\x12\x04^\0a\x01\n\n\n\x03\x04\x12\x01\x12\x03^\x08\x1b\
    \n\x0b\n\x04\x04\x12\x02\0\x12\x03_\x02\x16\n\r\n\x05\x04\x12\x02\0\x04\
    \x12\x04_\x02^\x1d\n\x0c\n\x05\x04\x12\x02\0\x05\x12\x03_\x02\x06\n\x0c\
    \n\x05\x04\x12\x02\0\x01\x12\x03_\x07\x11\n\x0c\n\x05\x04\x12\x02\0\x03\
    \x12\x03_\x14\x15\n\x0b\n\x04\x04\x12\x02\x01\x12\x03`\x02\x19\n\r\n\x05\
    \x04\x12\x02\x01\x04\x12\x04`\x02_\x16\n\x0c\n\x05\x04\x12\x02\x01\x06\
    \x12\x03`\x02\x0e\n\x0c\n\x05\x04\x12\x02\x01\x01\x12\x03`\x0f\x14\n\x0c\
    \n\x05\x04\x12\x02\x01\x03\x12\x03`\x17\x18\n\n\n\x02\x04\x13\x12\x04c\0\
    e\x01\n\n\n\x03\x04\x13\x01\x12\x03c\x08\x1a\n\x0b\n\x04\x04\x13\x02\0\
    \x12\x03d\x02\x15\n\r\n\x05\x04\x13\x02\0\x04\x12\x04d\x02c\x1c\n\x0c\n\
    \x05\x04\x13\x02\0\x05\x12\x03d\x02\x07\n\x0c\n\x05\x04\x13\x02\0\x01\
    \x12\x03d\x08\x10\n\x0c\n\x05\x04\x13\x02\0\x03\x12\x03d\x13\x14\n\n\n\
    \x02\x04\x14\x12\x04g\0j\x01\n\n\n\x03\x04\x14\x01\x12\x03g\x08\x1b\n\
    \x0b\n\x04\x04\x14\x02\0\x12\x03h\x02\x16\n\r\n\x05\x04\x14\x02\0\x04\
    \x12\x04h\x02g\x1d\n\x0c\n\x05\x04\x14\x02\0\x05\x12\x03h\x02\x06\n\x0c\
    \n\x05\x04\x14\x02\0\x01\x12\x03h\x07\x11\n\x0c\n\x05\x04\x14\x02\0\x03\
    \x12\x03h\x14\x15\n\x0b\n\x04\x04\x14\x02\x01\x12\x03i\x02\x19\n\r\n\x05\
    \x04\x14\x02\x01\x04\x12\x04i\x02h\x16\n\x0c\n\x05\x04\x14\x02\x01\x06\
    \x12\x03i\x02\x0e\n\x0c\n\x05\x04\x14\x02\x01\x01\x12\x03i\x0f\x14\n\x0c\
    \n\x05\x04\x14\x02\x01\x03\x12\x03i\x17\x18\n\t\n\x02\x04\x15\x12\x03l\0\
    \x15\n\n\n\x03\x04\x15\x01\x12\x03l\x08\x12b\x06proto3\
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
