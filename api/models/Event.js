'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database');
var EventType = require('./EventType');

var Event = database.define('event', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.INTEGER
  },
  likes: {
    type: Sequelize.INTEGER
  }
}, {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

Event.belongsTo(EventType, {
	foreignKey: 'type',
	as: 'eventType'
});

module.exports = Event;
