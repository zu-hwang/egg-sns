const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
router.use(cookieParser());

const models = require('../src/db/models');
const { hashtagRule } = require('../util/regex');
const { isLogined } = require('../middleware/accountLogin');
const { finalResize } = require('../middleware/finalResize');
const deleteIMG = require('../util/uploadImageDelete');
const API = {
  create: '/create',
};

router.post(API.create, isLogined, finalResize, async (req, res, next) => {
  const userId = req.loginedUserId;
  const content = req.body.content;
  const finalUrls = req.body.finalUrls;
  try {
    if ((!finalUrls && finalUrls.length === 0) || content.length < 0)
      return res.status(400).json({ message: 'requireDataEmpty' });

    console.log({ 기본정보: { userId, content, finalUrls } });
    /**
     * 신규 피드
     */
    const newFeed = await models.Feed.create({
      authorId: userId,
      content: content,
    });
    /**
     * 피드에 해쉬태그 등록 -> 중간테이블에 반영됨
     */
    const hashtagList = content.match(hashtagRule); // 피드컨텐츠에서 해쉬태그 추출
    if (hashtagList && hashtagList.length > 0) {
      const newHashtags = await Promise.all(
        hashtagList.map(async (hash) => {
          const [hashtag, bool] = await models.Hashtag.findOrCreate({
            where: { name: hash.slice(1).toString() }, // 문자열로 안하면 에러
          });
          return hashtag.id; // 생성해쉬태그 인스턴스의 id만 리턴. bool은 무시
        }),
      );
      const alreadyAddedHashtags = new Set([...newHashtags]); // 중복 id 제거
      const arrayHashtags = [...alreadyAddedHashtags]; // Set은 사용불가능 -> 배열로 변환
      await newFeed.addHashtags(arrayHashtags); // [id, id, id] ..
    }
    /**
     * 사진 추가
     * 1. db에 업로드 하기위해 폴더 변경 (피드 업로드 안한 이미지는 지울수 있도록)
     * 2. 이미지 모델 신규생성 > 1개일때, 여러개일때 나누어 로직 작성..? 그냥 다 배열로처리하믄 안댐??
     */
    const images = await Promise.all(
      finalUrls.map(async (url) => {
        // console.log({ url, newFeedId: newFeed.id });
        const createdImage = await models.Image.create({
          url: url,
          feedId: newFeed.id,
        });
        await newFeed.addImage(createdImage);
        console.log({ createdImage });
        return createdImage; // id만 추출
      }),
    );
    await newFeed.addImages([...images]);
    console.log('등록된 이미지 : ', await newFeed.countImages());
    const finalFeed = await models.Feed.findOne({
      where: { id: newFeed.id },
      attributes: ['id', 'content', 'createdAt'],
      /**
       * ? raw/nest 설정은 콘솔에서 결과값 확인할때 좋음~!!
       * plain: false -> 결과값의 배열읠 단순화 하여 보여줌
       * raw: true    -> 시퀄라이즈 설정에서 query:{raw:true} 했을 경우 이 옵션을 꼭 넣어줘야 하며
       *                 시퀄라이즈 리턴값을 객체로 변형하여 보여준다.. 문제는 hasMany의 배열값도 객체로 단일화 해버린다는 것 !
       * nest : true  -> 객체를 계층화 하여 보여준다. raw 옵션과는 항상 쌍으로 다닌다
       */
      include: [
        {
          // 피드작성자
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
          // 내가 좋아하는 게시글인지 boolean
        },
        {
          model: models.Comment,
          order: [['id', 'DESC']], // id 기준 나열 최신 === 숫자큼
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
    /**
     * DB 업데이트 완료 후 resize, origin 폴더의 파일 제거
     */

    return res.status(200).json({ message: 'success', newFeed: finalFeed });
  } catch (error) {
    /**
     * 문제가 생겼을 경우
     * > orign/resize/final 폴더의 모든 이미지 제거
     */
    finalUrls.forEach((url) => {
      deleteIMG.origin(url);
      deleteIMG.resize(url);
      deleteIMG.final(url);
    });
    console.log(error);
    return res.status(500).json({ message: 'serverError' });
  } finally {
    /**
     * 정상 처리 후 origin/resize 폴더의 이미지 제거
     */
    finalUrls.forEach((url) => {
      deleteIMG.origin(url);
      deleteIMG.resize(url);
    });
  }
});

module.exports = router;
