var indexApp = angular.module('indexApp',['ngRoute']);

indexApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider.
		when('/', {
			templateUrl: '/partial/index-main.html'
		});
		/*when('/aboutus', {
			templateUrl: '/partial/index-aboutus.html'
		});*/
	$locationProvider.html5Mode(true);
}]);