// 미들웨어 -> 데코레이터 역할 처럼 쓰자
// 1. 쿠키확인 -> 유저데이터 있는지 확인 -> 있으면 JWT 복호화 -> req.유저id에 저장

const jwt = require('../util/jwt');
const models = require('../src/db/models');
const COOKIE = 'egg-sns-token';
const COOKIE_EXPIRY = 'egg-sns-token-expiry';

const isLogined = async (req, res, next) => {
  try {
    /**
     * 1. req.cookies 확인하고 > 없으면 로그인 필요 응답
     * 2. 쿠키 있음 확인 > res.loginedUserId 넣어주기
     * 3. 서버에러 next로 넘기기
     */
    console.log('여기는 isLogined 커스텀 미들웨어');
    if (req.cookies && (req.cookies[COOKIE] || req.cookies[COOKIE_EXPIRY])) {
      const cookie = req.cookies[COOKIE] || req.cookies[COOKIE_EXPIRY] || '';
      // console.log({ cookie });
      const userId = jwt.decode(cookie);
      // console.log({ userId });
      if (typeof userId === 'number') {
        const dbUserData = await models.User.findOne({ where: { id: userId } });
        if (!dbUserData)
          return res.status(400).json({ message: 'unAuthourizationToken' });
      }
      req.loginedUserId = userId;
      next();
    } else {
      return res.status(400).json({ message: 'emptyCookie' });
    }
  } catch (error) {
    console.log('isLogined 미들웨어 에러', error);
    next();
  }
};

const isNotLogined = (req, res, next) => {
  try {
    if (req.cookies && (req.cookies[COOKIE] || req.cookies[COOKIE_EXPIRY])) {
    }
    next();
  } catch (error) {
    console.log('isNotLogined 미들웨어 에러', error);
    return res.status(400).json({ message: '로그인이 필요합니다' });
  }
};

module.exports = { isLogined, isNotLogined };
