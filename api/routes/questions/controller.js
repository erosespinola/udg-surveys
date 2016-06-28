'use strict';

var Question = require('./../../models/Question');
var Survey = require('./../../models/Survey');

exports.list = function(req, res) {
	Question.findAll({ where: { survey: req.params.id }, include: [{ model: Survey, as: 'surveyType' }]}).then(function(questions) {
		return res.status(200).json(questions);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	Question.findById(id, { include: [{ model: Survey, as: 'surveyType' }]}).then(function(question) {
		return res.status(200).json(question);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.create = function(req, res) {
	Question.create({
		type: req.body.type,
		question: req.body.question,
    	help: req.body.help,
        survey: req.body.survey
	}).then(function(question) {
		return res.status(200).json(question);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;

	Question.findById(id).then(function(question) {
		var type = req.body.type == null ? question.get('type') : req.body.type;
		var value = req.body.question == null ? question.get('question') : req.body.question;
    	var help = req.body.help == null ? question.get('help') : req.body.help;
		var survey = req.body.survey == null ? question.get('survey') : req.body.survey;
        
		question.update({
			type: type,
		    question: value,
    	    help: help,
            survey: survey
		}).then(function(question) {
			return res.status(200).json(question);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.bulkUpdate = function(req, res) {
    
};

exports.delete = function(req, res) {
	var id = req.params.id;
	Question.destroy({ where: { id: id }}).then(function(question) {
		return res.status(200).json(question);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};
