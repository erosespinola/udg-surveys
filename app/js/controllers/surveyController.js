app.controller('surveyController', [
    '$scope', 
    '$routeParams', 
    'authService', 
    'addSurveyFactory',
    'surveysFactory', 
    'surveyFactory', 
    'updateSurveyFactory', 
    'deleteSurveyFactory',
    'questionsFactory', 
    'addQuestionFactory',
    'updateQuestionFactory',
    'deleteQuestionFactory', 
    'deleteAnswerFactory',
    'answersFactory', 
    'updateAnswerFactory', 
    'addAnswerFactory', 
    '$location', 
    '$route',
    function (
        $scope, 
        $routeParams, 
        authService, 
        addSurveyFactory,
        surveysFactory, 
        surveyFactory, 
        updateSurveyFactory, 
        deleteSurveyFactory,
        questionsFactory, 
        addQuestionFactory,
        updateQuestionFactory, 
        deleteQuestionFactory,
        deleteAnswerFactory,
        answersFactory, 
        updateAnswerFactory, 
        addAnswerFactory, 
        $location, 
        $route) {
        // Used to map type of question
        $scope.types = [
            { value: 0, label: "Texto corto" },
            { value: 1, label: "Texto largo" },
            { value: 2, label: "Opción múltiple" },
            { value: 3, label: "Selección múltiple" },
            { value: 4, label: "Escala" }
        ];

        $scope.getStatus = function (active) {
            return (active === 1) ? "Activa" : "Inactiva" ;
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
                    console.log(surveyId);
                    deleteSurveyFactory.delete({ id: surveyId }).$promise.then(function(params){
                        $scope.surveys = surveysFactory.query();
                    });
            });
        };

        // callback for ng-click 'createSurvey':
        $scope.createSurvey = function() {
            $location.path('/surveys/create');
        };

        surveysFactory.query().$promise.then(function(surveys) {
            $scope.surveys = surveys;
        });

        /*
            Everything related to the form begins here...  
        */

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

        // Surveys
        $scope.createNewSurvey = function() {
            if ($scope.saving) {
                return;
            } 

            var validator = $scope.validateSurvey();
            if (!(Object.keys(validator).length === 0 && validator.constructor === Object)) {
                var message = $scope.getErrorMessage(validator);
                swal({
                    title: "Encuesta incompleta",
                    text: message,
                    type: "warning"
                });

                return;
            }

            $scope.saving = !$scope.saving;
            $scope.survey.Current = 0;
            addSurveyFactory.add($scope.survey).$promise.then(function(params){
                $location.path('/surveys/');
            });
        }

        $scope.updateSurvey = function() {
            if ($scope.saving) {
                return;
            }

            var validator = $scope.validateSurvey();
            if (!(Object.keys(validator).length === 0 && validator.constructor === Object)) {
                var message = $scope.getErrorMessage(validator);
                swal({
                    title: "Encuesta incompleta",
                    text: message,
                    type: "warning"
                });
                return;
            }

            $scope.saving = !$scope.saving;
            updateSurveyFactory.update($scope.survey).$promise.then(function(params) { }).finally(function() {
                $location.path('/surveys/');
            });
        };

        $scope.sendStatusRequest = function(id, survey) {
            console.log("changing " + survey.Survey + " " + id + " to " + survey.Current);
            updateSurveyFactory.update({SurveyKey: id, Current: survey.Current, Survey: survey.Survey});
        };

        $scope.updateStatus = function(surveyId) {
            angular.forEach($scope.surveys, function(survey, i) {
                if (survey.SurveyKey === surveyId) {
                    survey.Current = 1;
                } else {
                    survey.Current = 0;
                }
                
                $scope.sendStatusRequest(survey.SurveyKey, survey);
            });

            swal("Encuesta activa", "Se ha actualizado la encuesta como activa", "success")
        }

        $scope.cancel = function() {
            $location.path('/surveys');
        };

        
        // Questions
        $scope.saveQuestion = function() {
            var validator = $scope.validateQuestion();
            if (!(Object.keys(validator).length === 0 && validator.constructor === Object)) {
                var message = $scope.getErrorMessage(validator);
                swal({
                    title: "Pregunta incompleta",
                    text: message,
                    type: "warning"
                });
                $('#survey-modal-detail').modal('hide');
                return $scope.clearQuestion();
            } else {
                if ($scope.question.index !== undefined) { // Editing question
                    $scope.survey.questions[$scope.question.index] = $scope.question;
                    updateQuestionFactory.update($scope.question).$promise.then(function() {
                        if ($scope.question.TypeQuestion === 0 || $scope.question.TypeQuestion === 1 || $scope.question.TypeQuestion === 4) {
                            deleteAnswerFactory.delete({ id: $scope.question.QuestionKey }).$promise.then(function(){
                                $scope.question.answerOptions = [];
                                $scope.clearQuestion();
                            }) ;
                        }
                    });
                } else { // New question
                    $scope.question.SurveyLink = $scope.survey.SurveyKey;
                    $scope.question.Min = 0;
                    $scope.question.Max = 10;
                    $scope.question.TextMin = "Malo";
                    $scope.question.TextMax = "Bueno";

                    addQuestionFactory.add($scope.question).$promise.then(function(question) {
                        $scope.question.QuestionKey = question.true;
                        $scope.survey.questions.push($scope.question);
                        $scope.clearQuestion();
                    });
                }
            }

            $('#survey-modal-detail').modal('hide');
        }

        $scope.loadQuestion = function (i) {
            $scope.question = angular.copy($scope.survey.questions[i]);
            $scope.question.index = i;
            $scope.editingState.question = true;
        }
        
        $scope.deleteQuestion = function (i) {
            swal({
                title: "¿Deseas eliminar esta pregunta?",
                text: "La pregunta será eliminada junto con todas las opciones que contiene.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Eliminar",
                closeOnConfirm: true 
            }, 
                function() {
                    var questionId = $scope.survey.questions[i].QuestionKey;
                    deleteAnswerFactory.delete({ id: questionId }).$promise.then(function(){
                        console.log("inside " + questionId);
                        deleteQuestionFactory.delete({ id: questionId }).$promise.then(function() {
                            $scope.survey.questions.splice(i, 1);
                        });
                    });
                    
                    
            });
        }

        $scope.clearQuestion = function() {
            $scope.question = {
                answerOptions: []
            };
            $scope.editingState.question = false;
        }

        // Answers
        $scope.saveAnswer = function() {
            var validator = $scope.validateAnswer();
            if (!(Object.keys(validator).length === 0 && validator.constructor === Object)) {
                var message = $scope.getErrorMessage(validator);

                swal({
                    title: "Respuesta incompleta",
                    text: message,
                    type: "warning"
                });
                $('#answer-modal').modal('hide');
                return $scope.clearAnswer();
            } else {
                if ($scope.answer.index !== undefined) { // Editing answer
                    $scope.question.answerOptions[$scope.answer.index] = $scope.answer;
                    updateAnswerFactory.update($scope.answer);
                    $('#answer-modal').modal('hide');
                    $scope.clearAnswer();
                } else { // New answer
                    $scope.answer.QuestionLink = $scope.question.QuestionKey;
                    addAnswerFactory.add($scope.answer).$promise.then(function() {  
                        updateQuestionFactory.update($scope.question).$promise.then(function() {
                            $scope.question.answerOptions.push($scope.answer);
                            $('#answer-modal').modal('hide');
                            $scope.clearAnswer();
                        });     
                    });  
                }
            }
        }

        $scope.loadAnswer = function (i) {
            $scope.answer = angular.copy($scope.question.answerOptions[i]);
            $scope.answer.index = i;
            $scope.editingState.answer = true;
        }

        $scope.clearAnswer = function() {
            $scope.answer = {};
            $scope.editingState.answer = false;
        }

        // Validations
        $scope.validateSurvey = function() {
            var surveyValidator = {};
            if ($scope.survey.Survey === undefined || $scope.survey.Survey === "") {
                surveyValidator.name = "El nombre de la encuesta es obligatorio."
            }
            return surveyValidator;
        };

        $scope.validateQuestion = function() {
            var questionValidator = {};
            if ($scope.question.Question === undefined || $scope.question.Question === "") {
                questionValidator.question = "El texto de la pregunta es obligatorio.";
            }
            if ($scope.question.TypeQuestion === undefined || $scope.question.TypeQuestion === "" || $scope.question.TypeQuestion === "?") {
                questionValidator.type = "El tipo de pregunta es obligatorio.";
            }
            if ($scope.question.TypeQuestion === 4 && $scope.question.QuestionKey 
                && ($scope.question.Min == null || $scope.question.Max == null) ) { // Escala
                questionValidator.answerOptionsScale = "Se debe definir una escala."
            }
            if ($scope.question.TypeQuestion === 4 && $scope.question.QuestionKey  && ($scope.question.TextMin == null || $scope.question.TextMin === "" 
                || $scope.question.TextMax == null || $scope.question.TextMax === "")) { // Escala
                questionValidator.answerOptionsScale = "Se debe definir un texto."
            }
            return questionValidator;
        };

        $scope.validateAnswer = function() {
            var answerValidator = {};
            if ([2,3].indexOf($scope.question.TypeQuestion) > -1 && ($scope.answer.Option === undefined || $scope.answer.Option === "")) {
                answerValidator.value = "El texto de la respuesta es obligatorio.";
            }
            return answerValidator;
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

        // Load
        if ($routeParams.id) {
            $scope.survey = surveyFactory.show({id: $routeParams.id});
            $scope.survey.$promise.then(function(response){

                $scope.survey.questions = questionsFactory.query({id: $routeParams.id});
                $scope.survey.questions.$promise.then(function(questionsResponse){
                    angular.forEach($scope.survey.questions, function(question, i){
                        $scope.survey.questions[i].answerOptions = answersFactory.query({id: question.QuestionKey});
                    });
                });
            });    
        }
        
    }]);