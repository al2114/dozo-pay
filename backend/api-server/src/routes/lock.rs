use protos::user_messages::{CheckPasscodeRequest, SuccessResponse};
use serde_rocket_protobuf::{Proto, ProtoResult};

#[post("/check-passcode", data = "<request>")]
fn check_passcode_route(request: Proto<CheckPasscodeRequest>) -> ProtoResult<SuccessResponse> {
    let passcode = "3192".to_string();
    let mut response = SuccessResponse::new();
    response.set_successful(passcode == request.get_passcode());
    Ok(Proto(response))
}
