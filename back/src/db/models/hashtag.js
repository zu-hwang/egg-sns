'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    static associate(models) {
      /**
       * 다:다 - FeedHashtag, CommentHashtag
       */
      this.belongsToMany(models.Feed, {
        through: 'HashtagFeed',
        foreignKey: { name: 'hashtagId', allowNull: false },
      });
      this.belongsToMany(models.Comment, {
        through: 'HashtagComment',
        foreignKey: { name: 'hashtagId', allowNull: false },
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
