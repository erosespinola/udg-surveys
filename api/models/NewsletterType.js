'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database');

var NewsletterType = database.define('newsletter_type', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	value: {
		type: Sequelize.STRING
	}
}, {
	timestamps: false
});

module.exports = NewsletterType;
