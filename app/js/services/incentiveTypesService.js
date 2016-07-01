app.factory('incentiveTypesFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/incentive-types/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});