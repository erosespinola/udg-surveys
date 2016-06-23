'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/login', require('./routes/login'));
app.use('/api/surveys', require('./routes/surveys'));
app.use('/api/incentives', require('./routes/incentives'));
app.use('/api/users', require('./routes/users'));
app.use('/api/incentive_types', require('./routes/incentive_types'));
app.use('/api/event_types', require('./routes/event_types'));
app.use('/api/requirement_types', require('./routes/requirement_types'));
app.use('/api/newsletter_types', require('./routes/newsletter_types'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
