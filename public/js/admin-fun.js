function getUn(){
    var result = null;
    $.ajax({
        type : "GET",
        dataType : 'json',
        async : false,
        url: "/admin/restaurant/uncompleted",
        success : function(data) {
            result = data;
        }
    });
    return result;
}

function getHistory(name){
    var result = null;
    $.ajax({
        type : "GET",
        dataType : "json",
        async : false,
        url : "/admin/restaurant/history?name=" + name,
        success : function(data){
            result = data;
        }
    });
    return result;
}
// function change(name, id){
//     var result = null;
//     $.ajax({
//         type : "GET",
//         dataType : "json",
//         async : false,
//         url : "/admin/restaurant/change_status?name=" + name +"&id=" + id,
//         success : function(data){
//             restul = data;
//         }
//     });
//     return result;
// }
function localStorageIsExist(){
    if ('localStorage' in window && window.localStorage !== null){
        return true;
    }
    return false;
}

function getCookie(cname) {
    if(localStorageIsExist()){
        return localStorage.getItem(cname);
    } else {
        return $.cookie(cname);
    }
}

function logout(){
    if(localStorageIsExist()){
        // localStorage.removeItem('access_token');
        localStorage.removeItem('name');
    } else {
        // $.cookie('access_token', null);
        // $.cookie('name', null);
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

function clearcounter(){
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

// function credit(name, amount){
//     $.ajax({
//         type : "GET",
//         url : "/admin/restaurant/credit?name=" + name + "&amount=" + amount,
//         success : function(data) {
//             location.reload();
//         },
//         error : function(data) {
//             alert('credit failed.' + data);
//         }
//     });
// }

function profilectrl($scope, $http) {
    $scope.viewhist = function(profile){
        window.location=('/admin/admin_history?name=' + profile.name);
    };
    $scope.getProfile = function(callbackfun){
        $http({method : 'GET', url : '/admin/restaurant/all'})
            .success(function(data) {
                callbackfun(data);
            }).error(function() {
                alert("error");
            });
    };
    function callbackfun(data){
        $scope.profiles = data;
    }
    $scope.getProfile(callbackfun);
}

var a = null;
function histctrl($scope, $location) {
    $scope.name = ($location.search()).name;
    var restaurant = getHistory($scope.name)[0];
    var fullname = restaurant.fullname;
    var id = restaurant.name;
    var address = restaurant.address;
    var phone = restaurant.phone;
    var balance = restaurant.balance;
    var current = restaurant.current_requests;
    var total = restaurant.total_requests;
    var balance = restaurant.account_balance;
    a = id;
    var hists = restaurant.request_history;
    $scope.hists = [];
    hists.reverse();
    angular.forEach(hists, function(value) {
        value.date = new Date(value.date).toString().substring(0, 25);
        if (value.status === 0){
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

function changectrl($scope, $http){
    $scope.name = a;
    $scope.newpassword = form.new.value;

    $scope.change = function(name, newpassword) {
        $http({method : 'GET', url : '/admin/user/changepassword', params : {name : name, newPassword : newpassword}})
        .success(function (data) {
            form.new.value = '';
            alert('password changed successfully.');
        })
        .error(function (data) {
            alert('error occurs when change password.');
        });
    };

    $scope.changepassword = function(){
        $scope.change($scope.name, $scope.newpassword);
    };
}

function balancectrl($scope, $http) {
    $scope.name = a;
    $scope.amount = credit_form.amount.value;
    $scope.fun = function(name, amount){
        $http({method : 'GET', url : '/admin/restaurant/credit?', params : {name : name, amount : amount}})
        .success(function (data) {
            location.reload();
        })
        .error(function (data) {
            alert('Credit failed. Try again.');
        });
    };
    $scope.balance = function(){
        $scope.fun($scope.name, $scope.amount);
    };
}