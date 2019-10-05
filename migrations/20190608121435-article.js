'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('articles', {
      id: {
        type: Sequelize.INTEGER
        , autoIncrement: true
        , allowNull: false
        , primaryKey: true
      }
      , urlId: {
        type: Sequelize.STRING
        , allowNull: false
        , unique: true
      }
      , author: {
        type: Sequelize.INTEGER
        , allowNull: false
      }
      , title: {
        type: Sequelize.STRING
        , allowNull: false
      }
      , intro: { // article introduction
        type: Sequelize.TEXT
        , allowNull: false
      }
      , body: {
        type: Sequelize.TEXT
        , allowNull: false
      }
      , visible: {
        type: Sequelize.TINYINT
        , allowNull: false
        , defaultValue: 0
      }
      , hasCode: {
        type: Sequelize.TINYINT
        , allowNull: false
        , defaultValue: 0
      }
      , tutorialId: {
        type: Sequelize.INTEGER
        , allowNull: false
        , defaultValue: 0
      }
      , views: {
        type: Sequelize.INTEGER
        , allowNull: false
        , defaultValue: 0
      }
      , votes: {
        type: Sequelize.INTEGER
        , allowNull: false
        , defaultValue: 0
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
    return queryInterface.dropTable('articles');
  }
};
