function getUnassigned() {
    var result = null;
    $.ajax({
        type : "GET",
        dataType : 'json',
        async : false,
        url: "https://pocketask-api.herokuapp.com/requests/uncompleted",
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function getRestaurant(id) {
    var result = null;
    $.ajax({
        type : "GET",
        dataType : "json",
        async : false,
        url: "http://pocketask-api.herokuapp.com/restaurants/get?id=" + id,
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function getHistory(id) {
    var result = null;
    $.ajax({
        type : "GET",
        dataType : "json",
        async : false,
        url: "http://pocketask-api.herokuapp.com/requests/restaurant_history?id=" + id,
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
    if(localStorageIsExist()) {
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

function clearcounter() {
    $.ajax({
        type : "GET",
        url : "/admin/restaurant/clear_counter",
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
        window.location=('/admin/admin_history?id=' + profile._id);
    };
    $scope.getProfile = function(callbackfun) {
        $http({method : 'GET', url : 'https://pocketask-api.herokuapp.com/restaurants/list'})
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
    var id = restaurant._id;
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
    document.getElementById("id").innerHTML = "ID: " + id;
    document.getElementById("fullname").innerHTML = "Full Name: " + fullname;
    document.getElementById("address").innerHTML = "Address: " + address;
    document.getElementById("phone").innerHTML = "Phone: " + phone;
    document.getElementById("current").innerHTML = "Current Number of Requests: " + current;
    document.getElementById("total").innerHTML = "Total Number of Requests: " + total;
    document.getElementById("balance").innerHTML = "Balance: " + balance;
}

function changectrl($scope, $http) {
    $scope.name = a;
    $scope.newpassword = form.new.value;
    $scope.fun = function(name, newpassword) {
        $http({method : 'GET', url : '/admin/user/changepassword', 
            params : {name : name, newPassword : newpassword}})
        .success(function(data) {
            form.new.value = '';
            alert('password changed successfully.');
        })
        .error(function(data) {
            alert('error occurs when change password.');
        });
    };
    $scope.changepassword = function() {
        $scope.fun($scope.name, $scope.newpassword);
    };
}

function balancectrl($scope, $http) {
    $scope.name = a;
    $scope.amount = credit_form.amount.value;
    $scope.fun = function(name, amount) {
        $http({method : 'GET', url : '/admin/restaurant/credit?', 
            params : {name : name, amount : amount}})
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

function incrementctrl($scope, $http) {
    $scope.name = a;
    $scope.fun = function(name) {
        $http({method : 'GET', url : '/admin/restaurant/increment_counter?',
            params : {name : name}})
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

function getDrivers() {
	var result;
	$.ajax({
		type : 'GET',
		dataType : 'json',
		async : false,
		url : 'https://pocketask-api.herokuapp.com/drivers/available',
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

/* var print = function(o){
    var str='';

    for(var p in o){
        if(typeof o[p] == 'String'||typeof o[p] == 'Boolean'||){
            str+= p + ': ' + o[p]+'; </br>';
        }else{
            str+= p + ': { </br>' + print(o[p]) + '}';
        }
    }

    return str;
    } */

function driverctrl($scope, $http) {
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
		$http({method :'get', url :'https://pocketask-api.herokuapp.com/requests/assign', 
            params : {
                id : getIdFromUrl(window.location.href), 
                driver : driver._id
            }})
        .success(function(data){
            history.back();
        })
        .error(function(data){
            alert('Driver has not been assigned.');
        });
    }
    
    $scope.change = function(driver) {
		$http({method :'get', url :'https://pocketask-api.herokuapp.com/requests/give_order', 
            params : {
                id : getIdFromUrl(window.location.href), 
                driver : driver._id
            }})
        .success(function(data){
            history.back();
        })
        .error(function(data){
            alert(data + ' cannot change status, please try again.');
        });
    };
}
