app.factory('surveysFactory', function ($resource) {
    return $resource('http://192.168.1.74:3000/api/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NjY5OTU4OTUsImV4cCI6MTQ2NzAzOTA5NX0.1fHKc0sZmcJTcG8rofsYUEPpNjgxqHTJ76mbmV09Zmc/surveys', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

app.factory('surveyFactory', function ($resource) {
    return $resource('/api/surveys/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});