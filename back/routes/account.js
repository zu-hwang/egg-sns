const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

const { overlapDataInspactor } = require('../util/inspactor');
const { signUpValidater } = require('../util/inputValidation');
const { createJWT, decodeJWT } = require('../util/jwt');
const { hashPW, matchPW } = require('../util/bcrypt');
const { defaultOption } = require('../util/cookieSetting');

const { User } = require('../src/db/models');

router.use(cookieParser());

/** @쿠키유저정보 */
router.get('/user', async (req, res) => {
  try {
    // console.log('쿠킹?>', {req, 'req.cookie':req.cookie});
    // console.log('쿠킹?>', req.cookies);
    if (req.cookies && req.cookies['egg-sns-token']) {
      const userId = decodeJWT(req.cookies['egg-sns-token']).id;
      const userData = await User.findOne({ where: { id: userId } });
      const {
        id,
        userName,
        email,
        phoneNumber,
        fullName,
        imageUrl,
        content,
        secretMode,
      } = userData;
      return res.status(200).json({
        message: 'success',
        user: {
          id,
          userName,
          email,
          phoneNumber,
          fullName,
          imageUrl,
          content,
          secretMode,
        },
      });
    }
    return res.status(400).json({ message: 'empty-cookie-data' });
  } catch (error) {
    console.log('유저데이터 쿠키 토큰확인 에러', error);
    res.status(500).json({ message: 'server-error' });
  }
});

/** @쿠키삭제_로그아웃 */
router.delete('/log-out', async (req, res) => {
  try {
    console.log('쿠키 지워죵');
    if (req.cookies && req.cookies['egg-sns-token']) {
      console.log({ '요청쿠키확인!': req.cookies['egg-sns-token'] });
      console.log({ res });
      res.clearCookie('egg-sns-token');
      console.log({ '삭제후 쿠키확인!': res.cookies });
      return res.status(200).json({ message: '쿠키제거 완료' });
    }
    return res.status(400).json({ message: '쿠키없는데?' });
  } catch (error) {
    console.log('쿠키삭제 로그아웃 에러', error);
    return res.status(500).json({ message: 'server-error' });
  }
});

/** @로그인 */
router.post('/sign-in', async (req, res) => {
  try {
    console.log('바디 확인 : ', req.body);
    if (
      (!req.body.userName || !req.body.email || !req.body.phoneNumber) &&
      !req.body.password
    )
      return res.status(400).json({ message: '필수데이터 누락' });

    let userData = null;
    if (req.body.userName)
      userData = await User.findOne({
        where: { userName: req.body.userName },
      });
    if (req.body.email)
      userData = await User.findOne({
        where: { email: req.body.userName },
      });
    if (req.body.phoneNumber)
      userData = await User.findOne({
        where: { phoneNumber: req.body.phoneNumber },
      });
    if (userData === null)
      return res.status(400).json({ message: '회원정보 없음' });

    const resultMatchedPassword = await matchPW(
      req.body.password,
      userData.password,
    );
    if (resultMatchedPassword) {
      console.log('로그인 유저 정보:', userData);

      const token = createJWT(userData.id);
      const {
        id,
        userName,
        email,
        phoneNumber,
        fullName,
        imageUrl,
        content,
        secretMode,
      } = userData;
      res.cookie('egg-sns-token', token, defaultOption);
      return res.status(200).json({
        message: 'success',
        user: {
          id,
          userName,
          email,
          phoneNumber,
          fullName,
          imageUrl,
          content,
          secretMode,
        },
      });
    }
    return res.status(400).json({ message: '비밀번호 틀림' });
  } catch (error) {
    res.status(500).json({ message: 'error' });
  }
});

/** @회원가입 */
router.post('/sign-up', async (req, res) => {
  try {
    if (
      !req.body.userName &&
      !req.body.password &&
      (!req.body.email || !req.body.phoneNumber) &&
      !req.body.fullName
    )
      // 1. 필수데이터 입력 확인
      return res.status(400).json({ message: 'missing-required-data' });

    // 2. 유효성 검사
    console.log('2. 유효성 검사');
    const validationResult = signUpValidater({ ...req.body });
    if (validationResult !== null)
      return res.status(400).json({ message: validationResult });
    if (typeof validationResult == 'string')
      return res.status(500).json({ message: validationResult });

    // 3. 유니크 데이터 중복 검사
    console.log('3. 유니크 데이터 중복 검사');
    const overlapDataResult = await overlapDataInspactor(User, req.body);
    if (overlapDataResult !== null)
      return res.status(400).json({ message: overlapDataResult });
    if (typeof overlapDataResult == 'string')
      return res.status(500).json({ message: overlapDataResult });

    // 4. 유저정보 DB-User 테이블에 저장
    // 4-1 : 비밀번호 암호화  > DB 저장
    const hashPassword = await hashPW(req.body.password);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    // 4-2 : JWT 생성 & 응답
    const token = createJWT(newUser.id);
    res.cookie('egg-sns-token', token, defaultOption);
    console.log('쿠키확인', res.cookies);
    return res.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server-error' });
  }

  res.status(200).send('회원가입 끝');
});

module.exports = router;
