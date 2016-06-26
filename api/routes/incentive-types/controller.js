'use strict';

var IncentiveType = require('./../../models/IncentiveType');

exports.list = function(req, res) {
	IncentiveType.findAll().then(function(incentiveTypes) {
		return res.status(200).json(incentiveTypes);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	IncentiveType.findById(id).then(function(incentiveType) {
		return res.status(200).json(incentiveType);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.create = function(req, res) {
	IncentiveType.create({
		value: req.body.value
	}).then(function(incentiveType) {
		return res.status(200).json(incentiveType);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	IncentiveType.findById(id).then(function(incentiveType) {
		var value = req.body.value == null ? incentiveType.get('value') : req.body.value;

		incentiveType.update({
			value: value
		}).then(function(incentiveType) {
			return res.status(200).json(incentiveType);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	IncentiveType.destroy({ where: { id: id } }).then(function(incentiveType) {
		return res.status(200).json(incentiveType);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};
