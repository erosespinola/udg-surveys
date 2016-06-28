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
        
		answerOption.update({
			value: value,
            min: min,
            max: max
		}).then(function(answerOption) {
			return res.status(200).json(answerOption);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.bulkUpdate = function(req, res) {
    for (var i = 0; i < req.body.answerOptions.length; i++) {
        (function(i) {
            AnswerOption.findById(req.body.answerOptions[i].id).then(function(answerOption) {
                var value = req.body.answerOptions[i].value == null ? answerOption.get('value') : req.body.answerOptions[i].value;
                var min = req.body.answerOptions[i].min == null ? answerOption.get('min') : req.body.answerOptions[i].min;
                var max = req.body.answerOptions[i].max == null ? answerOption.get('max') : req.body.answerOptions[i].max;
                        
                answerOption.update({
                    value: value,
                    min: min,
                    max: max
                }).catch(function(err) {
                    return res.status(500).json({ error: err });
                });
            }).catch(function(err) {
                return res.status(500).json({ error: err });
            });
        })(i);
    }
    return res.status(200).json(true);
};

exports.delete = function(req, res) {
	var id = req.params.id;
	AnswerOption.destroy({ where: { id: id }}).then(function(answerOption) {
		return res.status(200).json(answerOption);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};
