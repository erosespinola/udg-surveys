app.controller("incentivesController", ["$scope", "$location", "authService", "auth", "incentivesFactory", "incentiveFactory", "incentiveTypesFactory", "requirementTypesFactory",
	function ($scope, $location, authService, auth, incentivesFactory, incentiveFactory, incentiveTypesFactory, requirementTypesFactory) {
    	$scope.incentive = {};
        $scope.incentiveType = {};
        $scope.requirementType = {};

        $scope.getStatus = function (active) {
            return (active) ? "Activo" : "Inactivo" ;
        };

        $scope.createIncentive = function () {
            incentivesFactory.create($scope.incentive);
            $scope.incentives.push($scope.incentive);
        };

        $scope.updateIncentive = function () {
            incentiveFactory.update($scope.incentive);
            angular.forEach($scope.incentives, function (incentive, i) {
                if ($scope.incentive.id === incentive.id) {
                    console.log("Object changed");
                    $scope.incentives[i] = angular.copy($scope.incentive);
                }
            });
        }

        /* This load the data, to update in DB check updateIncentive */
        $scope.editIncentive = function (incentive) {
            // Copy to avoid changes in incentives list.
            incentive = angular.copy(incentive);

            incentive.startAt = new Date(incentive.startAt);
            incentive.endAt = new Date(incentive.endAt);
            $scope.incentive = incentive;
            console.log($scope.incentive);
        }

        $scope.clearIncentive = function () {
            $scope.incentive = {};
        }

        $scope.deleteIncentive = function (incentiveId) {
            swal({
                title: "¿Deseas eliminar este incentivo?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Eliminar",
                closeOnConfirm: true 
                }, 
                function() {
                    incentiveFactory.delete({ id: incentiveId }).$promise.then(function(params){
                        $scope.incentives = incentivesFactory.query();
                    });
            });

            
        };

    	$scope.addIncentiveType = function () {
    		console.log($scope.incentiveType);
    		var type = incentiveTypesFactory.create($scope.incentiveType);
            $scope.incentiveTypes.push({
                id: type.id,
                value: $scope.incentiveType.value
            });

    	};

        $scope.updateStatus = function (incentiveId) {
            incentiveFactory.update({ id: incentiveId, active: true})
        }

    	$scope.clearIncentiveType = function () {
    		$scope.incentiveType = {};
    	};

        $scope.addRequirementType = function () {
            console.log($scope.requirementType);
            var requirement = requirementTypesFactory.create($scope.requirementType);
            $scope.requirementTypes.push({
                id: requirement.id,
                value: $scope.requirementType.value
            });
        };

        $scope.clearRequirementType = function () {
            $scope.requirementType = {};
        };

        $scope.incentives = incentivesFactory.query();
    	$scope.incentiveTypes = incentiveTypesFactory.query();
        $scope.requirementTypes = requirementTypesFactory.query();

        console.log($scope.incentiveTypes);
	}]);