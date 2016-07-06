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
            console.log($scope.email);
            swal({   
                title: "¿Deseas enviar este correo?",   
                text: "",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonText: "Enviar",   
                closeOnConfirm: true
            }, 
            function() { 
                $.ajax({
                    url: "sendEmail.php",
                    data: $scope.email,
                    method: "POST",
                    beforeSend: function( xhr ) {
                        xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                    }
                })
                .done(function(data) {
                    console.log(data);
                    $scope.confirmAndRedirect();
                    
                });  
            });  
        }

        $scope.confirmAndRedirect = function() {
            swal({   
                title: "Correo enviado",   
                text: "",   
                type: "warning",   
                showCancelButton: false,   
                confirmButtonText: "Aceptar",   
                closeOnConfirm: true
            }, 
            function() {}); 
            $scope.email = {};                
            $location.path("/");  
            $scope.$apply(function(){
                        
            });  
        }

        $scope.email = {};

    }]);