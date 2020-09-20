const sharp = require('sharp');
const { getOriginUrl } = require('../util/getUploadImageUrl');

const finalResize = async (req, res, next) => {
  const uploadedImages = req.body.uploadedImages; // resize
  let widthList = [];
  let heightList = [];
  let originUrls = [];
  req.body.finalUrls = [];
  await Promise.all(
    uploadedImages.map(async (url) => {
      /**
       * 기본순회 : 원본URL 검색 -> width, height 데이터 조회
       */
      const originUrl = getOriginUrl(url);
      try {
        const { width, height } = await sharp(originUrl).metadata();
        widthList.push(width);
        heightList.push(height);
        originUrls.push(originUrl);
      } catch (error) {
        console.log(error);
      }
    }),
  ).catch((error) => {
    console.log('기본순회 에러', error);
  });
  const widthSet = new Set([...widthList]);
  const heightSet = new Set([...heightList]);
  const widthSetToArr = [...widthSet];
  const heightSetToArr = [...heightSet];
  if (widthSetToArr.length > 1 || heightSetToArr.length > 1) {
    await Promise.all(
      originUrls.map(async (originUrl) => {
        const finalUrl = originUrl.replace('origin', 'final');
        await sharp(originUrl)
          .resize({
            width: 1080,
            height: 1080,
            fit: sharp.fit.cover,
          })
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(finalUrl);
        req.body.finalUrls.push(finalUrl);
      }),
    ).catch((error) => {
      console.log('파이널리사이즈 프로미스에러A', error);
    });
  }
  if (widthSetToArr.length === 1 && heightSetToArr.length === 1) {
    await Promise.all(
      originUrls.map(async (originUrl) => {
        const finalUrl =
          originUrl.replace('origin', 'final').split('.')[0] + '.jpg';
        await sharp(originUrl)
          .resize({
            width: widthSetToArr[0],
            height: heightSetToArr[0],
            fit: sharp.fit.cover,
            background: { r: 153, g: 255, b: 102, alpha: 1 }, // 라임
          })
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .rotate()
          .toFile(finalUrl);
        req.body.finalUrls.push(finalUrl);
      }),
    ).catch((error) => {
      console.log('파이널리사이즈 rs', error);
    });
  }
  next();
};

module.exports = { finalResize };
