//Define an angular module for our app
var app = angular.module('udgSurveys', ['ngRoute', 'ngResource']);

//Define Routing for app
app.config(function($routeProvider) {
    $routeProvider.
      when('/', {
		template: 'Work in progress',
		auth: function($q, authService) {
				var userInfo = authService.getUserInfo();
				if (userInfo) {
					return $q.when(userInfo);
				} else {
					return $q.reject({ authenticated: false });
				}
			}
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
				var currentDate = new Date();

				if (userInfo) {
					if (currentDate <= userInfo.expires_on) {
						return $q.when(userInfo);	
					} else {
						return $q.reject({ authenticated: false });
					}
				} else {
					return $q.reject({ authenticated: false });
				}
			}
		}
	}).
      when('/surveys/:id', {
		templateUrl: 'templates/surveys/survey.html',
		controller: 'surveyController'
	}).
      when('/surveys/create', {
		templateUrl: 'templates/surveys/survey.html',
		controller: 'surveyController'
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

app.config(['$httpProvider', function($httpProvider) {
	//$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

/* API's base url */
app.run(['$window', function($window) {
	$window.baseUrl = 'http://107.170.214.114:9000/';
}]);


app.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);




