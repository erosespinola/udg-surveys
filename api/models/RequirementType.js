'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database.js');

var RequirementType = database.define('requirement_type', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
  value: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = RequirementType;
