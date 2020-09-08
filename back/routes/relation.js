const express = require('express');
const cookieParser = require('cookie-parser');
const { isLogined } = require('../middleware/accountLogin');
const models = require('../src/db/models');
const router = express.Router();
const op = require('sequelize').Sequelize.Op;

router.get('/add', isLogined, async (req, res, next) => {
  // ? relation/add?target=numString
  try {
    /**
     * 1. 쿼리스트링에서 target Id 받기 > 문자열임으로 숫자로 변환
     * 2. 로그인 유저 정보 DB에서 조회
     * 3. 타겟 유저 정보 DB에서 조회
     * 4. 타겟유저에서 팔로워 추가 or 팔로우 유저에게 타겟 추가
     */
    const userId = req.loginedUserId;
    if (!req.query || !req.query.target)
      return res.status(400).json({ message: 'requiredEmpty' });
    const targetId = parseInt(req.query.target); // 쿼리스트링은 문자열로 전달됨. 숫자로 바꾸자
    console.log(userId, targetId);
    const follower = await models.User.findOne({ where: { id: userId } });
    const target = await models.User.findOne({ where: { id: targetId } });
    console.log({ follower, target });
    if (!target || !follower)
      return res.status(400).json({ message: '없는 유저입니다.' });
    await target.addFollower(follower); // or await follower.addTarget(target);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    next();
  }
});
router.get('/remove', isLogined, async (req, res, next) => {
  // ? relation/remove?target=numString
  try {
    /**
     * 1. 쿼리스트링에서 target Id 받기 > 문자열임으로 숫자로 변환
     * 2. 로그인 유저 정보 DB에서 조회
     * 3. 타겟 유저정보 DB 조회
     * 4. removeTarget, removeFollower ~
     */
    const userId = req.loginedUserId;
    if (!req.query || !req.query.target)
      return res.status(400).json({ message: 'requiredEmpty' });
    const targetId = parseInt(req.query.target); // 쿼리스트링은 문자열로 전달됨. 숫자로 바꾸자
    const follower = await models.User.findOne({ where: { id: userId } });
    const target = await models.User.findOne({ where: { id: targetId } });
    if (!target || !follower)
      return res.status(400).json({ message: '없는 유저입니다.' });
    const result = await target.removeFollower(follower);
    return res.status(200).json({ message: result ? 'success' : 'failure' });
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
