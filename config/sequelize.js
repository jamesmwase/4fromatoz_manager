const express = require('express')
, Sequelize = require('sequelize')
;

const app = express();

// Option 1: Passing parameters separately
var $CURRENT_DATABASE = null;
switch (app.get('env')) {
  case 'production':
    console.log(app.get('env'));
    $CURRENT_DATABASE = app.get('env');
    break;
  case 'test':
    $CURRENT_DATABASE = app.get('env');
    console.log(app.get('env'));
    break;
  default: // this must be "production environment"
    $CURRENT_DATABASE = app.get('env');
    console.log(app.get('env'));
    break;
}
exports.sequelize = new Sequelize($CURRENT_DATABASE, 'root', 'skdi_^&)98w8HGAS', {
  host: 'localhost',
  dialect: 'mysql'
});
console.console.log('CURRENT DATABASE NAME: ' + $CURRENT_DATABASE);
