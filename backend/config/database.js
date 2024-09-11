const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prova_backend', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
