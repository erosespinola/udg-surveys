'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database');
var Survey = require('./Survey');

var Question = database.define('question', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	question: {
		type: Sequelize.STRING
	},
    help: {
		type: Sequelize.STRING
	},
	survey: {
		type: Sequelize.INTEGER
	},
    type: {
		type: Sequelize.INTEGER
	}
}, { 
	createdAt: 'created_at', 
	updatedAt: 'updated_at'
});

Question.belongsTo(Survey, {
	foreignKey: 'survey',
	as: 'surveyType'
});

module.exports = Question;