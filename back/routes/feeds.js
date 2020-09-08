const express = require('express');
const cookieParser = require('cookie-parser');
const { isLogined } = require('../middleware/accountLogin');
const models = require('../src/db/models');
const { password } = require('../util/inputValidation');
const router = express.Router();
const { Op } = require('sequelize').Sequelize;

router.get('/', isLogined, async (req, res, next) => {
  try {
    // 친구 관계 추가 없으니 일단은... 전체 게시글 전체중 10개 넘기기
    const userId = req.loginedUserId;
    const lastCount = req.query.lastCount || 5;
    // const lastCount = req.query.lastCount;
    /**
     * ! 해야하는 것
     * - 나의 팔로우 목록에 해당하는 피드 불러오기
     * - 피드정렬 : 최신순 (DESC, ASC, NULLS FIRST)
     * - 코멘트 정렬 : 최신순
     * - 페이징 : 최대 5개 불러오기
     */
    const friends = await models.Relation.findAll({
      where: { followerId: userId },
      attributes: ['targetId'],
    });
    const friendsIdList = await Promise.all(
      friends.map((friend) => friend.targetId),
    );
    const feedList = await models.Feed.findAll({
      // where: { all: true },
      /**
       * original: Error: Unknown column 'Feed.authorId' in 'on clause'에러해결책
       * 1. subQuery:false, link: https://github.com/sequelize/sequelize/issues/9869
       * 2. separate: true, link: https://github.com/sequelize/sequelize/issues/9869#issuecomment-510393362
       */
      where: { authorId: { [Op.or]: [/* userId, */ ...friendsIdList] } }, // 본인 게시물 포함 친구들 게시글
      subQuery: false,
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: models.User,
          as: 'Author',
          attributes: ['id', 'userName', 'imageUrl'],
        },
        {
          model: models.Image,
          attributes: ['id', 'url'],
        },
        {
          model: models.User /* FeedLiker */,
          as: 'FeedLike',
          attributes: ['id'],
        },
        {
          model: models.Comment,
          order: [['createdAt', 'DESC']],
          attributes: ['id', 'content', 'createdAt'],
          include: [
            {
              model: models.User,
              as: 'Author',
              attributes: ['id', 'userName'],
            },
            {
              model: models.User,
              as: 'CommentLike',
              attributes: ['id'],
            },
          ],
        },
      ],
    });

    return res.status(200).json(feedList);
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
