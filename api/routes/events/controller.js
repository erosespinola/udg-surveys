'use strict';

var Event = require('./../../models/Event');
var EventType = require('./../../models/EventType');

exports.list = function(req, res) {
	Event.findAll({ include: [{ model: EventType, as: 'event_type' }]}).then(function(events) {
		return res.status(200).json(events);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	Event.findById(id, { include: [{ model: EventType, as: 'event_type' }]}).then(function(event) {
		return res.status(200).json(event);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.create = function(req, res) {
	Event.create({
		type: req.body.type,
    name: req.body.name,
    description: req.body.description,
    likes: 0
	}).then(function(event) {
		return res.status(200).json(event);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	Event.findById(id).then(function(event) {
		var type = req.body.type == null ? event.get('type') : req.body.type;
    var name = req.body.name == null ? event.get('name') : req.body.name;
    var description = req.body.description == null ? event.get('description') : req.body.description;
		var likes = req.body.likes == null ? event.get('likes') : req.body.likes;

		event.update({
			type: type,
			name: name,
      description: description,
      likes: likes
		}).then(function(event) {
			return res.status(200).json(event);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	Event.destroy({ where: { id: id } }).then(function(event) {
		return res.status(200).json(event);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};
