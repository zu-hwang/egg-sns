const express = require('express');
const cookieParser = require('cookie-parser');
const { isLogined } = require('../middleware/accountLogin');
const models = require('../src/db/models');
const router = express.Router();
const { Sequelize } = require('sequelize');
const { Op } = Sequelize;
const shuffle = require('../util/shuffle.js');

router.get('/recommand/all', isLogined, async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next();
  }
});
router.get('/recommand', isLogined, async (req, res, next) => {
  try {
    const userId = req.loginedUserId;
    // ? 내 타겟들의 목록 가저오기
    const {
      recommandList,
      myTargetIdList,
      follwerList,
    } = await models.User.findOne({
      where: { id: userId },
      attributes: [],
      include: [
        {
          model: models.User,
          as: 'Target',
          attributes: ['id', 'userName'],
          through: { attributes: [] },
          include: [
            {
              model: models.User,
              as: 'Target',
              attributes: ['id', 'userName', 'imageUrl'],
              through: { attributes: [] },
            },
          ],
        },
        {
          model: models.User,
          as: 'Follower',
          through: { attributes: [] },
          attributes: ['id', 'userName', 'imageUrl'],
        },
      ],
    }).then((data) => {
      const targetList = [];
      data.Target.filter((item) => item.id !== userId).forEach((item) => {
        item.Target.forEach((i) => {
          targetList.push({
            id: i.id,
            userName: i.userName,
            imageUrl: i.imageUrl,
            type: 'Target',
            xFriend: [item.userName],
          });
        });
      });
      const result = targetList.reduce((acc, RCMUser) => {
        if (acc.length === 0) acc.push(RCMUser);
        if (acc.length > 0) {
          const idList = acc.map((i) => i.id);
          if (idList.includes(RCMUser.id)) {
            console.log('>>>>>>>>> 중복이다', idList, RCMUser.id);
            const index = idList.indexOf(RCMUser.id);
            acc[index].xFriend.push(RCMUser.xFriend[0]);
          } else {
            acc.push(RCMUser);
          }
        }
        return acc;
      }, []);
      return {
        follwerList: data.Follower.map((item) => {
          return {
            id: item.id,
            userName: item.userName,
            imageUrl: item.imageUrl,
            type: 'Follower',
          };
        }),
        recommandList: result,
        myTargetIdList: data.Target.map((i) => i.id),
      };
    });
    /**
     * 친구추천 제외 목록
     * >>> 나
     * >>> 나의 타겟
     * >>> 나의 팔로워
     * >>> 추천 리스트(타겟의 타겟들)
     */
    const recommandListIds = recommandList.map((i) => i.id);
    const follwerListIds = follwerList.map((i) => i.id);
    const excludeListSet = new Set([
      userId,
      ...follwerListIds,
      ...recommandListIds,
      ...myTargetIdList,
    ]);
    const excludeList = [...excludeListSet];
    const ramdomRecommand = await models.User.findAll({
      where: {
        id: { [Op.notIn]: excludeList },
        createdAt: {
          // createdAt < 타임스템프  && createdAt > 타임스템프 - 1일(하루전) == 하루동안 신규가입한 녀석들 렌덤 가저오기
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
      attributes: ['id', 'userName', 'imageUrl'],
      order: Sequelize.literal('rand()'),
      limit: 5,
    }).then((data) => {
      return data.map((item) => ({
        id: item.id,
        userName: item.userName,
        imageUrl: item.imageUrl,
        type: 'New',
      }));
    });
    let resultRecommandList = shuffle([
      ...ramdomRecommand,
      ...recommandList,
      ...follwerList,
    ]).slice(0, 5);
    if (resultRecommandList.length < 5) {
      console.log(excludeList);
      resultRecommandList = [
        ...resultRecommandList,
        ...(await models.User.findAll({
          where: {
            id: { [Op.notIn]: excludeList },
          },
          attributes: ['id', 'userName', 'imageUrl'],
          order: Sequelize.literal('rand()'),
          limit: 5,
        }).then((data) =>
          data.map((item) => ({
            id: item.id,
            userName: item.userName,
            imageUrl: item.imageUrl,
            type: 'Random',
          })),
        )),
      ].slice(0, 5);
    }
    return res.status(200).json({
      message: 'success',
      recommandList: resultRecommandList,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/', isLogined, async (req, res, next) => {
  // ? relation?target=numString
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
    if (userId === req.query.target)
      return res.status(400).json({ message: 'invalidInput' });
    const targetId = parseInt(req.query.target); // 쿼리스트링은 문자열로 전달됨. 숫자로 바꾸자
    const follower = await models.User.findOne({
      where: { id: userId },
      attributes: ['id', 'userName'],
      include: [
        {
          model: models.User,
          as: 'Target',
          through: { attributes: [] },
          attributes: [['id', 'targetId']],
        },
      ],
    });
    // 이미 친구 인지 확인
    follower.Target.forEach((item) => {
      if (item.targetId === targetId)
        return res.status(400).json({ message: 'isAlreadyFollowing' });
    });
    const target = await models.User.findOne({ where: { id: targetId } });
    if (!target || !follower)
      return res.status(400).json({ message: '없는 유저입니다.' });
    await target.addFollower(follower); // or await follower.addTarget(target);
    const newTarget = await models.Relation.findOne({
      where: {
        followerId: follower.id,
        targetId,
      },
      attributes: ['id', 'followerId', 'targetId'],
    });
    return res.status(200).json({ message: 'success', newTarget });
  } catch (error) {
    console.log(error);
    next();
  }
});
router.delete('/', isLogined, async (req, res, next) => {
  // ? relation?target=numString
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
    if (!result) return res.status(400).json({ message: 'failure' });
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
