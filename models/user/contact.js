const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

// CUSTOM MODULES

const Contact = sequelize.define('contacts', {
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
  , contact: {
    type: Sequelize.STRING
  }
  , category: {
    type: Sequelize.STRING(40)
  }
  , role: {// role is for specifying if this should be a primary contact method
    type: Sequelize.STRING(10)
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
  , deleted: {
    type: Sequelize.TINYINT
    , allowNull: false
    , defaultValue: 0
  }
}
, {
  timestamps: false
});

module.exports = Contact;
