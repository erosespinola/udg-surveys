app.controller("loginController", ["$scope", "$location", "$window", "authService", function ($scope, $location, $window, authService) {
    $scope.userInfo = null;
    
    $scope.login = function () {
        authService.login($scope.userName, $scope.password)
            .then(function (result) {
                $scope.userInfo = result;
                $location.path("/");
            }, function (error) {
                $window.alert("Invalid credentials");
                console.log(error);
            });
    };
}]);