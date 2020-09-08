'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      /**
       * 1:다 - 1: User(Author)
       * 다:다 - UserComment, HashtagComment
       *
       */

      this.belongsTo(models.User, {
        as: 'Author',
      });
      this.belongsTo(models.Feed, {
        foreignKey: {
          name: 'feedId',
          allowNull: false,
        },
      });
      this.belongsToMany(models.User, {
        through: 'UserComment',
        as: 'CommentLike',
        foreignKey: {
          name: 'commentId',
          allowNull: false,
        },
      });
      this.belongsToMany(models.Hashtag, {
        through: 'HashtagComment',
        foreignKey: { name: 'commentId', allowNull: false },
      });
    }
  }
  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // userId : author
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
      underscored: true,
    },
  );
  return Comment;
};
