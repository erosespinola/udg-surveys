var Sequelize = require('sequelize');

var database = new Sequelize('udg_surveys', 'root', '(Chuckrules19)', {
	host: '127.0.0.1',
	port: 3306,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

module.exports = database;