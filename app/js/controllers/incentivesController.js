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

        };

        $scope.editIncentive = function (incentive) {
            incentive.startAt = new Date(incentive.startAt);
            incentive.endAt = new Date(incentive.endAt);
            $scope.incentive = incentive;
            console.log($scope.incentive)
        }

        $scope.updateStatus = function (incentiveId) {
            incentiveFactory.update({ id: incentiveId, active: true})
        }

        $scope.deleteIncentive = function (incentiveId) {
            incentiveFactory.delete({ id: incentiveId });
            $scope.incentives = incentivesFactory.query();
        };

    	$scope.addIncentiveType = function () {
    		console.log($scope.incentiveType);
    		var type = incentiveTypesFactory.create($scope.incentiveType);
            $scope.incentiveTypes.push({
                id: type.id,
                value: $scope.incentiveType.value
            });

    	};

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
	}]);