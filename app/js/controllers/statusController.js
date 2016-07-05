app.controller("statusController", ["$scope", "$location", "authService", "auth", "statusFactory",
	function ($scope, $location, authService, auth, statusFactory) {
        $scope.status = statusFactory.query();

        $scope.update = function() {
            
            statusFactory.update($scope.status).$promise.then(function(){
                swal({
                    title: "Estatus actualizado",
                    text: "Se ha actualizado el estatus del sistema",
                    type: "success"
                });
            }); 
        };
	}]);