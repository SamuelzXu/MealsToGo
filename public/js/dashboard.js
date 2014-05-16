var dashboardApp = angular.module('dashboardApp',['ngRoute']);

function checktoken(){
    var now = new Date().getTime();
    if (localStorageIsExist()){
        var expire = localStorage.getItem("expire");
        if (now - 10000 > expire) {
            localStorage.removeItem("expire");
            localStorage.removeItem("token");
            window.location = "/signin";
        }
    } else if (getCookie("token") === null) {
        window.location = "/signin";
    }
    next();
}


dashboardApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider.
		when('/restaurant/history', {
			templateUrl: '/partial/history.html',
			resolve: checktoken
		}).
		when('/restaurant/dashboard', {
			templateUrl: '/partial/main.html',
			resolve: checktoken
		}).
		when('/restaurant/changepassword', {
			templateUrl: '/partial/change_pw.html',
			resolve: checktoken
		}).
		when('/restaurant/mobilemanager', {
			templateUrl: '/partial/mobilemanager.html',
			resolve: checktoken
		});
	$locationProvider.html5Mode(true);
}]);
