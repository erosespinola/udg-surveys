app.factory("authService", function($http, $q, $window) {
    var userInfo;

    function login(user, password) {
        var deferred = $q.defer();

        $http.post($window.baseUrl + "api/login", {
            user: user,
            password: password
        }).then(function(result) {
            userInfo = {
              token: result.data.token,
              user: user
            };
            $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
            deferred.resolve(userInfo);
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
        return userInfo;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();

    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo
    };
});