app.factory('statusFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/system-status/', {}, {
        query: { method: 'GET' },
        update: { method: 'PUT', params: { id: '@id' }}
    })
});