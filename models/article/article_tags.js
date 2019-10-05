const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

// CUSTOM MODULES

const ArticleTag = sequelize.define('article_tags', {
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
    type: Sequelize.STRING
    , allowNull: false
  }
  , tag: {
    type: Sequelize.STRING(100)
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
});

module.exports = ArticleTag;
