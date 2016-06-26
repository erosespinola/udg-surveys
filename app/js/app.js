//Define an angular module for our app
var app = angular.module('udgSurveys', ['ngRoute']);

//Define Routing for app
app.config(function($routeProvider) {
    $routeProvider.
      when('/', {
		template: 'Work in progress'
	}).
      when('/surveys', {
		templateUrl: 'templates/surveys.html',
		controller: 'surveysController'
	}).
      when('/surveys/create', {
		templateUrl: 'templates/surveys/create.html',
		controller: 'surveysController'
	}).
      when('/incentives', {
		templateUrl: 'templates/incentives.html',
		controller: 'surveysController'
	}).
      when('/users', {
		templateUrl: 'templates/users.html',
		controller: 'surveysController'
	}).
      otherwise({
      	template: 'Testing default route'
		//redirectTo: '/404'
      });
});


app.controller('surveysController', function($scope) {
	
});