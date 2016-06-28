app.factory('surveysFactory', function ($resource) {
	var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NjY5OTU4OTUsImV4cCI6MTQ2NzAzOTA5NX0.1fHKc0sZmcJTcG8rofsYUEPpNjgxqHTJ76mbmV09Zmc";
    return $resource('http://192.168.1.74:3000/api/' + token + '/surveys', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

app.factory('surveyFactory', function ($resource) {
	var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NjY5OTU4OTUsImV4cCI6MTQ2NzAzOTA5NX0.1fHKc0sZmcJTcG8rofsYUEPpNjgxqHTJ76mbmV09Zmc";
    return $resource('http://192.168.1.74:3000/api/' + token + '/surveys/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

app.factory('questionsFactory', function ($resource) {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NjY5OTU4OTUsImV4cCI6MTQ2NzAzOTA5NX0.1fHKc0sZmcJTcG8rofsYUEPpNjgxqHTJ76mbmV09Zmc";
    return $resource('http://192.168.1.74:3000/api/' + token + '/questions/survey/:id', {}, {
        query: { method: 'GET', params: {id: '@id'}, isArray: true }
    })
});

app.factory('questionFactory', function ($resource) {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NjY5OTU4OTUsImV4cCI6MTQ2NzAzOTA5NX0.1fHKc0sZmcJTcG8rofsYUEPpNjgxqHTJ76mbmV09Zmc";
    return $resource('http://192.168.1.74:3000/api/' + token + '/questions/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

app.factory('answerFactory', function ($resource) {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NjY5OTU4OTUsImV4cCI6MTQ2NzAzOTA5NX0.1fHKc0sZmcJTcG8rofsYUEPpNjgxqHTJ76mbmV09Zmc";
    return $resource('http://192.168.1.74:3000/api/' + token + '/answers/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});