const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

// CUSTOM MODULES

const ArticleImage = sequelize.define('article_images', {
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
  }
  , description: {
    type: Sequelize.STRING
    , allowNull: false
  }
  , tags: {
    type: Sequelize.STRING
    , allowNull: false
  }
}
, {
  timestamps: false
});

module.exports = ArticleImage;
