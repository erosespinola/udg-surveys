app.factory('requirementTypesFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/requirement-types/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});