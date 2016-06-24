'use strict';

var Newsletter = require('./../../models/Newsletter');
var NewsletterType = require('./../../models/NewsletterType');

exports.list = function(req, res) {
	Newsletter.findAll({ include: [{ model: NewsletterType, as: 'newsletter_type' }]}).then(function(newsletters) {
		return res.status(200).json(newsletters);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	Newsletter.findById(id, { include: [{ model: NewsletterType, as: 'newsletter_type' }]}).then(function(newsletter) {
		return res.status(200).json(newsletter);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.create = function(req, res) {
	Newsletter.create({
		type: req.body.type,
		name: req.body.name,
    value: req.body.value,
    likes: 0
	}).then(function(newsletter) {
		return res.status(200).json(newsletter);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	Newsletter.findById(id).then(function(newsletter) {
		var type = req.body.type == null ? newsletter.get('type') : req.body.type;
		var name = req.body.name == null ? newsletter.get('name') : req.body.name;
    var value = req.body.value == null ? newsletter.get('value') : req.body.value;
		var likes = req.body.likes == null ? newsletter.get('likes') : req.body.likes;

		newsletter.update({
			type: type,
			name: name,
			value: value,
      likes: likes
		}).then(function(newsletter) {
			return res.status(200).json(newsletter);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	Newsletter.destroy({ where: { id: id } }).then(function(newsletter) {
		return res.status(200).json(newsletter);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};
