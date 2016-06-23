'use strict';

var NewsletterType = require('./../../models/NewsletterType');

exports.list = function(req, res) {
    NewsletterType.findAll().then(function(newsletterTypes) {
    	return res.status(200).json(newsletterTypes);
    }).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.show = function(req, res) {
	var id = req.params.id;
	NewsletterType.findById(id).then(function(newsletterType) {
		return res.status(200).json(newsletterType);
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.create = function(req, res) {
	NewsletterType.create({
		value: req.body.value
	}).then(function(newsletterType) {
		return res.status(200).json(newsletterType);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	NewsletterType.findById(id).then(function(newsletterType) {
		// Note: If no field sent in request use current value
		var value = req.body.value == null ? newsletterType.get('value') : req.body.value;

		newsletterType.update({
			value: value
		}).then(function(newsletterType) {
			return res.status(200).json(newsletterType);
		});
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};

exports.delete = function(req, res) {
	var id = req.params.id;
	NewsletterType.destroy({ where: { id: id } }).then(function(newsletterType) {
		return res.status(200).json(newsletterType);
	}).catch(function(err) {
        return res.status(500).json({ error: err });
    });
};
