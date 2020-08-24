const express = require('express');
const router = express.Router();

const { signUpValidater } = require('../util/inputValidation');
const { createJWT } = require('../util/jwt');
const { hashPW, matchPW } = require('../util/bcrypt');

// 모델 로드
const { User } = require('../src/db/models');

router.get('/', (req, res) => {
  res.send('계정관련 API');
});

router.post('/login', async (req, res) => {
  /**
   * 1. (유저네임, 폰넘버, 이메일 중 1개)/비밀번호 받기
   *   -> req.body
   * 2. 유저네임 검사
   *   -> 핸드폰/이메일/유저네임 중 분리
   *   -> 3중 1일때 유효한 유저네임인지 검사
   *     ? 유효하지 않음 > (없는 유저네임) 에러 응답
   * 3. 비밀번호 검사
   *   -> 비밀번호 비크립트 암호화
   *   -> 해당 유저의 DB-비밀번호 데이터와 동일한지 검사
   *     ? 불일치 > (비밀번호 틀림) 에러응답 : 상태코드 400
   * 4. JWT발행
   *   -> 유저-id가 포함된 JWT발행 : 상태코드 200
   */
  try {
    // 1. 필수 데이터 확인 & DB 조회
    if (
      (!req.body.userName || !req.body.email || !req.body.phoneNumber) &&
      !req.body.password
    )
      return res.status(400).json({ message: '필수데이터 누락' });

    let userData = null;
    req.body.userName &&
      (userData = await User.findOne({
        where: { userName: req.body.userName },
      }));
    req.body.email &&
      (userData = await User.findOne({
        where: { email: req.body.userName },
      }));
    req.body.phoneNumber &&
      (userData = await User.findOne({
        where: { phoneNumber: req.body.phoneNumber },
      }));

    if (userData === null)
      return res.status(400).json({ message: '회원정보 없음' });

    const resultMatchedPassword = await matchPW(
      req.body.password,
      userData.password,
    );
    if (resultMatchedPassword) {
      const token = createJWT(userData.id);
      return res.status(200).json({
        token,
        message: 'success',
      });
    } else {
      return res.status(400).json({ message: '비밀번호 틀림' });
    }
    return res.status(500).json({ message: '여긴 호출되면 안되는데..?' });
  } catch (error) {
    res.status(500).json({ message: 'error' });
  }
});

router.post('/sign-up', async (req, res) => {
  /**
   * 1. 인풋 데이터 받기 (핸드폰or이메일/풀네임/유저네임/비밀번호)
   * 2. 유효성 검사
   *   -> 유효성 검사
   *     ? 실패 : 유효성 에러 응답
   * 2. 유저네임 중복검사
   *   -> 중복 검사
   *     ? 중복 : (사용중인 유저네임)입니다. 에러 응답
   * 3. 회원정보 DB 저장
   *   -> 비밀번호 비크립트 암호화
   *   -> User.Create 데이터 : DB에 추가
   * 4. JWT발행
   *   -> 유저-id가 포함된 JWT발행 : 상태코드 200
   */
  console.log('회원가입 POST 요청');
  try {
    // 1. 필수데이터 입력 확인
    if (
      !req.body.userName &&
      !req.body.password &&
      (!req.body.email || !req.body.phoneNumber) &&
      !req.body.fullName
    )
      return res.status(400).json({ message: '필수데이터 누락' });

    // 2. 유효성 검사
    const validationResult = signUpValidater({ ...req.body });
    if (validationResult !== true) {
      return res.status(400).json({ message: validationResult });
    } else if (validationResult === 'error') {
      return res.status(500).json({ message: validationResult });
    }

    // 3. 유니크 데이터 중복 검사
    // 3-1 . 유저네임
    const searchUerNameResult = await User.findOne({
      where: { userName: req.body.userName },
    });
    if (searchUerNameResult)
      return res.status(400).json({ message: 'userName 중복' });
    // 3-2. 이메일
    if (req.body.email) {
      const searchEmailResult = await User.findOne({
        where: { email: req.body.email },
      });
      if (searchEmailResult)
        return res.status(400).json({ message: 'email 중복' });
    }
    // 3-3. 폰넘버
    if (req.body.phoneNumber) {
      const searchPhoneNumberResult = await User.findOne({
        where: { phoneNumber: req.body.phoneNumber },
      });
      if (searchPhoneNumberResult)
        return res.status(400).json({ message: 'phoneNumber 중복' });
    }

    // 4. 유저정보 DB-User 테이블에 저장
    // 4-1 : 비밀번호 암호화  > DB 저장
    const hashPassword = await hashPW(req.body.password);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    // 4-2 : JWT 생성 & 응답
    const token = createJWT(newUser.id);
    return res.status(200).json({
      token,
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server error' });
  }

  res.status(200).send('회원가입 끝');
});

module.exports = router;
