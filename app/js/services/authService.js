app.factory("authService", function($http, $q, $window) {
    

    function login(user, password) {
        var deferred = $q.defer();

        $http.post($window.baseUrl + "api/login", {
            user: user,
            password: password
        }).then(function(result) {
            // Calculate expiration date (10 hours) 
            var expiration_date = new Date();
            expiration_date.setHours(expiration_date.getHours() + 10);

            localStorage.setItem("token", result.data.token);
            localStorage.setItem("expires_on", expiration_date);

            deferred.resolve(localStorage.token);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    /* 
        This should remove the session token from $window.sessionStorage
    */
    function logout() {
        var deferred = $q.defer();

        $http({
            method: "POST",
            url: "http://192.168.1.74:3000/api/logout",
            headers: {
                "access_token": userInfo.accessToken
            }
        }).then(function (result) {
            userInfo = null;
            $window.sessionStorage["userInfo"] = null;
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getUserInfo() {
        return {token: localStorage.token, expires_on: (new Date(localStorage.expires_on))};
    }

    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo
    };
});