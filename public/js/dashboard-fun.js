var host = "https://pocketask-api.herokuapp.com/";
// var host = "http://localhost:8080/";
var historyScope;

function localStorageIsExist() {
    if ('localStorage' in window && window.localStorage !== null) {
        return true;
    }
    return false;
}

function checktoken(){
    var now = new Date().getTime();
    if (localStorageIsExist()){
        var expire = localStorage.getItem("expire");
        if (now > expire) {
            localStorage.removeItem("expire");
            localStorage.removeItem("token");
            window.location = "/signin";
            throw('token expired');
        }
    } else if (getCookie("token") === null) {
        window.location = "/signin";
        throw('token expired');
    }
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
    if(localStorageIsExist()) {
        return localStorage.getItem(cname);
    } else {
        return $.cookie(cname);
    }
}

function updateHistoryTable() {
    var hists = getHistory(3);
    historyScope.hists = [];
    angular.forEach(hists, function(value) {
        value.date = new Date(value.requestedAt).toString().substring(0, 25);
        if (value.status === 9) {
            value.status = 'Driver Sent';
        } else {
            value.status = 'In Queue';
        }
        historyScope.hists.push(value);
    });
    historyScope.$apply();
}

function requestDriver() {
    var rest = requestform.dest.value;
    checktoken();
    $.ajax({
        type : "GET",
        crossDomain : true,
        url : host + "requests/request_driver",
        data : {dest : dest},
        headers : {
            token : localStorage.getItem("token")
        },
        success : function(data) {
            newrest = data;
            document.getElementById("current").innerHTML = newrest.currentRequests;
            document.getElementById("current").style.backgroundColor = "red";
            setTimeout(function() {
                document.getElementById("current").style.backgroundColor = "white";
            }, 5000);
            updateHistoryTable();
        }
    });
}

function getRestaurant() {
    checktoken();
    var result = null;
    $.ajax({
        type : "GET",
        dataType : 'json',
        async : false,
        url : host + "restaurants/get",
        headers : {
            token : localStorage.getItem("token")
        },
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function checkDistance() {
    checktoken();
    var address1 = restaurant.address.full;
    var address2 = form.address2_st.value + ', Ontario';
    $.ajax({
        type : "get",
        dataType : "json",
        url : host + "features/distance/",
        data : {"from": address1, "to": address2},
        success : function(data) {
            if (data.apiStatus !== "OK") {
                document.getElementById("result").innerHTML =
                    "Something went wrong with the Google map, please try again later.";
            } else if (data.queryStatus !== "OK") {
                document.getElementById("result").innerHTML =
                    "We can not find the address, please check your spelling and try again.";
            } else {
                document.getElementById("result").innerHTML =
                    "The distance between you and " + form.address2_st.value +
                    " is " + data.distance.value + " " + data.distance.unit;
                document.getElementById("address2_st").value = "";
            }
        },
        error : function(data) {
            alert("error occurs, please check your spelling");
        }
    });
}

function logout() {
    checktoken();
    $.ajax({
        type: "GET",
        dataType : 'json',
        async : false,
        url : "/signout",
        headers : {
            token : localStorage.getItem("token")
        },
        statusCode: {
            200 : function(data) {
                if(localStorageIsExist()) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('expire');
                }
                window.location = '/signin';
            }
        }
    });
}

function getHistory(limit) {
    checktoken();
    var result = null;
    $.ajax({
        type: "GET",
        dataType : 'json',
        async : false,
        url : host + "requests/restaurant_history?limit=" + limit,
        headers : {
            token : localStorage.getItem("token")
        },
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function getCateringHistory() {
    checktoken();
    var result = null;
    $.ajax({
        type: "GET",
        dataType : 'json',
        async : false,
        url : host + "caterings/restaurant_history",
        headers : {
            token : localStorage.getItem("token")
        },
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function getMobilePhones() {
    checktoken();
    var result = null;
    $.ajax({
        type: "GET",
        dataType : 'json',
        async : false,
        url: host + "restaurants/mobile/get",
        headers : {
            token : localStorage.getItem("token")
        },
        success : function(data) {
            result = data;
        }
    });
    return result;
}



function longhistctrl($scope) {
    var lhists = getHistory();
    $scope.lhists = [];
    angular.forEach(lhists, function(value) {
        value.date = new Date(value.requestedAt).toString().substring(0, 25);
        if (value.status === 9) {
            value.status = 'Driver Sent';
        } else {
            value.status = 'In Queue';
            value.deliveredBy = null;
        }
        $scope.lhists.push(value);
    });
}

function longcateringhistctrl($scope) {
    var lhists = getCateringHistory();
    $scope.lhists = [];
    angular.forEach(lhists, function(value) {
        value.date = new Date(value.requestedAt).toString().substring(0, 25);
        if (value.status === 9) {
            value.status = 'Driver Sent';
        } else {
            value.status = 'In Queue';
            value.deliveredBy = null;
        }
        $scope.lhists.push(value);
    });
}

function mobilectrl($scope, $location, $http) {
    var mobiles = getMobilePhones();
    $scope.mobiles = [];
    angular.forEach(mobiles, function(mobile) {
        mobile.createdAt = new Date(mobile.createdAt).toString().substring(0, 25);
        $scope.mobiles.push(mobile);
    });
    $scope.del = function(mobile) {
        checktoken();
        $.ajax({
            type : "GET",
            url : host + "restaurants/mobile/delete?number=" + mobile.number,
            headers : {
                token : localStorage.getItem("token")
            },
            success : function(data) {
                $scope.$apply(function() {
                    $scope.mobiles.splice($scope.mobiles.indexOf(mobile), 1);
                });
            },
            error : function(data) {
                alert('Cannot delete phone number, please try again.');
            }
        });
    };
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
        checktoken();
        $.ajax({
            type : "GET",
            url : host + "restaurants/mobile/add?number=" + add_number_form.number.value,
            headers : {
                token : localStorage.getItem("token")
            }, 
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