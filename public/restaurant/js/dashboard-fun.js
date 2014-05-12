function localStorageExists() {
    if ('localStorage' in window && window.localStorage !== null) {
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
    t = setTimeout(function() {startTime();},500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getCookie(cname) {
    if(localStorageExists()) {
        return localStorage.getItem(cname);
    } else {
        return $.cookie(cname);
    }
}

function updateHistoryTable(restaurant) {
    var history = getHistory(3);
    var tbody = document.createElement('tbody');
    for (var i = 0; i < 10; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(
            new Date(history[i].date).toString().substring(0,25)));
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    document.getElementById('history-table-body').innerHTML = tbody.innerHTML;
}

function requestDriver() {
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

function getRestaurant() {
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

function getHistory(limit) {
    if (!limit) {
        limit = 10;
    }
    var result = null;
    $.ajax({
        type: "GET",
        dataType : 'json',
        async : false,
        url: "/restaurant/get_history?limit=" + limit,
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function getMobilePhones() {
    var result = null;
    $.ajax({
        type: "GET",
        dataType : 'json',
        async : false,
        url: "/restaurant/get_mobile_phones",
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function logout() {
    if(localStorageExists()) {
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

function addnumberctrl($scope, $http) {
    $scope.displayMessage = function(msg) {
        document.getElementById("message-box").style.display = 'block';
        document.getElementById("message-box").innerHTML = msg;
        setTimeout(function() {
            document.getElementById("message-box").style.display = 'none';
        }, 5000);
    };
    $scope.addNumber = function() {
        $.ajax({
            type : "GET",
            url : "/restaurant/add_mobile_phone?number=" + add_number_form.number.value,
            statusCode: {
                400: function() {
                    $scope.displayMessage('The phone number is invalid');
                },
                409: function() {
                    $scope.displayMessage('The phone number was already added');
                },
                500: function() {
                    $scope.displayMessage('Something went wrong, please try again');
                },
                200: function(res) {
                    location.reload();
                }
            }
        });
    };
}

function mobilectrl($scope, $location, $http) {
    $scope.name = ($location.search()).name;
    var mobiles = getMobilePhones($scope.name);
    $scope.mobiles = [];
    angular.forEach(mobiles, function(mobile) {
        mobile.created_at = new Date(mobile.created_at).toString().substring(0, 25);
        $scope.mobiles.push(mobile);
    });
    $scope.del = function(number) {
        $http({method :'GET', url :'/restaurant/delete_mobile_phone', 
            params: {number : number}})
        .success(function(data){
            $scope.mobiles.splice(0,1);
        })
        .error(function(data){
            alert('Cannot delete phone number, please try again.');
        });
    };
}
