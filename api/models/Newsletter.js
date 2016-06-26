'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database');
var NewsletterType = require('./NewsletterType');

var Newsletter = database.define('newsletter', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING
	},
  value: {
    type: Sequelize.STRING
  },
  likes: {
    type: Sequelize.INTEGER
  },
	type: {
		type: Sequelize.INTEGER
	}
}, {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

Newsletter.belongsTo(NewsletterType, {
	foreignKey: 'type',
	as: 'newsletter_type'
});

module.exports = Newsletter;
