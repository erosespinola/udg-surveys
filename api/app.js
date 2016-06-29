'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var secret = 'udgsurveysapi';

var app = express();
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  	next();
});

app.use('/api/login', require('./routes/login'));

app.all('/api/:token/*', function(req, res, next) {
    var token = req.params.token;
    if (token) {
    	jwt.verify(token, secret, function(err, decoded) {      
			if (err) { 
				return res.send(401);
			} else {
				req.decoded = decoded;    
				next();
			}
		});
    } else {
		return res.sendStatus(401);
	}
});

app.use('/api/:token/surveys', require('./routes/surveys'));
app.use('/api/:token/incentives', require('./routes/incentives'));
app.use('/api/:token/newsletters', require('./routes/newsletters'));
app.use('/api/:token/events', require('./routes/events'));
app.use('/api/:token/users', require('./routes/users'));
app.use('/api/:token/questions', require('./routes/questions'));
app.use('/api/:token/answer-options', require('./routes/answer-options'));

app.use('/api/:token/incentive-types', require('./routes/incentive-types'));
app.use('/api/:token/event-types', require('./routes/event-types'));
app.use('/api/:token/requirement-types', require('./routes/requirement-types'));
app.use('/api/:token/newsletter-types', require('./routes/newsletter-types'));

app.use('/api/:token/system-status', require('./routes/system-status'));
app.use('/api/:token/contact', require('./routes/contact'));

// Catch 404 and forward to error handler
app.route('/*').get(function(req, res) {
    return res.send(404);
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
