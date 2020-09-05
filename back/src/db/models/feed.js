'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feed extends Model {
    static associate(models) {
      /**
       * 1:다 - 1 : User(Author),
       * 1:다 - 다 : Image,
       * 다:다 - UserFeedLike, FeedHashtags
       */
      this.belongsTo(models.User, {
        // constraints: false,
        onDelete: 'CASCADE',
        as: 'Author',
        foreignKey: {
          name: 'authorId',
          allowNull: false,
        },
      });
      this.hasMany(models.Image, {
        foreignKey: {
          name: 'feedId',
          allowNull: false,
        } /* onDelete: 'CASCADE', allowNull: false  */,
      });
      this.hasMany(models.Comment, {
        foreignKey: {
          name: 'feedId',
          allowNull: false,
        },
      });
      this.hasMany(models.UserFeed, {
        foreignKey: 'feedId',
      });
      this.hasMany(models.HashtagFeed, {
        foreignKey: 'feedId',
      });
      this.belongsToMany(models.User, {
        through: 'UserFeed',
        foreignKey: 'feedId',
        // allowNull: false,
        // onDelete: 'CASCADE',
      });
      this.belongsToMany(models.Hashtag, {
        through: 'HashtagFeed',
        foreignKey: 'feedId',
      });
    }
  }
  Feed.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Feed',
      tableName: 'feeds',
      underscored: true, // 필드명 스테이크형
    },
  );
  return Feed;
};
