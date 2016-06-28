'use strict';

var Survey = require('./../../models/Survey');
var Question = require('./../../models/Question');
var AnswerOption = require('./../../models/AnswerOption');

exports.list = function(req, res) {
	Survey.findAll().then(function(surveys) {
		return res.status(200).json(surveys);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	Survey.findById(id).then(function(survey) {
		return res.status(200).json(survey);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.create = function(req, res) {
	Survey.create({
		name: req.body.name,
		active: req.body.active
	}).then(function(survey) {
		if (req.body.questions) {
			createQuestions(req.body.questions, survey.id);
		}
		return res.status(200).json(survey);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	Survey.findById(id).then(function(survey) {
		var name = req.body.name == null ? survey.get('name') : req.body.name;
		var active = req.body.active == null ? survey.get('active') : req.body.active;

		survey.update({
			name: name,
			active: active
		}).then(function(survey) {
			return res.status(200).json(survey);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	Survey.destroy({ where: { id: id }}).then(function(survey) {
		return res.status(200).json(survey);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

var createQuestions = function(questions, surveyId) {
	for (var i = 0; i < questions.length; i++) { 
		(function(i) {
			Question.create({
				type: questions[i].type,
				question: questions[i].question,
				help: questions[i].help,
				survey: surveyId
			}).then(function(question) {
				if (questions[i].answerOptions) {
					createAnswerOptions(questions[i].answerOptions, question.id);
				}
			}).catch(function(err) {
				return res.status(500).json({ error: err });
			});
		})(i);
	}
};

var createAnswerOptions = function(answerOptions, questionId) {
	for (var j = 0; j < answerOptions.length; j++) {
		(function(j) {
			AnswerOption.create({
				value: answerOptions[j].value,
				min: answerOptions[j].min,
				max: answerOptions[j].max,
				question: questionId
			}).catch(function(err) {
				return res.status(500).json({ error: err });
			});
		})(j);
	}
};
