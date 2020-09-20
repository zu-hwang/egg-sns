const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { YYYYMMDDhhmmss, YYYYMMDD } = require('../util/nowTime');
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      try {
        fs.accessSync(path.join('uploads', 'origin', YYYYMMDD()), {
          recursive: true,
        });
      } catch (error) {
        console.log('uploads 폴더가 없으므로 생성합니다.');
        /**
         * mkdirSync에서 경로를 지정할경우 recursive 옵션을 추가해야 한다. 아니면 에러
         * Error: ENOENT: no such file or directory, mkdir 'uploads/20200906'
         */
        fs.mkdirSync(path.join('uploads', 'origin', YYYYMMDD()), {
          recursive: true,
        });
        fs.mkdirSync(path.join('uploads', 'resize', YYYYMMDD()), {
          recursive: true,
        });
        fs.mkdirSync(path.join('uploads', 'final', YYYYMMDD()), {
          recursive: true,
        });
      } finally {
        done(null, 'uploads/origin/' + YYYYMMDD());
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

const uploadFiles = upload.array('addImages', 10);

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        // Too many images exceeding the allowed limit
        // ...
      }
    } else if (err) {
      // handle other errors
    }
    // Everything is ok.
    next();
  });
};
module.exports = { uploadImages };
