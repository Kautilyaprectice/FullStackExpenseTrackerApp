const Sequelize = require('sequelize');

const sequelize = new Sequelize('expensetracker', 'root' , 'Kautilya@1', {dialect: 'mysql' , host: 'localhost'});

module.exports = sequelize;