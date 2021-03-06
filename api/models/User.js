'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database');

var User = database.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	user: {
		type: Sequelize.STRING,
		unique: true
	},
	role: {
		type: Sequelize.INTEGER
	},
	firstName: {
		type: Sequelize.STRING,
		field: 'first_name'
	},
	lastName: {
		type: Sequelize.STRING,
		field: 'last_name'
	},
	password: {
		type: Sequelize.STRING
	}
}, {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = User;
