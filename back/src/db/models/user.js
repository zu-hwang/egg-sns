'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      /**
       * 1:다 - 다 : Feed, Comment
       * 다:다 - Relation *2, UserLikeFeed, UserCommentLike
       *
       * ⚠️ fk 설정은 has메서드에 넣도록 하며, belongs에는 상대를 지칭할 as를 넣도록 한다
       *
       * as : 모델명(대문자+카멜)
       * foreignKey : 컬럼명(소문자+카멜)
       * throuth : 기본 테이블명(소문자+복수) or 모델 직접구현 > 모댈명(대문자+카멜)
       *
       */
      this.hasMany(models.Feed, {
        foreignKey: 'authorId' /*  allowNull: false, onDelete: 'CASCADE'  */,
      });
      this.hasMany(models.Comment, {
        foreignKey: 'authorId' /*  allowNull: false, onDelete: 'CASCADE'  */,
      });
      this.hasMany(models.UserFeed, {
        foreignKey: 'userId',
      });
      this.hasMany(models.HashtagFeed, {
        foreignKey: 'followerId',
      });
      this.hasMany(models.HashtagFeed, {
        foreignKey: 'targetId',
      });
      this.belongsToMany(models.Feed, {
        through: 'UserFeed',
        foreignKey: 'userId',
      });
      this.belongsToMany(models.Comment, {
        through: 'UserComment',
        foreignKey: 'userId',
      });

      this.belongsToMany(this, {
        // this = Follower, 상대 User 모델은 Target으로 칭함(Following)
        as: 'Target',
        through: 'Relation',
        foreignKey: 'FollowerId',
      });
      this.belongsToMany(this, {
        // models.User = Target, 상대 User 모델은 Follower으로 칭함
        as: 'Follower',
        through: 'Relation',
        foreignKey: 'TargetId',
      });
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        unique: true,
      },
      fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      secretMode: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true, // 필드명 스테이크형 > 각각 지정하려면 컬럼옵션에 filed 사용하기
    },
  );
  return User;
};
