'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database');

var Contact = database.define('contact', {
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
    freezeTableName: true,
	timestamps: false
});

module.exports = Contact;
