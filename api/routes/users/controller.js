'use strict';

var User = require('./../../models/User');

exports.list = function(req, res) {
	User.findAll().then(function(users) {
		return res.status(200).json(users);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	User.findById(id).then(function(user) {
		return res.status(200).json(user);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.create = function(req, res) {
	User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		user: req.body.user,
		password: req.body.password,
		role: req.params.role
	}).then(function(user) {
		return res.status(200).json(user);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	User.findById(id).then(function(user) {
		var username = req.body.user == null ? user.get('user') : req.body.user;
		var firstName = req.body.firstName == null ? user.get('firstName') : req.body.firstName;
		var lastName = req.body.lastName == null ? user.get('lastName') : req.body.lastName;
		var password = req.body.password == null ? user.get('password') : req.body.password;
		var role = req.body.role == null ? user.get('role') : req.body.role;
		user.update({
			user: username,
			firstName: firstName,
			lastName: lastName,
			password: password,
			role: role
		}).then(function(user) {
			return res.status(200).json(user);
		}).catch(function(err) {
			return res.status(500).json({ error: err });
		});
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	User.destroy({ where: { id: id } }).then(function(user) {
		return res.status(200).json(user);
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
};
