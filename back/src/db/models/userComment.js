'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserComment extends Model {
    static associate(models) {
      this.belongsTo(models.Comment, {
        onDelete: 'CASCADE',
        constraints: false,
        foreignKey: {
          allowNull: false,
        },
      });
      this.belongsTo(models.User, {
        onDelete: 'CASCADE',
        constraints: false,
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  UserComment.init(
    {
      /**
       * ⚠️
       * 다:다 관계를 상대 모델에서 설정한 뒤
       * 중간테이블을 직접 작성하면, 기본키 생성이 자동으로 되지 않음
       * id를 직접 적어주어야 한다.
       * 📍
       * 자동생성 하지 않고 아래와 같이 작성하는 이유?
       * 중간테이블 자동생성의 경우, 상대의 id가 PK로 2개 필드가 생성되는데,
       * 그것을 방지하고, id를 PK로 설정하기 위해서...
       * 🌧
       * FK(MUL)이 아닌 PK로 지정된 이유가 있는지는 아직 모르겠다.
       * 만약 API를 만들면서 쿼리가 제대로 작동하지 않은경우 아래 PK를 새로 지정한것 때문인지 확인해야한다.
       */
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'UserComment',
      tableName: 'user_comment',
      underscored: true, // 필드명 스테이크형 > 각각 지정하려면 컬럼옵션에 filed 사용하기
    },
  );
  return UserComment;
};
