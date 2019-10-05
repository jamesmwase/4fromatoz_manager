'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('article_images', {
      id: {
  			type: Sequelize.INTEGER
  			, autoIncrement: true
  			, allowNull: false
  			, primaryKey: true
  		}
  		, articleId: {
  			type: Sequelize.INTEGER
        , allowNull: false
  		}
  		, url: {
        type: Sequelize.STRING
        , allowNull: false
        , unique: true
      }
      , description: {
        type: Sequelize.STRING
        , allowNull: false
      }
      , tags: {
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
    return queryInterface.dropTable('article_images');
  }
};
