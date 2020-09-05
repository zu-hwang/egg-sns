'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HashtagFeed extends Model {
    static associate(models) {
      this.belongsTo(models.Feed, {
        onDelete: 'CASCADE',
        constraints: false,
        foreignKey: {
          name: 'feedId',
          allowNull: false,
        },
      });
      this.belongsTo(models.Hashtag, {
        onDelete: 'CASCADE',
        constraints: false,
        foreignKey: {
          name: 'hashtagId',
          allowNull: false,
        },
      });
    }
  }
  HashtagFeed.init(
    {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'HashtagFeed',
      tableName: 'hashtag_feed',
      underscored: true,
    },
  );
  return HashtagFeed;
};
