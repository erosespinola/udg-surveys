app.factory('usersFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/users/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

app.factory('userFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' +localStorage.token + '/users/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});