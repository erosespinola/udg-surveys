'use strict';

var EventType = require('./../../models/EventType');

exports.list = function(req, res) {
	EventType.findAll().then(function(eventTypes) {
		return res.status(200).json(eventTypes);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	EventType.findById(id).then(function(eventType) {
		return res.status(200).json(eventType);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.create = function(req, res) {
	EventType.create({
		value: req.body.value
	}).then(function(eventType) {
		return res.status(200).json(eventType);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	EventType.findById(id).then(function(eventType) {
		var value = req.body.value == null ? eventType.get('value') : req.body.value;

		eventType.update({
			value: value
		}).then(function(eventType) {
			return res.status(200).json(eventType);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	EventType.destroy({ where: { id: id } }).then(function(eventType) {
		return res.status(200).json(eventType);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};
