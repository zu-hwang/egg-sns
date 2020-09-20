const fs = require('fs');
const path = require('path');
const { getUrlParts, getExt } = require('./getUploadImageUrl');

const resize = (url) => {
  const [uploads, , date, filename] = getUrlParts(url);
  const fullFilename = filename + '.jpg';
  resizeUrl = path.join(uploads, 'resize', date, fullFilename);
  fs.unlink(resizeUrl, (err) => {
    if (err) {
      console.log(url, '의 샘플리사이징 삭제 실패');
    }
  });
};
const origin = (url) => {
  const [uploads, , date, filename] = getUrlParts(url);
  const ext = getExt(url);
  const fullFilename = filename + '.' + ext;
  originUrl = path.join(uploads, 'origin', date, fullFilename);
  fs.unlink(originUrl, (err) => {
    if (err) {
      console.log(url, '의 오리지날 삭제 실패');
    }
  });
};
const final = (url) => {
  const [uploads, , date, filename, ext] = getUrlParts(url);
  const fullFilename = filename + '.jpg';
  finalUrl = path.join(uploads, 'final', date, fullFilename);
  fs.unlink(finalUrl, (err) => {
    if (err) {
      console.log(url, '의 최종파일 삭제 실패');
    }
  });
};

module.exports = {
  resize,
  origin,
  final,
};
