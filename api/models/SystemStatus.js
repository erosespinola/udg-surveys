'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database');

var SystemStatus = database.define('system_status', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	value: {
		type: Sequelize.BOOLEAN
	}
}, {
    freezeTableName: true,
	timestamps: false
});

module.exports = SystemStatus;
