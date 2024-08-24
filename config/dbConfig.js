const Sequelize = require('sequelize');

const sequelize = new Sequelize('scheduler_db', 'root', 'Venkatpatamsetti1729@', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
