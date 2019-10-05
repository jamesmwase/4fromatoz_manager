'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contacts', {
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
        , allowNull: false
      }
      , category: {
        type: Sequelize.STRING
        , allowNull: false
      }
      , role: {// role is for specifying if this should be a primary contact method
        type: Sequelize.STRING
        , allowNull: false
      }
      , createdAt: {
        type: Sequelize.DATE
        , allowNull: false
      }
      , updatedAt: {
        type: Sequelize.DATE
        , allowNull: false
      }
      , deleted: {
        type: Sequelize.TINYINT
        , allowNull: false
        , defaultValue: 0
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contacts');
  }
};
