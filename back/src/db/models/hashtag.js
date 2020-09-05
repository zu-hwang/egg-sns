'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    static associate(models) {
      /**
       * 다:다 - FeedHashtag, CommentHashtag
       */
      this.hasMany(models.HashtagComment, {
        foreignKey: 'hashtagId',
      });
      this.hasMany(models.HashtagFeed, {
        foreignKey: 'hashtagId',
      });
      this.belongsToMany(models.Feed, {
        through: 'HashtagFeed',
        foreignKey: 'hashtagId',
        // allowNull: false,
        // onDelete: 'CASCADE',
        // constraints: false,
      });
      this.belongsToMany(models.Comment, {
        through: 'HashtagComment',
        foreignKey: 'hashtagId',
        // allowNull: false,
        // onDelete: 'CASCADE',
        // constraints: false,
      });
    }
  }
  Hashtag.init(
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Hashtag',
      tableName: 'hashtags',
      underscored: true,
    },
  );
  return Hashtag;
};
