const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
router.use(cookieParser());

const models = require('../src/db/models');
const { hashtagRule } = require('../util/regex');
const { isLogined } = require('../middleware/accountLogin');
const { imageUrl } = require('../util/inputValidation');
const API = {
  create: '/create',
};

router.post(API.create, isLogined, async (req, res, next) => {
  try {
    const userId = req.loginedUserId;
    const content = req.body.content;
    const uplodedImages = req.body.uplodedImages;
    if ((!uplodedImages && uplodedImages.length === 0) || content.length < 0)
      return res.status(400).json({ message: 'requireDataEmpty' });
    console.log({ 기본정보: { userId, content, uplodedImages } });
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
      uplodedImages.map(async (url) => {
        // const [uploads, date, fileNameExt] = url.split('/'); // [uploads, YYYYMMDD, filename.ext]
        // const newPath = path.join(uploads, 'used', date); // uploads/used/YYYYMMDD
        // const finallPath = newPath + fileNameExt;
        // try {
        //   // 오늘자 사용이미지 폴더 있는지 확인
        //   fs.accessSync(newPath, { recursive: true });
        // } catch (error) {
        //   // 오늘자 사용이미지 폴더 생성
        //   fs.mkdirSync(newPath, { recursive: true });
        // } finally {
        //   fs.copyFileSync(
        //     // 이미지 복사
        //     url, // 현재위치
        //     finallPath, // 복사할 위치
        //     // COPYFILE_EXCL, // 옵션
        //   );
        // }
        /**
         * 이미지 인스턴스 생성
         */
        console.log({ url, newFeedId: newFeed.id });
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
    //! raw옵션으로 성공,..ㅠㅠ.ㅠ 이게 아닌뎅----------------
    const finalFeed = await models.Feed.findOne({
      where: { id: newFeed.id },
      attributes: ['id', 'content', 'createdAt'],
      raw: true, // 로우 옵션을 안주면 내용이 안나오고
      nest: true, // 로우 옵션은 네스팅 무시함으로 네스트 설정해줘야하고
      include: [
        { model: models.Image, attributes: ['id', 'url'] },
        // { model: models.Hashtag }, // 검색할때 사용
        {
          model: models.User /* FeedLiker */,
          attributes: ['id'],
        }, // 모든 정보가 와버림..
        {
          // 피드작성자
          model: models.User,
          as: 'Author',
          attributes: ['id', 'userName', 'imageUrl'],
        },
        {
          // 코멘트 작성자
          model: models.Comment,
          attributes: ['id', 'content', 'createdAt'],
          include: [
            {
              model: models.User,
              as: 'Author',
              attributes: ['id', 'userName'],
            },
          ],
        },
      ],
    });
    //! ----------------------------------------------------------------
    // console.log({ dma: await newFeed.getImages() });

    console.log(images.length);
    const result = {
      feed: {
        id: finalFeed.id,
        author: finalFeed.Author,
        content: finalFeed.content,
        image: await images.map((img) => {
          return {
            id: img.id,
            url: img.url,
            feedId: img.feedId,
          };
        }),
        comments: [],
        likes: finalFeed.Users.UserFeed,
        createdAt: finalFeed.createdAt,
      },
    };
    console.log({ finalFeed, result });

    return res.status(200).json(finalFeed);
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
