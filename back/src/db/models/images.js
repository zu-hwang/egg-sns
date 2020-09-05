'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      /**
       * 1:다 -1 : Feed
       */
      // 참조 계산 미루기에 constraints: false
      this.belongsTo(models.Feed, {
        // constraints: false,
        onDelete: 'CASCADE',
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
