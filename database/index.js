const Sequelize = require('sequelize');
const { dbName, user, pass } = require('../config/db-config');

const sequelize = new Sequelize(dbName, user, pass, {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
