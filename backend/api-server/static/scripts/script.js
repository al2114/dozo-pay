function setCookie(name,value,days) {
    console.log("Setting cookie " + name +" to "+ value)
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    console.log("Erasing cookie: " + name)
    document.cookie = name+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

function logout() {
    eraseCookie("user_id");
    window.location.reload(false); 
}

function login() {
    setCookie("user_id",18,1);
    window.location.reload(false); 
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function submit() {
    var uid = document.getElementById("login_id").value;
    setCookie("user_id",uid,1);
    
    let redirect = getURLParameter("redirect");
    if(redirect != null){
        document.location.href=redirect;
    }
    else {
        document.location.href="/";
    }
}