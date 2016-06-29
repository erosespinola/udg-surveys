app.factory('requirementTypesFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + JSON.parse($window.sessionStorage['userInfo']).token + '/requirement-types/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});