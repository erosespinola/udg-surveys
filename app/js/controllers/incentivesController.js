app.controller("incentivesController", ["$scope", "$location", "authService", "auth", "incentivesFactory", "incentiveFactory", "incentiveTypesFactory", "requirementTypesFactory",
	function ($scope, $location, authService, auth, incentivesFactory, incentiveFactory, incentiveTypesFactory, requirementTypesFactory) {
    	$scope.incentiveType = {};
        $scope.requirementType = {};

        $scope.createIncentive = function () {
            incentivesFactory.create($scope.incentive);
            
        };

        $scope.editIncentive = function () {

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
    		incentiveTypesFactory.create($scope.incentiveType);
    	};

    	$scope.clearIncentiveType = function () {
    		$scope.incentiveType = {};
    	};

        $scope.addRequirementType = function () {
            console.log($scope.requirementType);
            requirementTypesFactory.create($scope.requirementType);
        };

        $scope.clearRequirementType = function () {
            $scope.requirementType = {};
        };

        $scope.incentives = incentivesFactory.query();
    	$scope.incentiveTypes = incentiveTypesFactory.query();
        $scope.requirementTypes = requirementTypesFactory.query();
	}]);