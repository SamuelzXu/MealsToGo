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
		}).
		when('/admin/assigncateringdriver', {
			templateUrl: '/partial/admin-assigncateringdriver.html'
		}).
		when('/admin/recent', {
			templateUrl: '/partial/admin-recent.html'
		}).
		when('/admin/public_signup', {
			templateUrl: '/partial/admin-publicsignup.html'
		});
	$locationProvider.html5Mode(true);
}]);