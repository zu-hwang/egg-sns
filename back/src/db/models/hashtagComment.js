'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HashtagComment extends Model {
    static associate(models) {
      this.belongsTo(models.Comment, {
        onDelete: 'CASCADE',
        constraints: false,
        foreignKey: {
          name: 'commentId',
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
