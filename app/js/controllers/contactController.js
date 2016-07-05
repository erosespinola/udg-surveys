app.controller("contactController", ["$scope", "$location", "authService", "auth", "contactFactory",
	function ($scope, $location, authService, auth, contactFactory) {
        $scope.contact = contactFactory.query();
        
        $scope.update = function() {
            contactFactory.update($scope.contact);
        };

	}]);