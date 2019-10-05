const Sequelize = require('sequelize');
var sequelize = require('../../config/sequelize').sequelize;

const CommentReply = sequelize.define('comment_replies', {
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
});

module.exports = CommentReply;
