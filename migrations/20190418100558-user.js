'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER
        , autoIncrement: true
        , allowNull: false
        , primaryKey: true
      }
      , fname: {
        type: Sequelize.STRING(32)
        , allowNull: false
      }
      , lname: {
        type: Sequelize.STRING(32)
        , allowNull: false
      }
      , username: {
        type: Sequelize.STRING
        , allowNull: false
        , unique: true
      }
      , role: {
        type: Sequelize.STRING
        , allowNull: false
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
      return queryInterface.dropTable('users');
  }
};
