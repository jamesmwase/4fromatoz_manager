const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

const Comment = sequelize.define('comments', {
  id: {
    type: Sequelize.INTEGER
    , autoIncrement: true
    , allowNull: false
    , primaryKey: true
  }
  , idMethod: {
    type: Sequelize.STRING(30)
    , allowNull: false
  }
  , user: {
    type: Sequelize.STRING(100)
    , allowNull: false
  }
  , urlId: {
    type: Sequelize.STRING
    , allowNull: false
  }
  , comment: {
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
});

module.exports = Comment;
