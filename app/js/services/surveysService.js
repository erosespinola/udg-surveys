/*
    SURVEYS
*/
app.factory('surveysFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/surveys/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

app.factory('surveyFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/surveys/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

/*
    QUESTIONS
*/

app.factory('questionsFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/questions/survey/:id', {}, {
        query: { method: 'GET', params: {id: '@id'}, isArray: true }
    })
});

app.factory('questionFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/questions/:id', {}, {
        show: { method: 'GET' },
        create: { method: 'POST' },
        // Bulk update
        update: { method: 'PUT' },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

/* 
    ANSWERS 
*/

app.factory('answersFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/answer-options/question/:id', {}, {
        show: { method: 'GET', params: {id: '@id'} },
    })
});

app.factory('answerFactory', function ($resource, $window) {
    return $resource( $window.baseUrl + 'api/' + localStorage.token + '/answer-options/:id', {}, {
        //show: { method: 'GET', params: {id: '@id'} },
        create: { method: 'POST' },
        // Bulk update
        update: { method: 'PUT' },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});