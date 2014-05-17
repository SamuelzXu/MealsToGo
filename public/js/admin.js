var adminApp = angular.module('adminApp',['ngRoute']);

adminApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider.
		when('/admin/all_profile', {
			templateUrl: '/partial/admin-profile.html'
		}).
		when('/admin/dashboard', {
			templateUrl: '/partial/admin-uncompleted.html'
		}).
		when('/admin/admin_history', {
			templateUrl: '/partial/admin-history.html'
		}).
		when('/admin/change_status', {
			templateUrl: '/partial/admin-change.html'
		}).
		when('/admin/changepassword', {
			templateUrl: '/partial/admin-changepassword.html'
		}).
		when('/admin/assigndriver', {
			templateUrl: '/partial/admin-assigndriver.html'
		});
	$locationProvider.html5Mode(true);
}]);