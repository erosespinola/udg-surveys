'use strict';

var Incentive = require('./../../models/Incentive');
var IncentiveType = require('./../../models/IncentiveType');
var RequirementType = require('./../../models/RequirementType');

exports.list = function(req, res) {
	Incentive.findAll({ include: [{ model: IncentiveType, as: 'incentive_type' }, {model: RequirementType, as: 'requirement_type'}]}).then(function(incentives) {
		return res.status(200).json(incentives);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	Incentive.findById(id, { include: [{ model: IncentiveType, as: 'incentive_type' }, {model: RequirementType, as: 'requirement_type'}]}).then(function(incentive) {
		return res.status(200).json(incentive);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.create = function(req, res) {
	Incentive.create({
		startAt: req.body.startAt,
		endAt: req.body.endAt,
		type: req.body.type,
		active: req.body.active,
		requirement: req.body.requirement,
		comments: req.body.comments
	}).then(function(incentive) {
		return res.status(200).json(incentive);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	Incentive.findById(id).then(function(incentive) {
		var active = req.body.active == null ? incentive.get('active') : req.body.active;
		var type = req.body.type == null ? incentive.get('type') : req.body.type;
		var requirement = req.body.requirement == null ? incentive.get('requirement') : req.body.requirement;
		var comments = req.body.comments == null ? incentive.get('comments') : req.body.comments;
		var startAt = req.body.startAt == null ? incentive.get('startAt'): req.body.startAt;
		var endAt = req.body.endAt == null ? incentive.get('endAt'): req.body.endAt;

		incentive.update({
			startAt: startAt,
			endAt: endAt,
			type: type,
			active: active,
			requirement: requirement,
			comments: comments
		}).then(function(incentive) {
			return res.status(200).json(incentive);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	Incentive.destroy({ where: { id: id } }).then(function(incentive) {
		return res.status(200).json(incentive);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};
