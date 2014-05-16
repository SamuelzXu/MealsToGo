var adminApp = angular.module('adminApp',['ngRoute']);

function localStorageIsExist(){
    if ('localStorage' in window && window.localStorage !== null){
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
        }
    } else if (getCookie("token") === null) {
        window.location = "/signin";
    }
    next();
}

adminApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider.
		when('/admin/all_profile', {
			templateUrl: '/partial/admin-profile.html',
			resolve: checktoken
		}).
		when('/admin/dashboard', {
			templateUrl: '/partial/admin-uncompleted.html',
			resolve: checktoken
		}).
		when('/admin/admin_history', {
			templateUrl: '/partial/admin-history.html',
			resolve: checktoken
		}).
		when('/admin/change_status', {
			templateUrl: '/partial/admin-change.html',
			resolve: checktoken
		}).
		when('/admin/changepassword', {
			templateUrl: '/partial/admin-changepassword.html',
			resolve: checktoken
		}).
		when('/admin/assigndriver', {
			templateUrl: '/partial/admin-assigndriver.html',
			resolve: checktoken
		});
	$locationProvider.html5Mode(true);
}]);