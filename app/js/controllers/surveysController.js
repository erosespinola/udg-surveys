app.controller("surveysController", ["$scope", "$location", "authService", "auth",function ($scope, $location, authService, auth) {
    $scope.userInfo = auth;

    $scope.logout = function () {

        authService.logout()
            .then(function (result) {
                $scope.userInfo = null;
                $location.path("/login");
            }, function (error) {
                console.log(error);
            });
    };
}]);