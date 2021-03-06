app.controller("incentivesController", ["$scope", "$location", "authService", "auth", "incentivesFactory", "incentiveFactory", "incentiveTypesFactory", "requirementTypesFactory",
	function ($scope, $location, authService, auth, incentivesFactory, incentiveFactory, incentiveTypesFactory, requirementTypesFactory) {
    	$scope.incentive = {};
        $scope.incentiveType = {};
        $scope.requirementType = {};

        $scope.getStatus = function (active) {
            return (active) ? "Activo" : "Inactivo" ;
        };

        $scope.createIncentive = function () {
            var validator = $scope.validateIncentive();
            if (!(Object.keys(validator).length === 0 && validator.constructor === Object)) {

                var message = $scope.getErrorMessage(validator);

                swal({
                    title: "Incentivo incompleto",
                    text: message,
                    type: "warning"
                });

                return;
            }

            incentivesFactory.create($scope.incentive).$promise.then(function(incentive) {
                $scope.incentives.push(incentive);    
            });
            
            $('#incentive-modal-detail').modal('hide');
        };

        $scope.updateIncentive = function () {
            var validator = $scope.validateIncentive();
            if (!(Object.keys(validator).length === 0 && validator.constructor === Object)) {

                var message = $scope.getErrorMessage(validator);

                swal({
                    title: "Incentivo incompleto",
                    text: message,
                    type: "warning"
                });

                return;
            }

            incentiveFactory.update($scope.incentive);
            angular.forEach($scope.incentives, function (incentive, i) {
                if ($scope.incentive.id === incentive.id) {
                    $scope.incentives[i] = angular.copy($scope.incentive);
                }
            });
            $('#incentive-modal-detail').modal('hide');
        }

        $scope.sendStatusRequest = function(id, incentive) {
            incentiveFactory.update({id: id, active: incentive.active}).$promise.then(function(params) {
            });
        };

        $scope.updateStatus = function(incentiveId) {
            angular.forEach($scope.incentives, function(incentive, i) {
                if (incentive.id === incentiveId) {
                    incentive.active = !incentive.active;
                    $scope.sendStatusRequest(incentive.id, incentive);

                    swal("Incentivo activo", "Se ha actualizado el incentivo como activo", "success")
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
    		incentiveTypesFactory.create($scope.incentiveType).$promise.then(function(type) {
                $scope.incentiveTypes.push({
                    id: type.id,
                    value: $scope.incentiveType.value
                });  
                $scope.incentiveTypeIds.push(type.id);  
            });
            

    	};

        /*$scope.updateStatus = function (incentiveId) {
            incentiveFactory.update({ id: incentiveId, active: true})
        }*/

    	$scope.clearIncentiveType = function () {
    		$scope.incentiveType = {};
    	};

        $scope.addRequirementType = function () {
            requirementTypesFactory.create($scope.requirementType).$promise.then(function(requirement) {
                $scope.requirementTypes.push({
                    id: requirement.id,
                    value: $scope.requirementType.value
                });

                $scope.incentiveRequirementIds.push(requirement.id);
            });
        };

        $scope.clearRequirementType = function () {
            $scope.requirementType = {};
        };

        $scope.getIncentiveType = function (typeId) {
            var typeValue = "";
            angular.forEach($scope.incentiveTypes, function(type, i) {
                if (typeId === type.id) {
                    typeValue = type.value
                }
            });
            return typeValue;
        }

        $scope.getIncentiveRequirement = function (requirementId) {
            var requirementValue = "";
            angular.forEach($scope.requirementTypes, function(requirement, i) {
                if (requirementId === requirement.id) {
                    requirementValue = requirement.value
                }
            });
            return requirementValue;
        }

        $scope.validateIncentive = function() {
            var incentiveValidator = {};
            if ($scope.incentive.name === undefined || $scope.incentive.name === "") {
                incentiveValidator.question = "El nombre del incentivo es obligatorio.";
            }
            if ($scope.incentive.type === undefined || $scope.incentive.type === "" || $scope.incentive.type === "?") {
                incentiveValidator.type = "El tipo de incentivo es obligatorio.";
            }
            if ($scope.incentive.requirement === undefined || $scope.incentive.requirement === "" || $scope.incentive.requirement === "?") {
                incentiveValidator.requirement = "La condición es obligatoria.";
            }
            if ($scope.incentive.startAt === undefined || $scope.incentive.startAt === "" || $scope.incentive.startAt === "?") {
                incentiveValidator.startAt = "El inicio del incentivo es obligatorio.";
            }
            if ($scope.incentive.endAt === undefined || $scope.incentive.endAt === "" || $scope.incentive.endAt === "?") {
                incentiveValidator.endAt = "El fin del incentivo es obligatorio.";
            }
            if (new Date($scope.incentive.startAt) > new Date($scope.incentive.endAt)) { // Fecha mayor y menor
                incentiveValidator.dates = "Las fechas de inicio y fin son incorrectas";
            }

            return incentiveValidator;
        };

        $scope.getErrorMessage = function(validator) {
            var errorText = "";
            for (var key in validator) {
                if (validator.hasOwnProperty(key)) {
                    errorText += validator[key] + '\n';
                }
            }
            return errorText;
        }

        $scope.incentives = incentivesFactory.query();
    	incentiveTypesFactory.query().$promise.then(function(result) {
            $scope.incentiveTypes = result;

            $scope.incentiveTypeIds = new Array();

            angular.forEach($scope.incentiveTypes, function(type, i) {
                $scope.incentiveTypeIds.push(type.id);
            });
        });

        

        $scope.requirementTypes = requirementTypesFactory.query().$promise.then(function(result) {
           $scope.requirementTypes = result;

            $scope.incentiveRequirementIds = new Array();

            angular.forEach($scope.requirementTypes, function(requirement, i) {
                $scope.incentiveRequirementIds.push(requirement.id);
            }); 

        });

	}]);