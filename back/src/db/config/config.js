const dotenv = require('dotenv');

dotenv.config();

// 모든 모델(테이블)에 적용할 옵션 작성
// 모든 모델(테이블)에 공통 반영된다
const common = {
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
  logging: true,
  query: {
    raw: true,
  },
  underscored: false,
  dialectOptions: {
    useUTC: true, //for reading from database
    dateStrings: true, // ! 데이터 로드시 문자열로 가저옴
    typeCast: true, // ! 타임존을 역으로 계산하지 않음
  },
  timezone: '+09:00', //for writing to database
};
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'mysql',
    ...common,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'mysql',
    ...common,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'mysql',
    ...common,
  },
};

// ? 타임존 설정 블로그 https://devstudioonline.com/article/sequelize-set-timezone-and-datetime-format-for-mysql

/**
 *  타임존 설정 전 : 2018-10-18T06 : 45 : 38.000Z
 *  타임존 설정 후 : 2018-10-19 01:08:50
 */
