app.controller("usersController", ["$scope", "$location", "authService", "auth", "userFactory", "usersFactory",
	function ($scope, $location, authService, auth, userFactory, usersFactory) {
        $scope.roles = [
            { value: 0, label: "Lector" },
            { value: 1, label: "Administrador" }
        ];

    	$scope.user = {};
        $scope.userEdit = {};

        $scope.createUser = function() {
            usersFactory.create($scope.user).$promise.then(function() {
                $scope.users = usersFactory.query();
            });
            $scope.clearUser();
        };

        $scope.deleteUser = function(id) {
            swal({
                title: "¿Deseas eliminar este usuario?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Eliminar",
                closeOnConfirm: true 
            }, 
            function() {
                userFactory.delete({ id: id }).$promise.then(function() {
                    $scope.users = usersFactory.query();
                });
            });
        };

        $scope.populateUser = function(user) {
            $scope.userEdit = angular.copy(user);; 
        };

        $scope.updateUser = function() {
            userFactory.update($scope.userEdit).$promise.then(function() {
                $scope.users = usersFactory.query();
            });
            $scope.clearUser();
        };

        $scope.getRole = function(role) {
            return role ? "Administrador" : "Lector" ;
        };

        $scope.clearUser = function() {
            $scope.user = {};
        }

        $scope.users = usersFactory.query();
	}]);