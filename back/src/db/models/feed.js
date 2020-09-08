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
      this.hasMany(models.Image);
      this.hasMany(models.Comment, {
        foreignKey: {
          name: 'feedId',
          allowNull: false,
        },
      });
      this.belongsTo(models.User, {
        as: 'Author',
        foreignKey: {
          name: 'authorId',
          allowNull: false,
        },
      });
      this.belongsToMany(models.User, {
        through: 'UserFeed',
        as: 'FeedLike',
        foreignKey: {
          name: 'feedId',
          allowNull: false,
        },
        // onDelete: 'CASCADE',
      });
      this.belongsToMany(models.Hashtag, {
        through: 'HashtagFeed',
        foreignKey: { name: 'feedId', allowNull: false },
      });
      /**
       * 중간테이블
       */
      // this.hasMany(models.UserFeed, {
      //   foreignKey: 'feedId',
      // });
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
