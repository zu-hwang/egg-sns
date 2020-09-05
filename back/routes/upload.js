const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const sharp = require('sharp');
const { isLogined } = require('../middleware/accountLogin');
const { YYYYMMDDhhmmss, YYYYMMDD } = require('../util/nowTime');
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      try {
        fs.accessSync(path.join('uploads', '', YYYYMMDD()));
      } catch (error) {
        console.log('uploads 폴더가 없으므로 생성합니다.');
        /**
         * mkdirSync에서 경로를 지정할경우 recursive 옵션을 추가해야 한다. 아니면 에러
         * Error: ENOENT: no such file or directory, mkdir 'uploads/20200906'
         */
        fs.mkdirSync(path.join('uploads', YYYYMMDD()), { recursive: true });
      } finally {
        done(null, 'uploads/' + YYYYMMDD());
      }
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + YYYYMMDDhhmmss() + ext);
    },
  }),
  // 20mb or sharp 사용하기
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.use(cookieParser());
router.post(
  '/feed',
  isLogined,
  upload.array('feedImages', 10),
  (req, res, next) => {
    try {
      console.log(req.files);
      const filePathList = req.files.map((file) => {
        console.log(file);
        return file.path;
      });
      return res.status(200).json({ message: 'success', files: filePathList });
    } catch (error) {
      console.log(error);
    }
  },
);
router.post('/feed/delete', isLogined, (req, res, next) => {});

module.exports = router;
