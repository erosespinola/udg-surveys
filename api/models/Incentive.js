'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database');
var IncentiveType = require('./IncentiveType');
var RequirementType = require('./RequirementType');

var Incentive = database.define('incentive', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	startAt: {
		type: Sequelize.DATE,
		field: 'start_at'
	},
	endAt: {
		type: Sequelize.DATE,
		field: 'end_at'
	},
	type: {
		type: Sequelize.INTEGER
	},
	requirement: {
		type: Sequelize.INTEGER
	},
	active: {
		type: Sequelize.BOOLEAN
	},
	comments: {
		type: Sequelize.STRING
	}
}, {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

Incentive.belongsTo(IncentiveType, {
	foreignKey: 'type',
	as: 'incentive_type'
});

Incentive.belongsTo(RequirementType, {
	foreignKey: 'type',
	as: 'requirement_type'
})

module.exports = Incentive;
