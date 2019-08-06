const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

// CUSTOM MODULES

const ConfirmAccount = sequelize.define('confirm_accounts', {
  id: {
    type: Sequelize.INTEGER
    , autoIncrement: true
    , allowNull: false
    , primaryKey: true
  }
  , contactId: {
    type: Sequelize.INTEGER
    , allowNull: false
  }
  , activationKey: {
    type: Sequelize.STRING
    , allowNull: false
  }
  , failedAttempt: {
    type: Sequelize.INTEGER
    , allowNull: false
    , defaultValue: 0
  }
  , expiration: {
    type: Sequelize.DATE
    , allowNull: false
    , defaultValue: new Date()
  }
  , createdAt: {
    type: Sequelize.DATE
    , allowNull: false
    , defaultValue: new Date()
  }
});

module.exports = ConfirmAccount;
