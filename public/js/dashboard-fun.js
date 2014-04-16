function localStorageIsExist(){
    if ('localStorage' in window && window.localStorage !== null){
        return true;
    }
    return false;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function(){startTime();},500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i].trim();
//         if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
//     }
//     return "";
// }

function getCookie(cname) {
    if(localStorageIsExist()){
        return localStorage.getItem(cname);
    } else {
        return $.cookie(cname);
    }
}

function updateHistoryTable(restaurant) {
    var history = restaurant.request_history.reverse();
    var tbody = document.createElement('tbody');
    for (var i = 0; i < 10; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(new Date(history[i].date).toString().substring(0,25)));
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    document.getElementById('history-table-body').innerHTML = tbody.innerHTML;
}

function requestDriver() {
    // var param = "?name=" + getCookie('name');
    var newrest = null;
    $.ajax({
        type : "GET",
        crossDomain : true,
        url : "/restaurant/request_driver",
        success : function(data) {
            newrest = data;
            document.getElementById("current").innerHTML = newrest.current_requests;
            document.getElementById("current").style.backgroundColor = "red";
            setTimeout(function() {
                document.getElementById("current").style.backgroundColor = "white";
            }, 5000);
            updateHistoryTable(newrest);
        }
    });
}

function getRestaurant(){
    // var name = getCookie('name');
    var result = null;
    $.ajax({
        type: "GET",
        dataType : 'json',
        async : false,
        url: "/restaurant/get",
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function logout(){
    if(localStorageIsExist()){
        localStorage.removeItem('name');
    } else {
        $.removeCookie('name');
    }
    $.ajax({
        type: "GET",
        dataType : 'json',
        async : false,
        url: "/user/logout",
        success : function(data) {
            window.location = data.redirectUrl;
        }
    });
}