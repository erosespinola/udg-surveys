'use strict';

var RequirementType = require('./../../models/RequirementType');

exports.list = function(req, res) {
    RequirementType.findAll().then(function(requirementTypes) {
    	return res.status(200).json(requirementTypes);
    }).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.show = function(req, res) {
	var id = req.params.id;
	RequirementType.findById(id).then(function(requirementType) {
		return res.status(200).json(requirementType);
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.create = function(req, res) {
	RequirementType.create({
		value: req.body.value
	}).then(function(requirementType) {
		return res.status(200).json(requirementType);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	RequirementType.findById(id).then(function(requirementType) {
		// Note: If no field sent in request use current value
		var value = req.body.value == null ? requirementType.get('value') : req.body.value;

		requirementType.update({
			value: value
		}).then(function(requirementType) {
			return res.status(200).json(requirementType);
		});
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.delete = function(req, res) {
	var id = req.params.id;
	RequirementType.destroy({ where: { id: id } }).then(function(requirementType) {
		return res.status(200).json(requirementType);
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};
