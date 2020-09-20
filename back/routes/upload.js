const express = require('express');
// const cookieParser = require('cookie-parser');
const { isLogined } = require('../middleware/accountLogin');
const { uploadImages } = require('../middleware/multurMiddleware');
const { sampleResize } = require('../middleware/sampleResize');
const deleteIMG = require('../util/uploadImageDelete');
const router = express.Router();
// router.use(cookieParser());

router.post(
  '/sampleImages',
  isLogined,
  uploadImages,
  sampleResize,
  (req, res, next) => {
    try {
      const selectList = req.body.images;
      const filePathList = selectList.map((file) => {
        return file.newFilename; // 샤프 적용 이미지 일때, 미들웨어에서 newFilename에 담아보냈기에..
      });
      return res.status(200).json({ message: 'success', files: filePathList });
    } catch (error) {
      console.log(error);
      next();
    }
  },
);

router.post('/delete', isLogined, async (req, res, next) => {
  try {
    if (!req.body && !req.body.deleteImageUrl)
      return res.status(400).json({ message: 'requeiredEmpty' });

    const url = req.body.deleteImageUrl;
    await Promise.all([deleteIMG.origin(url), deleteIMG.resize(url)]);
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    // return res.status().json({ message: 'Success' });
  }
});

module.exports = router;
