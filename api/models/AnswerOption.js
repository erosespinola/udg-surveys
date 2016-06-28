'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database');
var Question = require('./Question');

var AnswerOption = database.define('answer_option', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	value: {
		type: Sequelize.STRING
	},
    min: {
		type: Sequelize.INTEGER
	},
    max: {
		type: Sequelize.INTEGER
	},
    question: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false
});

AnswerOption.belongsTo(Question, {
	foreignKey: 'question',
	as: 'questionType'
})


module.exports = AnswerOption;