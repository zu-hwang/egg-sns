const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const jwt = require('../util/jwt');
const validation = require('../util/inputValidation');
const { Op, Sequelize } = require('sequelize');
const { User } = require('../src/db/models');
const { defaultOption, expiresOption } = require('../util/cookieSetting');
const { isLogined, isNotLogined } = require('../middleware/accountLogin');
const { profileInspactor } = require('../middleware/profileInspactor');
const valid = require('../middleware/validation');
const router = express.Router();
router.use(cookieParser());

const COOKIE = 'egg-sns-token';
const COOKIE_EXPIRY = 'egg-sns-token-expiry';
const API = {
  user: '/user',
  update: '/update',
  logout: '/log-out',
  login: '/sign-in',
  signup: '/sign-up',
  inputValidation: '/validation',
  cookieExpiry: '/cookie-expiry',
};

// ! 비밀번호 해쉬화 > 데이터베이스 저장할때 자동으로 되도록, 꺼내올때 자동으로 되도록 MODEL에 hook 연결하기

/** @프로필 수정 */
router.post(
  API.update,
  isLogined,
  valid.isValidationOk,
  profileInspactor,
  async (req, res, next) => {
    try {
      console.log({ 변경전: req.body.password });
      if (req.body && req.body.password) {
        const hashPassword = await bcrypt.hash(req.body.password, 12);
        req.body.password = hashPassword;
        console.log({ 변경후: req.body.password });
      }
      console.log('DB업데이트를 해보자', req.body);
      const newUserData = await User.update(
        {
          userName: req.body.userName,
          fullName: req.body.fullName,
          password: req.body.password,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          content: req.body.content,
          imageUrl: req.body.imageUrl,
        },
        {
          where: { id: req.loginedUserId },
          returning: true,
          plain: true,
        },
      );
      console.log(newUserData);
      console.log({ newUserData });
      return res.status(200).json({ newUserData });
    } catch (error) {
      console.log(error);
      next();
    }
  },
);

/** @로그인 */
router.post(API.login, async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body.userId || !req.body.password)
      return res.status(400).json({ message: 'requeiredEmpty' });
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { email: req.body.userId },
          { userName: req.body.userId },
          { phoneNumber: req.body.userId },
        ],
      },
    });
    if (!users) return res.status(400).json({ message: 'notExistUser' });
    let matchedUser = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (await bcrypt.compare(req.body.password, user.password))
        matchedUser.push(user);
    }
    if (matchedUser.length === 0)
      return res.status(400).json({ message: 'notMatchingPassword' });
    const user = matchedUser[0]; // 여러명일 수 있는가...
    const token = jwt.create(user.id);
    res.cookie(COOKIE, token, defaultOption);
    return res.status(200).json({
      message: 'success',
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        imageUrl: user.imageUrl,
        content: user.content,
        secretMode: user.secretMode,
      },
      token,
    });
  } catch (error) {
    next();
  }
});

/** @회원가입 */
router.post(API.signup, isNotLogined, async (req, res, next) => {
  try {
    if (
      !req.body ||
      !req.body.password ||
      !req.body.fullName ||
      !req.body.userName ||
      (!req.body.contact && !req.body.email && !req.body.phoneNumber)
    )
      return res.status(400).json({ message: 'requiredEmpty' });
    //  유효검사
    const body = Object.entries(req.body);
    const validationResult = body.reduce((acc, data) => {
      const [key, value] = data;
      if (!validation[key](value)) acc++;
      return acc;
    }, 0);
    if (validationResult > 0)
      return res.status(400).json({ message: 'validationError' });
    // DB 중복검사 ==> DB 조회할때는 null, undefined 는 넣을수 없음!
    const input = req.body.phoneNumber || req.body.email || req.body.contact;
    const overlapDataResult = await User.findAll({
      where: {
        [Op.or]: [
          { userName: req.body.userName },
          { phoneNumber: input },
          { email: input },
        ],
      },
    });
    if (overlapDataResult.length > 0)
      return res.status(400).json({ message: 'overlapError' });
    // 비밀번호 암호화  > DB 저장
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    // JWT 생성 & 응답
    const token = jwt.create(newUser.id);
    // 세션 쿠키 생성 & 추가
    res.cookie(COOKIE, token, defaultOption);
    return res.status(201).json({
      message: '회원가입 성공적!',
      token,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

/** @회원가입입력_유효성검사 input validator Api */
router.post(API.inputValidation, async (req, res, next) => {
  try {
    const keyNameList = [
      'userName', // 유니크
      'email', // 유니크
      'phoneNumber', // 유니크
      'contact', // 유니크
      'fullName',
      'password',
    ];
    const unique = keyNameList.slice(0, 3);
    const { keyName, value } = req.body;
    if (!keyName || !value)
      return res.status(400).json({ message: 'requiredEmpty' });
    if (keyNameList.indexOf(keyName) < 0)
      return res.status(200).json({ message: 'notMatchingKeyName' });
    if (!validation[keyName](value))
      return res.status(200).json({ message: 'validationError' });
    if (unique.includes(keyName)) {
      const result = await User.findAll({
        where: {
          [Op.or]: [
            { email: value },
            { phoneNumber: value },
            { userName: value },
          ],
        },
      });
      if (result.length > 0)
        return res.status(200).json({ message: 'overlapError' });
    }
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.log('@입력_유효성검사', error);
    next();
  }
});

/** @쿠키삭제_로그아웃 */
router.get(API.logout, isLogined, async (req, res, next) => {
  try {
    await User.update(
      { updatedAt: new Date() },
      { where: { id: req.loginedUserId } },
    ); // 로그아웃 시간 변경
    req.cookies[COOKIE] && res.clearCookie(COOKIE, defaultOption);
    req.cookies[COOKIE_EXPIRY] && res.clearCookie(COOKIE_EXPIRY, expiresOption);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log('쿠키삭제 로그아웃 에러', error);
    next();
  }
});

/** @쿠키유저정보 */
router.get(API.user, isLogined, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.loginedUserId }, // 오브젝트
      attributes: { exclude: ['password'] }, // 오브젝트
      // include : [ // 배열
      // { model : Feed, attributes : ['id',...] },
      // { model : Follower, attributes : ['id] },
      // { model : Following, attributes : [''id] },
      // ... 인클루드 목록에 관계된 데이터 불러온다
      // ]
      // ....
    });
    return res.status(200).json({
      message: 'success',
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        imageUrl: user.imageUrl,
        content: user.content,
        secretMode: user.secretMode,
      },
    });
  } catch (error) {
    console.log('유저데이터 쿠키 토큰확인 에러', error);
    next();
  }
});

/** @쿠키_만료연장 */
router.get(API.cookieExpiry, isLogined, (req, res) => {
  try {
    res.cookie(COOKIE_EXPIRY, req.loginedUserId, {
      expires: new Date(Date.now() + 1 * 1000 * 60 * 60),
    });
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
