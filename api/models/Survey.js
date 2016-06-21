'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database.js');

var Survey = database.define('survey', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
        autoIncrement: true
	},
	name: {
		type: Sequelize.STRING
	},
	active: {
		type: Sequelize.BOOLEAN
	}
}, { 
	createdAt: 'created_at', 
	updatedAt: 'updated_at'
});

module.exports = Survey;