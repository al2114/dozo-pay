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

function bin2String(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
        result += String.fromCharCode(parseInt(array[i], 2));
    }
    return result;
}

function arrayBufferToString(buffer){

    var bufView = new Uint16Array(buffer);
    var length = bufView.length;
    var result = '';
    var addition = Math.pow(2,16)-1;

    for(var i = 0;i<length;i+=addition){

        if(i + addition > length){
            addition = length - i;
        }
        result += String.fromCharCode.apply(null, bufView.subarray(i,i+addition));
    }

    return result;

}

const RegisterRequest = protobuf.pesto.user_messages.RegisterRequest;
const RegisterResponse = protobuf.pesto.user_messages.RegisterResponse;
$("#register-form").submit(function() {
    let phone = document.getElementById("register-phone").value;
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;
    let protoRequest = new RegisterRequest({
        phoneNo: phone,
        username: username,
        password: password
    });
    let data = RegisterRequest.encode(protoRequest).finish();
    var request = makeHttpObject();
    request.open('POST', '/register', true);
    request.responseType = "arraybuffer";

    request.onload = function(e){
        try{
            let response = RegisterResponse.decode(new Uint8Array(request.response));
            if(response.successful){
                console.log("Success!");
            } else {
                console.log("Something went wrong!");
            }
            console.log(response);
        } catch(e) {
            console.log("Something went wrong!");
            console.log(e);
            console.log(request.response);
            let stringResponse = arrayBufferToString(request.response);
            console.log(stringResponse);
        }
    };

    request.send(data);
    return false;
});


const TopupRequest = protobuf.pesto.user_messages.TopupRequest;
const TopupResponse = protobuf.pesto.user_messages.TopupResponse;
$("#topup-form").submit(function() {
    let uid = document.getElementById("topup-uid").value;
    let amount = document.getElementById("topup-amount").value;
    let protoRequest = new TopupRequest({
        uid : uid,
        amount: amount
    });
    let data = TopupRequest.encode(protoRequest).finish();
    var request = makeHttpObject();
    request.open('POST', '/topup', true);
    request.responseType = "arraybuffer";

    request.onload = function(e){
        try{
            let response = TopupResponse.decode(new Uint8Array(request.response));
            if(response.successful){
                console.log("Success!");
            } else {
                console.log("Something went wrong!");
            }
            console.log(response);
        } catch(e) {
            console.log("Something went wrong!");
            console.log(e);
            console.log(request.response);
            let stringResponse = arrayBufferToString(request.response);
            console.log(stringResponse);
        }
    };

    request.send(data);
    return false;
});

const TransactionRequest = protobuf.pesto.user_messages.TransactionRequest;
const TransactionResponse = protobuf.pesto.user_messages.TransactionResponse;
$("#transaction-form").submit(function() {
    let sender = document.getElementById("transaction-sender").value;
    let receiver = document.getElementById("transaction-receiver").value;
    let amount = document.getElementById("transaction-amount").value;
    let protoRequest = new TransactionRequest({
        payerId: sender,
        payeeId: receiver,
        amount: amount
    });
    let data = TransactionRequest.encode(protoRequest).finish();
    var request = makeHttpObject();
    request.open('POST', '/pay', true);
    request.responseType = "arraybuffer";

    request.onload = function(e){
        try{
            let response = TransactionResponse.decode(new Uint8Array(request.response));
            if(response.successful){
                console.log("Success!");
            } else {
                console.log("Something went wrong!");
            }
            console.log(response);
        } catch(e) {
            console.log("Something went wrong!");
            console.log(e);
            let stringResponse = arrayBufferToString(request.response);
            console.log(stringResponse);
        }
    };

    request.send(data);
    return false;
});

const CreateClaimRequest = protobuf.pesto.user_messages.CreateClaimRequest;
const CreateClaimResponse = protobuf.pesto.user_messages.CreateClaimResponse;

$("#claim-form").submit(function() {
    let uid = document.getElementById("claim-uid").value;
    let amount = document.getElementById("claim-amount").value;
    console.log(amount);
    console.log(uid);
    let protoRequest = new CreateClaimRequest({
        amount: amount,
        ownerId: uid
    });
    let data = CreateClaimRequest.encode(protoRequest).finish();
    var request = makeHttpObject();
    request.open('POST', '/claims/create', true);
    request.responseType = "arraybuffer";

    request.onload = function(e){
        try{
            let response = CreateClaimResponse.decode(new Uint8Array(request.response));
            if(response.successful){
                console.log("Success!");
            } else {
                console.log("Something went wrong!");
            }
            console.log(response);
        } catch(e) {
            console.log("Something went wrong!");
            console.log(e);
            let stringResponse = arrayBufferToString(request.response);
            console.log(stringResponse);
        }
    };

    request.send(data);
    return false;
});
