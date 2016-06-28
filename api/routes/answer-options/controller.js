'use strict';

var AnswerOption = require('./../../models/AnswerOption');
var Question = require('./../../models/Question');

exports.list = function(req, res) {
	AnswerOption.findAll({ where: { question: req.params.id }, include: [{ model: Question, as: 'questionType' }]}).then(function(answerOptions) {
		return res.status(200).json(answerOptions);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	AnswerOption.findById(id, { include: [{ model: Question, as: 'questionType' }]}).then(function(answerOption) {
		return res.status(200).json(answerOption);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.create = function(req, res) {
	AnswerOption.create({
		value: req.body.value,
        min: req.body.min,
        max: req.body.max,
        question: req.body.question
	}).then(function(answerOption) {
		return res.status(200).json(answerOption);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	AnswerOption.findById(id).then(function(answerOption) {
		var value = req.body.value == null ? answerOption.get('value') : req.body.value;
        var min = req.body.min == null ? answerOption.get('min') : req.body.min;
        var max = req.body.max == null ? answerOption.get('max') : req.body.max;
        var question = req.body.question == null ? answerOption.get('question') : req.body.question;
        
		answerOption.update({
			value: value,
            min: min,
            max: max,
            question: question
		}).then(function(answerOption) {
			return res.status(200).json(answerOption);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	AnswerOption.destroy({ where: { id: id }}).then(function(answerOption) {
		return res.status(200).json(answerOption);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};
