//Define an angular module for our app
var app = angular.module('udgSurveys', ['ngRoute', 'ngResource']);

//Define Routing for app
app.config(function($routeProvider) {
	var resolveLogin = function ($q, authService) {
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
	};

    $routeProvider.
      when('/', {
		template: 'Work in progress',
		resolve: {
			auth: function($q, authService) {
				return resolveLogin($q, authService);
			}
		}
	}).
      when('/login/', {
		templateUrl: 'templates/login.html',
		controller: 'loginController'
	}).
      when('/surveys/', {
		templateUrl: 'templates/surveys.html',
		controller: 'surveysController',
		resolve: {
			auth: function($q, authService) {
				return resolveLogin($q, authService);
			}
		}
	}).
      when('/surveys/:id', {
		templateUrl: 'templates/surveys/create.html',
		controller: 'surveyController',
		resolve: {
			auth: function($q, authService) {
				return resolveLogin($q, authService);
			}
		}
	}).
      when('/surveys/create/', {
		templateUrl: 'templates/surveys/create.html',
		controller: 'surveyController',
		resolve: {
			auth: function($q, authService) {
				return resolveLogin($q, authService);
			}
		}
	}).
      when('/incentives/', {
		templateUrl: 'templates/incentives.html',
		controller: 'incentivesController',
		resolve: {
			auth: function($q, authService) {
				return resolveLogin($q, authService);
			}
		}
	}).
      when('/users/', {
		templateUrl: 'templates/users.html',
		controller: 'usersController',
		resolve: {
			auth: function($q, authService) {
				return resolveLogin($q, authService);
			}
		}
	}).
      when('/logout/', {
		templateUrl: 'templates/login.html',
		controller: 'loginController'
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


app.run(["$rootScope", "$location", "$route", "authService", function ($rootScope, $location, $route, authService) {
    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
    	if ($location.$$path === "/logout") {
    		authService.logout();
    		$location.path("/login");
    	} else if ($location.$$path === "/surveys/") {
    		//console.log("Reload");
    		//$route.reload();
    	}
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);




