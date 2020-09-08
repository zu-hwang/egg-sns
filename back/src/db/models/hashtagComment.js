'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HashtagComment extends Model {
    static associate(models) {}
  }
  HashtagComment.init(
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
      modelName: 'HashtagComment',
      tableName: 'hashtag_comment',
      underscored: true,
    },
  );
  return HashtagComment;
};
