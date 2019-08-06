const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

const Article = sequelize.define('articles', {
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
    , defaultValue: 1
  }
  , votes: {
    type: Sequelize.INTEGER
    , allowNull: false
    , defaultValue: 1
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

module.exports = Article;
