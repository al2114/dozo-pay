var protobuf = require("./protos.js");
var $ = require("jquery")

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}

    throw new Error("Could not create HTTP request object.");
}

const LoginRequest = protobuf.pesto.user_messages.LoginRequest;
const LoginResponse = protobuf.pesto.user_messages.LoginResponse;

$("#login-form").submit(function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let loginRequest= new LoginRequest({
        username: username,
        password: password
    });
    let data = LoginRequest.encode(loginRequest).finish();
    var request = makeHttpObject();
    request.open('POST', '/login', true);
    request.responseType = "arraybuffer";

    request.onload = function(e){
        try{
            let response = LoginResponse.decode(new Uint8Array(request.response));
            if(response.successful){
                let redirect = getURLParameter("redirect");
                if(redirect != null){
                    document.location.href=redirect;
                } else {
                    document.location.href="/";
                }
                return;
            }
        } catch(e) {}
        $(".hidden").removeClass("hidden");
    };

    request.send(data);
    return false;
});
