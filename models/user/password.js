const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

const Password = sequelize.define('passwords', {
  id: {
    type: Sequelize.INTEGER
    , autoIncrement: true
    , allowNull: false
    , primaryKey: true
  }
  , userId: {
    type: Sequelize.INTEGER
    , allowNull: false
  }
  , password: {
    type: Sequelize.STRING(50)
    , allowNull: false
  }
}
, {
  timestamps: false
});

module.exports = Password;
