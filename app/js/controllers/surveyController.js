app.controller('surveyController', ['$scope', '$routeParams', 'authService', 'surveysFactory', 'surveyFactory', '$location',
    function ($scope, $routeParams, authService, surveysFactory, surveyFactory, $location) {
        $scope.types = ["Texto corto", "Texto largo", "Opción múltiple", "Selección múltiple", "Escala"];

        $scope.questions = [];
        $scope.question = {
            answers: []
        };
        $scope.answers = [];
        $scope.answer = "";

        


        // callback for ng-click 'createNewSurvey':
        $scope.createNewSurvey = function () {
            surveysFactory.create($scope.survey);
            console.log($scope.survey);
            $location.path('/surveys');
        }

        // callback for ng-click 'updateSurvey':
        $scope.updateSurvey = function () {
            surveyFactory.update($scope.survey);
            $location.path('/surveys');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/surveys');
        };

        $scope.addQuestion = function () {
            // Add object to $scope.questions
            console.log("Testing");
            $scope.questions.push($scope.question);
            $scope.survey.questions = $scope.questions;
            $scope.clearQuestion();
        }

        $scope.loadQuestion = function (i) {
            console.log("Loading question " + i);
            $scope.question = $scope.questions[i];
            $scope.answers = $scope.question.answers;
        }

        $scope.clearQuestion = function () {
            $scope.question = {
                answers: []
            };
        }

        $scope.addAnswer = function () {
            $scope.question.answers.push($scope.answer);
            $scope.clearAnswer();
        }

        $scope.loadAnswer = function (i) {
            console.log("Loading answer " + i)
            $scope.answer = $scope.question.answers[i];
        } 

        $scope.clearAnswer = function () {
            $scope.answer = ""
        }

        $scope.survey = surveyFactory.show({id: $routeParams.id});
    }]);

