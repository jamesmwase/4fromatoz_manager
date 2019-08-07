const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
switch (NODE_ENV) {
  case 'production':
    console.log(NODE_ENV);
    break;
  case 'development':
    console.log(NODE_ENV);
    break;
  case 'test':
    console.log(NODE_ENV);
    break;
  default:
    console.log(NODE_ENV);
    break;
}
exports.sequelize = new Sequelize('fromatoz_root', 'root', 'skdi_^&)98w8HGAS', {
  host: 'localhost',
  dialect: 'mysql'
});
