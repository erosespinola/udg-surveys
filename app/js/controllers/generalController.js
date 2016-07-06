app.controller("generalController", ["$scope", "$location", "$window", "authService", 
    function ($scope, $location, $window, authService) {

        $scope.showMenu = function () {
            if (authService.getUserInfo().token) {
                return true;
            }
            return false;
        };

        $scope.logout = function () {
            authService.logout().then(function (result) {
                $location.path("/login");
            }, function (error) {
                $location.path("/login");
            });
        };

        $scope.sendEmail = function () {

            var validator = $scope.validateEmail();
            if (!(Object.keys(validator).length === 0 && validator.constructor === Object)) {
                var message = $scope.getErrorMessage(validator);

                swal({
                    title: "Correo incompleto",
                    text: message,
                    type: "warning"
                });

                return;
            }

            console.log($scope.email);
            swal({   
                title: "¿Deseas enviar este correo?",   
                text: "",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonText: "Enviar",   
                closeOnConfirm: true
            }, 
            function(isConfirm) { 
                $.ajax({
                    url: "sendEmail.php",
                    data: $scope.email,
                    method: "POST",
                    beforeSend: function( xhr ) {
                        xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                    }
                })
                .done(function(data) {
                    swal("Correo enviado!");
                    setTimeout(function(){
                        $scope.email = {};                
                        $location.path("/");      
                        $scope.$apply(function() {});    
                    }, 2000);
                    
                });  
            });  
        }

        $scope.validateEmail = function() {
            validator = {};

            if ($scope.email.receiver === undefined || $scope.email.receiver === "") {
                validator.receiver = "El destinatario es obligatorio."
            }

            if ($scope.email.subject === undefined || $scope.email.subject === "") {
                validator.subject = "El asunto es obligatorio."
            }

            if ($scope.email.message === undefined || $scope.email.message === "") {
                validator.message = "El contenido del correo es obligatorio."
            }

            return validator;
        }

        $scope.getErrorMessage = function(validator) {
            var errorText = "";
            for (var key in validator) {
                if (validator.hasOwnProperty(key)) {
                    errorText += validator[key] + '\n';
                }
            }
            return errorText;
        }

        $scope.email = {};

    }]);