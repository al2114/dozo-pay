$("#login-form").submit(function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let loginRequest = {
        username: username,
        password: password
    };

    var request = makeHttpObject();
    request.open('POST', '/login', false);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(loginRequest));
    let response = JSON.parse(request.responseText)
    if(response['successful']){
        let redirect = getURLParameter("redirect");
        if(redirect != null){
            document.location.href=redirect;
        }
        else {
            document.location.href="/";
        }
    }
    else {
        $(".hidden").removeClass("hidden");
    }
    return false;
});
