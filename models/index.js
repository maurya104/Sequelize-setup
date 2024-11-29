const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models here
db.User = require('./user')(sequelize, Sequelize);
db.Url = require('./url')(sequelize, Sequelize);

module.exports = db;
