function localStorageIsExist(){
    if ('localStorage' in window && window.localStorage !== null){
        return true;
    }
    return false;
}

function signin(){
    var name = form.name.value;
    var password = form.password.value;
    $.ajax({
        type : "POST",
        url : "/user/login",
        data : {name:name, password:password},
        dataType: 'json',
        statusCode: {
            400: function() {
                    document.getElementById("message-box").style.display = 'block';
                    document.getElementById("message-box").innerHTML = 'Something went wrong, please try again.';
                    setTimeout(function() {
                        document.getElementById("message-box").style.display = 'none';
                    }, 5000);
                },
            401: function() {
                    document.getElementById("message-box").style.display = 'block';
                    document.getElementById("message-box").innerHTML = 'You are not authorized to log in.';
                    setTimeout(function() {
                        document.getElementById("message-box").style.display = 'none';
                    }, 5000);
                },
            403: function() {
                    document.getElementById("message-box").style.display = 'block';
                    document.getElementById("message-box").innerHTML= 'Invalid user name or password.';
                    setTimeout(function() {
                        document.getElementById("message-box").style.display = 'none';
                    }, 5000);
                },
            200: function(res) {
                if(localStorageIsExist()){
                    // localStorage.setItem('access_token', res.access_token);
                    localStorage.setItem('name', res.name);
                } else {
                    // $.cookie('access_token', res.access_token);
                    $.cookie('name', res.name);
                }
                window.location = res.redirectUrl;
            }
        }
    });
}

$(function () {
        $('#inlineKeypad').keypad({target: $('.input-control:first')});
        var keypadTarget = null;
        $('.input-control').focus(function(){
            if(keypadTarget != this) {
                keypadTarget = this;
                $('#inlineKeypad').keypad('option', {target: this});
            }
        });
});