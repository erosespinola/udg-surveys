app.controller("incentivesController", ["$scope", "$location", "authService", "auth", function ($scope, $location, authService, auth) {
    $scope.userInfo = auth;
    
}]);