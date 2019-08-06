const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

// CUSTOM MODULES

const ArticleCategory = sequelize.define('article_categories', {
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
  , category: {
    type: Sequelize.STRING(70)
    , unique: true
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

module.exports = ArticleCategory;
