app.factory('contactFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/contact/', {}, {
        query: { method: 'GET' },
        update: { method: 'PUT', params: { id: '@id' }}
    })
});