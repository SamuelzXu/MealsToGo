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
        url : "https://pocketask-api.herokuapp.com/users/authenticate",
        // url : "http://localhost:8080/users/authenticate",
        // url : "https://pocketask-api-test.herokuapp.com/users/authenticate",
        data : {
            username: name,
            password: password
        },
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
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('expire', new Date().getTime() + 12 * 60 * 60 * 1000);
                }
                var now = new Date();
                now.setTime(now.getTime() + (12*60*60*1000));
                var expires = now.toGMTString();
                document.cookie = "token=" + res.token +"; expires=" + expires;
                window.location = "/dashboard";
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
