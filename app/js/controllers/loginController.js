app.controller("loginController", ["$scope", "$location", "$window", "authService", 
    function ($scope, $location, $window, authService) {

        // If there's a session, then redirect 
        if ($window.sessionStorage["userInfo"]) {
            //$location.path("/");
        }

        $scope.userInfo = null;
        
        $scope.login = function () {
            authService.login($scope.user, $scope.password)
                .then(function (result) {
                    $scope.userInfo = result;
                    $location.path("/");
                }, function (error) {
                    $window.alert("Invalid credentials");
                    console.log(error);
                });
        };

        // Not used, check authService
        $scope.logout = function () {
            authService.logout().then(function (result) {
                $location.path("/login");
            }, function (error) {
                $location.path("/login");
            });
        }
    }]); 