app.controller("generalController", ["$scope", "$location", "$window", "authService", 
    function ($scope, $location, $window, authService) {

        $scope.showMenu = function () {
            if (authService.getUserInfo().token) {
                return true;
            }
            return false;
        };

        $scope.logout = function () {
            authService.logout().then(function (result) {
                $location.path("/login");
            }, function (error) {
                $location.path("/login");
            });
        };

    }]); 