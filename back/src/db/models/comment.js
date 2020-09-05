'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      /**
       * 1:다 - 1: User(Author)
       * 다:다 - UserComment, HashtagComment
       */
      this.hasMany(models.HashtagComment, {
        foreignKey: 'commentId',
      });
      this.belongsTo(models.User, {
        // constraints: false,
        onDelete: 'CASCADE',
        as: 'Author',
        foreignKey: {
          name: 'authorId',
          allowNull: false,
        },
      });
      this.belongsTo(models.Feed, {
        // constraints: false,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'feedId',
          allowNull: false,
        },
      });
      this.belongsToMany(models.User, {
        through: 'UserComment',
        foreignKey: 'commentId',
        // allowNull: false,
        // onDelete: 'CASCADE',
        // constraints: false,
      });
      this.belongsToMany(models.Hashtag, {
        through: 'HashtagComment',
        foreignKey: 'commentId',
        // allowNull: false,
        // onDelete: 'CASCADE',
        // constraints: false,
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
