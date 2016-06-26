//Define an angular module for our app
var app = angular.module('udgSurveys', ['ngRoute']);

//Define Routing for app
app.config(function($routeProvider) {
    $routeProvider.
      when('/', {
		template: 'Work in progress'
	}).
      when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'loginController'
	}).
      when('/surveys', {
		templateUrl: 'templates/surveys.html',
		controller: 'surveysController',
		resolve: {
			auth: function($q, authService) {
				var userInfo = authService.getUserInfo();

				if (userInfo) {
					return $q.when(userInfo);
				} else {
					return $q.reject({ authenticated: false });
				}
			}
		}
	}).
      when('/surveys/create', {
		templateUrl: 'templates/surveys/create.html',
		controller: 'surveysController'
	}).
      when('/incentives', {
		templateUrl: 'templates/incentives.html',
		controller: 'incentivesController'
	}).
      when('/users', {
		templateUrl: 'templates/users.html',
		controller: 'usersController'
	}).
      otherwise({
      	template: 'Testing default route'
		//redirectTo: '/404'
      });
});

app.run(["$rootScope", "$location", function ($rootScope, $location) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);




