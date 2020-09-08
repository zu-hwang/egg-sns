'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HashtagFeed extends Model {
    static associate(models) {}
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
