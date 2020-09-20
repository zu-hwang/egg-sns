const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sampleResize = async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      /**
       * 임시 작성에서는 무조건 1:1 contain 설정하기 -> 이후 최종 피드 업로드에서 이미지 처리
       */
      const [uploads, origin, date, filenames] = file.path.split('/');
      const [name, ext] = filenames.split('.');
      const newFilename = `${uploads}/resize/${date}/${name}.jpg`;
      await sharp(file.path)
        .resize({
          width: 1080,
          height: 1080,
          fit: sharp.fit.contain,
          background: { r: 255, g: 255, b: 255, alpha: 1 }, // 보라색
        })
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .rotate()
        .toFile(newFilename);
      const { width, height } = await sharp(newFilename).metadata();
      req.body.images.push({ newFilename, width, height });
    }),
  ).catch((error) => {
    console.log('샘플리사이즈 프로미스에러', error);
  });
  next();
};

module.exports = { sampleResize };
