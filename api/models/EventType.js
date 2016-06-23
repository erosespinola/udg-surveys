'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database.js');

var EventType = database.define('event_type', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
  value: {
    type: Sequelize.STRING
  }
}, {
	timestamps: false
});

module.exports = EventType;
