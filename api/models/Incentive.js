'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database.js');

var Survey = database.define('incentive', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
        autoIncrement: true
	},
    startAt: {
        type: Sequelize.DATE
    },
    endAt: {
        type: Sequelize.DATE
    },
    type: {
        type: Sequelize.INTEGER
    },
	active: {
		type: Sequelize.BOOLEAN
	}
}, { 
	createdAt: 'created_at', 
	updatedAt: 'updated_at'
});

module.exports = Survey;