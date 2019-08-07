const app = express()
, Sequelize = require('sequelize')

// Option 1: Passing parameters separately
switch (app.get('env')) {
  case 'production':
    console.log(app.get('env'));
    break;
  case 'development':
    console.log(app.get('env'));
    break;
  case 'test':
    console.log(app.get('env'));
    break;
  default:
    console.log(app.get('env'));
    break;
}
exports.sequelize = new Sequelize('fromatoz_root', 'root', 'skdi_^&)98w8HGAS', {
  host: 'localhost',
  dialect: 'mysql'
});
