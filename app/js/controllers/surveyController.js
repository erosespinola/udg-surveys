app.controller('surveyController', ['$scope', '$routeParams', 'authService', 'surveysFactory', 'surveyFactory', 'questionsFactory', 'questionFactory', 'answersFactory', 'answerFactory', '$location', '$route',
    function ($scope, $routeParams, authService, surveysFactory, surveyFactory, questionsFactory, questionFactory, answersFactory, answerFactory, $location, $route) {
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
                closeOnConfirm: true 
                }, 
                function() {
                    surveyFactory.delete({ id: surveyId }).$promise.then(function(params){
                        $scope.surveys = surveysFactory.query();
                    });
                    //$route.reload();
            });

        };

        // callback for ng-click 'createSurvey':
        $scope.createSurvey = function () {
            $location.path('/surveys/create');
        };

        $scope.surveys = surveysFactory.query();

        /*
            Everything related to the form begins here...  
        */

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
            answerOptions: []
        };
        
        /* Used to show/hide part of the DOM */        
        $scope.editingState = {
            question: false,
            answer: false
        };
        $scope.saving = false;

        /*
            SURVEY
        */

        // callback for ng-click 'createNewSurvey':
        $scope.createNewSurvey = function () {
            if ($scope.saving) {
                return;
            } 
            $scope.saving = !$scope.saving;

            if ($scope.survey.name === undefined || $scope.survey.name === "") {
                alert("La encuesta debe tener un nombre");
            } else {
                $scope.survey.active = true;
                surveysFactory.create($scope.survey).$promise.then(function(params){
                    $location.path('/surveys/');
                });
                
            }
        }

        // callback for ng-click 'updateSurvey':
        $scope.updateSurvey = function () {
            if ($scope.saving) {
                return;
            }
            $scope.saving = !$scope.saving;

            var updateQuestions = [];
            var createQuestions = [];
            var updateAnswers = [];
            var createAnswers = [];

            angular.forEach($scope.survey.questions, function(question, i){
                if (question.id) {
                    updateQuestions.push(question);

                    angular.forEach(question.answerOptions, function(answer, i) {
                        if (answer.id) {
                            updateAnswers.push(answer);
                        } else {
                            answer.question = question.id;
                            createAnswers.push(answer);
                        }
                    });
                } else {
                    question.survey = $scope.survey.id;
                    createQuestions.push(question);
                    angular.forEach(question.answerOptions, function(answer, i){
                        answerFactory.create(answer);
                    });
                    
                }
                console.log(question);
            });
            
            surveyFactory.update($scope.survey).$promise.then(function(params) {
                questionFactory.update({questions: updateQuestions}).$promise.then(function(params) {
                    angular.forEach(createQuestions, function(question, i){
                        questionFactory.create(question);
                    });

                    answerFactory.update({answerOptions: updateAnswers}).$promise.then(function(params) {
                        angular.forEach(createAnswers, function(answer, i){
                            answerFactory.create(answer)
                        });
                    });
                });
            }).finally(function() {
                $location.path('/surveys/');
            });
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
        
        $scope.deleteQuestion = function (i) {
            swal({
                title: "¿Deseas eliminar esta pregunta?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Eliminar",
                closeOnConfirm: true 
            }, 
                function() {
                    console.log($scope.survey);
                    if ($scope.survey.questions[i].id) {
                        questionFactory.delete({ id: $scope.survey.questions[i].id });
                    }
                    $scope.survey.questions.splice(i, 1);
                    $scope.$apply();
            });
        }

        // Clean the scope when adding a new question
        $scope.clearQuestion = function () {
            $scope.question = {
                answerOptions: []
            };
            $scope.editingState.question = false;
        }

        /* 
            ANSWERS
        */

        $scope.saveAnswer = function () {
            if (false) { //$scope.answer.value === undefined) {
                alert("Introduce una respuesta");
            } else {
                if ($scope.answer.index !== undefined) { // Editing answer
                    $scope.question.answerOptions[$scope.answer.index] = $scope.answer;
                } else { // New answer
                    $scope.question.answerOptions.push($scope.answer);
                }
            }
            $scope.clearAnswer();
        }

        $scope.loadAnswer = function (i) {
            $scope.answer = $scope.question.answerOptions[i];
            $scope.answer.index = i;
            $scope.editingState.answer = true;
        }

        $scope.loadMinMax = function () {
            if ($scope.question.answerOptions[0]) {
                $scope.answer = $scope.question.answerOptions[0];
            }
        } 


        // Clean the scope when adding a new answer
        $scope.clearAnswer = function () {
            $scope.answer = {}
            $scope.editingState.answer = false;
        }

        $scope.validateSurvey = function () {
            
        };

        $scope.valideteQuestion = function () {

        };

        $scope.validateAnswer = function () {

        };

        // Loading complete survey object...
        $scope.survey = surveyFactory.show({id: $routeParams.id});
        $scope.survey.$promise.then(function(response){

            $scope.survey.questions = questionsFactory.query({id: $routeParams.id});
            $scope.survey.questions.$promise.then(function(questionsResponse){

                angular.forEach($scope.survey.questions, function(question, i){
                    $scope.survey.questions[i].answerOptions = answersFactory.query({id: question.id}); 
                });
            });
        }); 
    }]);