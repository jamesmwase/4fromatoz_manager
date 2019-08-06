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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('article_images');
  }
};
