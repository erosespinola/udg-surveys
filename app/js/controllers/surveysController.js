app.controller('surveysController', ['$scope', '$location', 'authService', 'surveysFactory', 'surveyFactory', 
    function ($scope, $location, authService, surveysFactory, surveyFactory) {
        //$scope.userInfo = auth;

        // callback for ng-click 'editSurvey':
        $scope.editSurvey = function (surveyId) {
            $location.path('/surveys/' + surveyId);
        };

        // callback for ng-click 'deleteSurvey':
        $scope.deleteSurvey = function (surveyId) {
            surveyFactory.delete({ id: surveyId });
            $scope.surveys = surveysFactory.query();
        };

        // callback for ng-click 'createSurvey':
        $scope.createSurvey = function () {
            $location.path('/surveys/create');
        };

        $scope.surveys = surveysFactory.query();
        
    }]);