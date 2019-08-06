const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
exports.sequelize = new Sequelize('fromatoz_dev', 'root', 'DFLKYWrttddr#@(&%^$);<>?/3208645', {
  host: 'localhost',
  dialect: 'mysql'
});
