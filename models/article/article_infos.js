const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

// CUSTOM MODULES

const ArticleInfos = sequelize.define('article_infos', {
  id: {
    type: Sequelize.INTEGER
    , autoIncrement: true
    , allowNull: false
    , primaryKey: true
  }
  , articleId: {
    type: Sequelize.INTEGER
    , allowNull: false
    , unique: true
  }
  , metaDescription: {
    type: Sequelize.TEXT
    , allowNull: false
  }
  , category: {
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
    , defaultValue: new Date()
  }
}
, {
  timestamps: false
});

module.exports = ArticleInfos;
