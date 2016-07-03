app.controller('surveysController', ['$window', '$scope', '$location', '$route', 'authService', 'surveysFactory', 'surveyFactory', 
    function ($window, $scope, $location, $route, authService, surveysFactory, surveyFactory) {
        //$scope.userInfo = auth;
        $scope.getStatus = function (active) {
            return (active) ? "Active" : "Inactive" ;
        };

        // callback for ng-click 'editSurvey':
        $scope.editSurvey = function (surveyId) {
            $location.path('/surveys/' + surveyId);
        };

        // callback for ng-click 'deleteSurvey':
        $scope.deleteSurvey = function (surveyId) {
            swal({
                title: "¿Deseas eliminar esta encuesta?",
                text: "La encuesta será eliminada junto con todas las preguntas que contiene.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Eliminar",
                closeOnConfirm: false 
                }, 
                function() {
                    surveyFactory.delete({ id: surveyId });
                    //$scope.surveys = surveysFactory.query();
                    setTimeout(function () {
                        $route.reload();    
                    }, 1000);
            });

        };

        // callback for ng-click 'createSurvey':
        $scope.createSurvey = function () {
            $location.path('/surveys/create');
        };

        $scope.surveys = surveysFactory.query();
        
    }]);