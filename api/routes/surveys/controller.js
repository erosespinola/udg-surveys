'use strict';

var Survey = require('./../../models/Survey');

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
		return res.status(200).json(survey);
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.update = function(req, res) {
	var id = req.params.id;
	Survey.findById(id).then(function(survey) {
		// Note: If no field sent in request use current value
		var name = req.body.name == null ? survey.get('name') : req.body.name;
		var active = req.body.active == null ? survey.get('active') : req.body.active;

		survey.update({
			name: name,
			active: active
		}).then(function(survey) {
			return res.status(200).json(survey);
		});
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.delete = function(req, res) {
	var id = req.params.id;
	Survey.destroy({ where: { id: id } }).then(function(survey) {
		return res.status(200).json(survey);
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};
