app.factory('incentiveTypesFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + JSON.parse($window.sessionStorage['userInfo']).token + '/incentive-types/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});