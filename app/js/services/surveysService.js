app.factory('surveysFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + JSON.parse($window.sessionStorage['userInfo']).token + '/surveys', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

app.factory('surveyFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + JSON.parse($window.sessionStorage['userInfo']).token + '/surveys/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

app.factory('questionsFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + JSON.parse($window.sessionStorage['userInfo']).token + '/questions/survey/:id', {}, {
        query: { method: 'GET', params: {id: '@id'}, isArray: true }
    })
});

app.factory('questionFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + JSON.parse($window.sessionStorage['userInfo']).token + '/questions/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

app.factory('answerFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + JSON.parse($window.sessionStorage['userInfo']).token + '/answers/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});