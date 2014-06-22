var dashboardApp = angular.module('dashboardApp',['ngRoute']);

dashboardApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider.
		when('/restaurant/history', {
			templateUrl: '/partial/history.html',
		}).
		when('/restaurant/dashboard', {
			templateUrl: '/partial/main.html',
		}).
		when('/restaurant/changepassword', {
			templateUrl: '/partial/change_pw.html',
		}).
		when('/restaurant/mobilemanager', {
			templateUrl: '/partial/mobilemanager.html',
		}).
		when('/restaurant/catering', {
			templateUrl: '/partial/catering.html',
		});
	$locationProvider.html5Mode(true);
}]);
