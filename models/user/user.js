const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER
    , autoIncrement: true
    , allowNull: false
    , primaryKey: true
  }
  , fname: {
    type: Sequelize.STRING(30)
    , allowNull: false
  }
  , lname: {
    type: Sequelize.STRING(30)
    , allowNull: false
  }
  , username: {
    type: Sequelize.STRING(40)
    , allowNull: false
    , unique: true
  }
  , role: {
    type: Sequelize.STRING
    , allowNull: false
    , defaultValue: 'user'
  }
  , birthDate: {
    type: Sequelize.DATEONLY
    , allowNull: false
  }
  , sex: {
    type: Sequelize.STRING(6)
    , allowNull: false
  }
  , createdAt: {
    type: Sequelize.DATE
    , allowNull: false
    , defaultValue: new Date()
  }
  , updatedAt: {
    type: Sequelize.DATE
    , allowNull: false
    , defaultValue: new Date()
  }
});

module.exports = User;
