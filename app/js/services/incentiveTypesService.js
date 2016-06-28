app.factory('incentiveTypesFactory', function ($resource) {
	var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NjY5OTU4OTUsImV4cCI6MTQ2NzAzOTA5NX0.1fHKc0sZmcJTcG8rofsYUEPpNjgxqHTJ76mbmV09Zmc";
    return $resource('http://192.168.1.74:3000/api/' + token + '/incentive-types/', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});