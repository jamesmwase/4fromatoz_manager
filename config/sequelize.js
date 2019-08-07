const express = require('express')
, Sequelize = require('sequelize')
, chalk = require('chalk')
;

const app = express();

/**
 * Connect to a database according to the current node environment e.g. production, test or development
 */

var $CURRENT_DATABASE = null;
switch (app.get('env')) {
  case 'production':
    $CURRENT_DATABASE = 'fromatoz_root';
    break;
  case 'test':
    $CURRENT_DATABASE = 'fromatoz_test';
    break;
  default: // this must be "production environment"
    $CURRENT_DATABASE = 'fromatoz_dev';
    break;
}
exports.sequelize = new Sequelize($CURRENT_DATABASE, 'root', 'skdi_^&)98w8HGAS', {
  host: 'localhost',
  dialect: 'mysql'
});
console.log(chalk.yellow('CURRENT DATABASE NAME: ' + $CURRENT_DATABASE));
