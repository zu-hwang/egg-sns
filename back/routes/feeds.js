const express = require('express');
const models = require('../src/db/models');
const sequelize = require('sequelize');
const { Op } = require('sequelize').Sequelize;
const { Sequelize } = require('sequelize');
const { isLogined } = require('../middleware/accountLogin');

const router = express.Router();

router.get('/', isLogined, async (req, res, next) => {
  try {
    console.log('메인화면 피드리스트 요청 시작');
    const userId = req.loginedUserId;
    let paging = req.query.paging || null; // 초기값을 어떻게 잡아야 하나~
    // /**
    //  * ! 해야하는 것
    //  * - 나의 팔로우 목록에 해당하는 피드 불러오기
    //  * - 피드정렬 : 최신순 (DESC, ASC, NULLS FIRST)
    //  * - 코멘트 정렬 : 최신순
    //  * - 페이징 : 최대 5개 불러오기
    //  */
    const friends = await models.Relation.findAll({
      where: { followerId: userId },
      attributes: ['targetId'],
    });
    const friendsIdList = await Promise.all(
      friends.map((friend) => friend.targetId),
    );
    const limit = 5;
    const feedAuthorIdList = [
      userId,
      ...friendsIdList.filter((list) => list !== userId),
    ];

    const homeFeedList = await models.Feed.findAndCountAll({
      // where: { all: true },
      /**
       * original: Error: Unknown column 'Feed.authorId' in 'on clause'에러해결책
       * 1. subQuery:false, link: https://github.com/sequelize/sequelize/issues/9869 : 배열1개만 리턴됨! 안돼이건~
       * 2. separate: true & distinct: true, hasMany일때만 link: https://github.com/sequelize/sequelize/issues/9869#issuecomment-510393362
       * 3. duplicating: false : https://github.com/sequelize/sequelize/issues/9869 : 리미트와 사용시 에러
       */
      // 본인 게시물 포함or제외, 친구들 게시글
      where: { authorId: { [Op.or]: feedAuthorIdList } },
      order: [
        ['id', 'DESC'],
        [{ model: models.Comment }, 'id', 'DESC'],
      ],
      limit,
      attributes: ['id', 'content', 'createdAt', 'authorId'],
      include: [
        {
          model: models.User,
          as: 'Author',
          attributes: ['id', 'userName', 'imageUrl'],
        },
        {
          model: models.Image,
          attributes: ['id', 'url', 'category'],
        },
        {
          model: models.User /* FeedLiker */,
          as: 'FeedLike',
          attributes: ['id'],
          through: { attributes: [] }, // 관계모델 추가되는 것 제거됨
        },
        {
          model: models.Comment,
          attributes: ['id', 'content', 'createdAt', 'authorId'],
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
    if (homeFeedList.count === 0) {
      // 피드없음!
      return res.status(400).json({
        message: 'noMoreFeeds',
        paging: null,
        homeFeedList: homeFeedList.rows,
      });
    }
    paging = homeFeedList.rows[homeFeedList.rows.length - 1].id;
    paging = homeFeedList.length < limit && null;
    return res.status(200).json({
      message: 'success',
      paging,
      homeFeedList: homeFeedList.rows,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

router.get('/:userName/profile', isLogined, async (req, res, next) => {
  try {
    /**
     * ? 공개여부 관계없이 해당 프로필 정보는 전송한다!
     */
    const userName = req.params.userName;
    const mypageProfile = await models.User.findOne({
      where: { userName: userName },
      duplicating: false,
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('Feeds.id')), 'feedCount'],
        ],
        // 왜 1만 리턴하는 것인가~^^
        exclude: [
          'password',
          'phoneNumber',
          'fullName',
          'deletedAt',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [
        { model: models.Feed, attributes: ['id'] }, // 카운팅
        { model: models.User, as: 'Follower', attributes: ['id'] },
        { model: models.User, as: 'Target', attributes: ['id'] },
      ],
      group: ['Feeds.id', 'Target.id', 'Follower.id'], // 새 컬럼만들때 그룹사용
    }).then((data) => {
      return {
        id: data.id,
        userName: data.userName,
        email: data.email,
        imageUrl: data.imageUrl,
        content: data.content,
        secretMode: data.secretMode,
        feedCount: data.Feeds.length,
        follower: data.Follower,
        following: data.Target,
      };
    });
    if (!mypageProfile) return res.status(404).json({ message: 'notFound' });
    return res.status(200).json({
      message: 'success',
      mypageProfile,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get('/:userName', isLogined, async (req, res, next) => {
  try {
    /**
     * ? feeds/:userName?paging=number
     * 페이징 없을 경우 -> 최신순으로 24개 리턴
     * 페이징 있을 경우 -> 페이징 보다 작은 최신 순 24개 리턴
     */
    if (req.params && !req.params.userName)
      return res.status(404).json({ message: 'notFound' });

    console.log({ 1: req.query.paging });
    const userName = req.params.userName;
    const mypageUser = await models.User.findOne({ where: { userName } });
    if (!mypageUser) return res.status(404).json({ message: 'notFound' });
    let paging = req.query.paging ? parseInt(req.query.paging, 10) : null;
    console.log({ 2: paging });
    const limit = 9;
    const where = { authorId: mypageUser.id };
    if (paging) where.id = { [Op.lt]: paging }; // 페이징 설정
    console.log({ where });
    const myFeedList = await models.Feed.findAll({
      where,
      order: [['id', 'DESC']], // id 기준 나열 최신 === 숫자큼
      limit,
      attributes: ['id'],
      include: [
        {
          model: models.Image,
          attributes: ['id', 'url', 'category'],
        },
        {
          model: models.User,
          as: 'FeedLike',
          attributes: ['id'],
          through: { attributes: [] },
        },
        { model: models.Comment, attributes: ['id'] },
      ],
    });
    /**
     * 만약 시크릿모드 유저라면, 아래 검사를 통해 피드리스트를 보낼지 말지 결정
     */
    let isRelation = mypageUser.id === req.loginedUserId ? true : false; // 본인이면 true, 아니면 false
    if (!isRelation && mypageUser.secretMode) {
      // 본인 페이지 아님 & 시크릿 모드 사용자의 페이지 일 경우 => 로그인유저가 페이지주인의 팔로워인지 확인
      mypageUser.Follower.forEach(
        (follower) => follower.id === req.loginedUserId && (isRelation = true),
      );
    }
    /**
     * 최종 데이터 정리
     */
    console.log({ 3: paging });
    !isRelation && (myFeedList = []);
    paging = myFeedList[myFeedList.length - 1].id;
    console.log({ 4: paging });
    paging = myFeedList.length < limit ? null : paging;
    console.log({ 5: paging });
    return res.status(200).json({
      paging,
      myFeedList,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
