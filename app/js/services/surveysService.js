/*
    SURVEYS
*/
app.factory('surveysFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/survey/getallesurvey/aa', {}, {
        show: { method: 'GET', isArray: true }
    })
});

app.factory('surveyFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/survey/getobjectesurvey/:id', {}, {
        show: { method: 'GET' }
    })
});

app.factory('updateSurveyFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/survey/updateesurvey/:SurveyKey/:Survey/:Current', {}, {
        update: { method: 'GET' }
    })
});

app.factory('deleteSurveyFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/survey/deletesurveycascade/:id', {}, {
        delete: { method: 'GET', params: {id: '@id'} }
    })
});

app.factory('addSurveyFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/survey/addesurvey/:Survey/:Current', {}, {
        add: { method: 'GET' }
    })
});

/*
    QUESTIONS
*/
app.factory('questionsFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/equestion/getequestionsfk/:id', {}, {
        show: { method: 'GET', params: {id: '@id'}, isArray: true }
    })
});

app.factory('updateQuestionFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/equestion/updateequestion/:QuestionKey/:SurveyLink/:TypeQuestion/:Question/:Help/:Min/:Max/:TextMin/:TextMax', {}, {
        update: { method: 'GET' }
    })
});

app.factory('addQuestionFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/equestion/addequestion/:SurveyLink/:TypeQuestion/:Question/:Help/:Min/:Max/:TextMin/:TextMax', {}, {
        add: { method: 'GET' }
    })
});

app.factory('deleteQuestionFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/equestion/deleteequestion/:id', {}, {
        delete: { method: 'GET', params: {id: '@id'} }
    })
});

/* 
    ANSWERS 
*/
app.factory('answersFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/eoption/getfkeoption/:id', {}, {
        show: { method: 'GET', params: {id: '@id'}, isArray: true }
    })
});

app.factory('updateAnswerFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/eoption/updateeoption/:OptionKey/:QuestionLink/:Option', {}, {
        update: { method: 'GET' }
    })
});

app.factory('addAnswerFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/eoption/addeoption/:QuestionLink/:Option', {}, {
        add: { method: 'GET' }
    })
});

app.factory('deleteAnswerFactory', function ($resource, $window) {
    return $resource( $window.baseUrlSurveys + 'udg/eoption/deleteoptionsofquestion/:id', {}, {
        delete: { method: 'GET', params: {id: '@id'} }
    })
});