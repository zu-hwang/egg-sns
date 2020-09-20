const fs = require('fs');
const path = require('path');
const resizeUrl = 'uploads/resize/20200913/P110028020200913071146.jpg';

const getUrlParts = (url) => {
  if (typeof url === 'string') {
    const [uploads, middle, date, filenames] = url.split('/');
    const [filename, ext] = filenames.split('.');
    return [uploads, middle, date, filename, ext];
  }
};

const getExt = (url) => {
  if (!url) throw new Error('getExt : 필수 입력 데이터 누락!!');
  if (url.includes('.')) url = url.split('.')[0];
  const [uploads, , date, filename] = getUrlParts(url);
  const originPathUrl = path.join(uploads, 'origin', date, filename);
  const extList = ['jpeg', 'jpg', 'gif', 'png'];
  const originalExt = extList.filter((ext) => {
    try {
      const fsResult = fs.readFileSync(originPathUrl + '.' + ext);
      return fsResult;
    } catch (err) {
      // console.log('-------------------', ext, '는 아니네~');
    }
  });
  return originalExt[0];
};

const getOriginUrl = (url) => {
  const pathWithFilename = url.split('.')[0];
  const ext = getExt(pathWithFilename);
  return [pathWithFilename.replace('resize', 'origin'), ext].join('.');
};

console.log(getOriginUrl(resizeUrl));

module.exports = { getExt, getOriginUrl, getUrlParts };
