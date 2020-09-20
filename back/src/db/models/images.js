'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      /**
       * 1:다 -1 : Feed
       */
      this.belongsTo(models.Feed, {
        foreignKey: {
          name: 'feedId',
          allowNull: false,
        },
      });
    }
  }
  Image.init(
    {
      url: { type: DataTypes.STRING(), allowNull: false },
      category: {
        type: DataTypes.ENUM(['photo', 'video']),
        allowNull: false,
        defaultValue: 'photo',
      },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
      underscored: true,
    },
  );
  return Image;
};
