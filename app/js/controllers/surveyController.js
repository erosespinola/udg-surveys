app.controller('surveyController', ['$scope', '$routeParams', 'authService', 'surveysFactory', 'surveyFactory', 'questionsFactory', 'questionFactory', 'answerFactory', '$location',
    function ($scope, $routeParams, authService, surveysFactory, surveyFactory, questionsFactory, questionFactory, answerFactory, $location) {
        
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
            questionFactory.update($scope.survey.questions);

            angular.forEach($scope.survey.questions, function(question, i) {
                answerFactory.update(question.answers);
            });

            $location.path('/surveys');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/surveys');
        };

        $scope.addQuestion = function () {
            // Add object to $scope.questions
            console.log("Testing");
            $scope.survey.questions.push($scope.question);
            $scope.clearQuestion();
        }

        $scope.loadQuestion = function (i) {
            console.log("Loading question " + i);
            $scope.question = $scope.survey.questions[i];
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
        $scope.questions = questionsFactory.query({id: $routeParams.id});
        
    }]);

