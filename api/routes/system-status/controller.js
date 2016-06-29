'use strict';

var SystemStatus = require('./../../models/SystemStatus');

exports.show = function(req, res) {
	SystemStatus.findAll().then(function(systemStatus) {
		return res.status(200).json(systemStatus[0]);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	SystemStatus.findAll().then(function(systemStatus) {
        var status = systemStatus[0];
		var value = req.body.value == null ? status.get('value') : req.body.value;

		status.update({
			value: value
		}).then(function(status) {
			return res.status(200).json(status);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};