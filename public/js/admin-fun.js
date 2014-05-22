var host = "https://pocketask-api.herokuapp.com/";
// var host = "http://localhost:8080/";

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

function getUnassigned() {
    checktoken();
    var result = null;
    $.ajax({
        type : "GET",
        dataType : 'json',
        async : false,
        headers : {
            token : localStorage.getItem("token")
        },
        url: host + "requests/uncompleted",
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function getRestaurant(id) {
    checktoken();
    var result = null;
    $.ajax({
        type : "GET",
        dataType : "json",
        async : false,
        url: host + "restaurants/get?id=" + id,
        headers : {
            token : localStorage.getItem("token")
        },
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function getHistory(id) {
    checktoken();
    var result = null;
    $.ajax({
        type : "GET",
        dataType : "json",
        async : false,
        url: host + "requests/restaurant_history?id=" + id,
        headers : {
            token : localStorage.getItem("token")
        },
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function localStorageIsExist() {
    if ('localStorage' in window && window.localStorage !== null) {
        return true;
    }
    return false;
}

function getCookie(cname) {
    if(localStorageIsExist()) {
        return localStorage.getItem(cname);
    } else {
        return $.cookie(cname);
    }
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
                } else {
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
                window.location = data.redirect;
            }
        }
    });
}

function clearcounter() {
    checktoken();
    $.ajax({
        type : "GET",
        url : host + "requests/clear",
        headers : {
            token : localStorage.getItem("token")
        },
        success : function(data) {
            alert(data);
        },
        error : function(data) {
            alert('clear counter failed.' + data);
        }
    });
}

function profilectrl($scope, $http) {
    $scope.viewhist = function(profile) {
        checktoken();
        window.location=('/admin/admin_history?id=' + profile._id._id);
    };
    $scope.getProfile = function(callbackfun) {
        checktoken();
        $http({method : 'GET', url : host + 'restaurants/list', headers : {'token' : localStorage.getItem("token")}})
            .success(function(data) {
                callbackfun(data);
            }).error(function() {
                alert("error");
            });
    };
    function callbackfun(data) {
        $scope.profiles = data;
    }
    $scope.getProfile(callbackfun);
}

var a = null;
function histctrl($scope, $location) {
    $scope.id = ($location.search()).id;
    var restaurant = getRestaurant($scope.id);
    var fullname = restaurant.fullname;
    var address = restaurant.address;
    var phone = restaurant.phone;
    var current = restaurant.currentRequests;
    var total = restaurant.totalRequests;
    var balance = restaurant.balance;
    a = id;
    var hists = getHistory($scope.id);
    $scope.hists = [];
    angular.forEach(hists, function(value) {
        value.date = new Date(value.requestedAt).toString().substring(0, 25);
        if (value.status === 0) {
            value.status = 'In Queue';
        } else {
            value.status = 'Driver Sent';
        }
        $scope.hists.push(value);
    });
    document.getElementById("fullname").innerHTML = "Full Name: " + fullname;
    document.getElementById("address").innerHTML = "Address: " + address;
    document.getElementById("phone").innerHTML = "Phone: " + phone;
    document.getElementById("current").innerHTML = "Current Number of Requests: " + current;
    document.getElementById("total").innerHTML = "Total Number of Requests: " + total;
    document.getElementById("balance").innerHTML = "Balance: " + balance;
}

function changectrl($scope, $http, $location) {
    $scope.id = ($location.search()).id;
    $scope.newpassword = form.new.value;
    $scope.fun = function(name, newpassword) {
        checktoken();
        $http({method : 'PUT', url : host + 'users/reset?id=' + $scope.id, 
            data : {newpassword : newpassword},
            headers : {"token" : localStorage.getItem("token")}})
        .success(function(data) {
            form.new.value = '';
            alert('password changed successfully.');
        })
        .error(function(data) {
            alert('error occurs when change password.');
        });
    };
    $scope.changepassword = function() {
        $scope.fun($scope.id, $scope.newpassword);
    };
}

function balancectrl($scope, $http, $location) {
    checktoken();
    $scope.name = ($location.search()).id;
    $scope.amount = credit_form.amount.value;
    $scope.fun = function(name, amount) {
        checktoken();
        $http({method : 'GET', url : host + 'restaurants/credit', 
            params : {id : name, amount : amount}, 
            headers : {"token" : localStorage.getItem("token")}})
        .success(function(data) {
            location.reload();
        })
        .error(function(data) {
            alert('Credit failed. Try again.');
        });
    };
    $scope.balance = function() {
        $scope.fun($scope.name, $scope.amount);
    };
}

function incrementctrl($scope, $http, $location) {
    checktoken();
    $scope.name = ($location.search()).id;
    $scope.fun = function(name) {
        checktoken();
        $http({method : 'GET', url : host + 'requests/request_driver',
            params : {id : name},
            headers : {"token" : localStorage.getItem("token")}})
        .success(function(data) {
            location.reload();
        })
        .error(function(data) {
            alert('Increment counter failed. Try again.');
        });
    };
    $scope.incrementcounter = function() {
        $scope.fun($scope.name);
    };
}

function uncompletedctrl($scope, $http) {
    var uns = getUnassigned();
    $scope.uns = [];
    angular.forEach(uns, function(value) {
        value.requestedAt = new Date(value.requestedAt).toString().substring(0, 25);
        $scope.uns.push(value);
    });
    $scope.assign = function(id) {
        window.location=('/admin/assigndriver?id=' + id);
    }
}

function datactrl($scope, $http) {
    $scope.getcur = function(fun) {
        $.ajax({
            type : 'GET',
            url : host + 'requests/current',
            headers : {
                token : localStorage.getItem("token")
            },
            success : function(data) {
                document.getElementById("cur").innerHTML = "Current Requests: " +
                    data['currentRequests'];
            },
            error : function(data) {
                alert('Cannot get current number of requests.');
            }
        });
    };
    $scope.gettotal = function(fun) {
        $.ajax({
            type : 'GET',
            url : host + 'requests/total',
            success : function(data) {
                document.getElementById("total").innerHTML = "Total Requests: " +
                    data['totalRequests'];
            },
            error : function(data) {
                alert('Cannot get current number of requests.');
            }
        });
    };
    $scope.getcur();
    $scope.gettotal();
}

function getDrivers() {
    checktoken();
	var result;
	$.ajax({
		type : 'GET',
		dataType : 'json',
		async : false,
		url : host + 'drivers/available',
        headers : {
            token : localStorage.getItem("token")
        },
		success : function(data) {
			result = data;
		}
	});
	return result;
}
	
function getIdFromUrl(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars["id"];
}

function driverctrl($scope, $http) {
    checktoken();
	var drivers = getDrivers();
	$scope.drivers = [];
	angular.forEach(drivers, function(driver) {
		if (driver.available === true) {
			driver.available = 'Available';
		} else {
			driver.available = 'Not Available';
		}
		$scope.drivers.push(driver);
	});

	$scope.assign = function(driver) {
        checktoken();
		$http({method :'get', url : host + 'requests/assign', 
            params : {
                id : getIdFromUrl(window.location.href), 
                driver : driver._id
            }, headers : {'token' : localStorage.getItem("token")}})
        .success(function(data){
            history.back();
        })
        .error(function(data){
            alert('Driver has not been assigned.');
        });
    }
    
    $scope.change = function(driver) {
        checktoken();
		$http({method :'get', url : host + 'requests/give_order', 
            params : {
                id : getIdFromUrl(window.location.href), 
                driver : driver._id
            }, headers : {'token' : localStorage.getItem("token")}})
        .success(function(data){
            history.back();
        })
        .error(function(data){
            alert(data + ' cannot change status, please try again.');
        });
    };
}
