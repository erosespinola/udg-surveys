app.factory('incentivesFactory', function ($resource, $window) {
    return $resource( $window.bassUrl + 'api/' + localStorage.token + '/incentives/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

app.factory('incentiveFactory', function ($resource, $window) {
    return $resource( $window.bassUrl + 'api/' +localStorage.token + '/incentives/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});