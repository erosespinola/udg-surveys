app.controller('surveyController', ['$scope', '$routeParams', 'authService', 'surveysFactory', 'surveyFactory', 'questionsFactory', 'questionFactory', 'answersFactory', 'answerFactory', '$location',
    function ($scope, $routeParams, authService, surveysFactory, surveyFactory, questionsFactory, questionFactory, answersFactory, answerFactory, $location) {
        
        // Used to map type of question
        $scope.types = [
            { value: 0, label: "Texto corto" },
            { value: 1, label: "Texto largo" },
            { value: 2, label: "Opción múltiple" },
            { value: 3, label: "Selección múltiple" },
            { value: 4, label: "Escala" }
        ];

        // Variables to keep values before saving in the $scope.survey object.
        $scope.answer = {};
        $scope.question = {
            answers: []
        };
        
        /* Used to show/hide part of the DOM */        
        $scope.editingState = {
            question: false,
            answer: false
        };

        /*
            SURVEY
        */

        // callback for ng-click 'createNewSurvey':
        $scope.createNewSurvey = function () {
            if ($scope.survey.name === undefined || $scope.survey.name === "") {
                alert("La encuesta debe tener un nombre");
            } else {
                surveysFactory.create($scope.survey);
                $location.path('/surveys');
            }
        }

        // callback for ng-click 'updateSurvey':
        $scope.updateSurvey = function () {
            var updateQuestions = [];
            var createQuestions = [];
            var updateAnswers = [];
            var createAnswers = [];

            surveyFactory.update($scope.survey);

            

            angular.forEach($scope.survey.questions, function(question, i){
                if (question.id) {
                    updateQuestions.push(question);
                } else {
                    question.survey = $scope.survey.id;
                    createQuestions.push(question);
                }
                console.log(question);
            });
            
            questionFactory.update({questions: updateQuestions});
            angular.forEach(createQuestions, function(question, i){
                questionFactory.create(question);
            });
            

            /*
            angular.forEach($scope.survey.questions, function(question, i) {
                answerFactory.update(question.answers);
            });

            $location.path('/surveys');
            */
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/surveys');
        };

        /*
            QUESTIONS
        */

        $scope.saveQuestion = function () {
            if (false) { //$scope.question.question === undefined || $scope.question.help === undefined || $scope.question.type === undefined) {
                alert("Captura todos los datos.");
            } else {
                if ($scope.question.index !== undefined) { // Editing question
                    $scope.survey.questions[$scope.question.index] = $scope.question;
                } else { // New question
                    $scope.survey.questions.push($scope.question);
                }
            }
            console.log($scope.survey);
            $scope.clearQuestion();
        }

        $scope.loadQuestion = function (i) {
            $scope.question = $scope.survey.questions[i];
            $scope.question.index = i;
            $scope.editingState.question = true;
        }
        
        // Clean the scope when adding a new question
        $scope.clearQuestion = function () {
            $scope.question = {
                answers: []
            };
            $scope.editingState.question = false;
        }

        /* 
            ANSWERS
        */

        $scope.saveAnswer = function () {
            if ($scope.answer.value === undefined) {
                alert("Introduce una respuesta");
            } else {
                if ($scope.answer.index !== undefined) { // Editing answer
                    $scope.question.answers[$scope.answer.index] = $scope.answer;
                } else { // New answer
                    $scope.question.answers.push($scope.answer);
                }
            }
            $scope.clearAnswer();
        }

        $scope.loadAnswer = function (i) {
            $scope.answer = $scope.question.answers[i];
            $scope.answer.index = i;
            $scope.editingState.answer = true;
        } 

        // Clean the scope when adding a new answer
        $scope.clearAnswer = function () {
            $scope.answer = {}
            $scope.editingState.answer = false;
        }

        // Loading complete survey object...
        $scope.survey = surveyFactory.show({id: $routeParams.id});
        $scope.survey.$promise.then(function(response){
            $scope.survey.questions = questionsFactory.query({id: $routeParams.id});
            $scope.survey.questions.$promise.then(function(questionsResponse){
                angular.forEach($scope.survey.questions, function(question, i){
                    $scope.survey.questions[i].answers = answersFactory.query({id: question.id}); 
                    /*$scope.survey.questions[i].answers.$promise.then(function(answersResponse){
                        console.log(answersResponse);
                    });*/
                });
            });
        });        
        
    }]);
