'use strict';

var Incentive = require('./../../models/Incentive');

exports.list = function(req, res) {
    Incentive.findAll().then(function(incentives) {
    	return res.status(200).json(incentives);
    }).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.show = function(req, res) {
	var id = req.params.id;
	Incentive.findById(id).then(function(incentive) {
		return res.status(200).json(incentive);
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.create = function(req, res) {
	Incentive.create({ 
		active: req.body.active,
        startAt: req.body.startAt,
        endAt: req.body.endAt
	}).then(function(incentive) {
		return res.status(200).json(incentive);
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.update = function(req, res) {
	var id = req.params.id;
	Incentive.findById(id).then(function(incentive) {
		// Note: If no field sent in request use current value
		var active = req.body.active == null ? incentive.get('active') : req.body.active;
        var startAt = req.body.startAt == null ? incentive.get('startAt'): req.body.startAt;
        var startAt = req.body.endAt == null ? incentive.get('endAt'): req.body.endAt;
		
		incentive.update({
			active: active,
            startAt: startAt,
            endAt: endAt
		}).then(function(incentive) {
			return res.status(200).json(incentive);
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
