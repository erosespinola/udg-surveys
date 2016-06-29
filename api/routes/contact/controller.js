'use strict';

var Contact = require('./../../models/Contact');

exports.show = function(req, res) {
	Contact.findAll().then(function(contacts) {
		return res.status(200).json(contacts[0]);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	Contact.findAll().then(function(contacts) {
        var contact = contacts[0];
		var value = req.body.value == null ? contact.get('value') : req.body.value;

		contact.update({
			value: value
		}).then(function(contact) {
			return res.status(200).json(contact);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};