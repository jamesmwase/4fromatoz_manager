'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comment_replies', {
      id: {
        type: Sequelize.INTEGER
        , autoIncrement: true
        , allowNull: false
        , primaryKey: true
      }
      , idMethod: {
        type: Sequelize.STRING(40)
        , allowNull: false
        , defaultValue: 'ip'
      }
      , user: {
        type: Sequelize.STRING(100)
        , allowNull: false
      }
      , commentId: {
        type: Sequelize.INTEGER
        , allowNull: false
      }
      , reply: {
        type: Sequelize.TEXT
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
      , deleted: {
        type: Sequelize.TINYINT
        , allowNull: false
        , defaultValue: 0
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comment_replies');
  }
};
