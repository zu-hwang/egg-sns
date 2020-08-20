// nextjs에서 이미지 모듈화를 위한 패키지
const withImages = require('next-images');

module.exports = withImages({
  webpack: (config) => {
    return config;
  },
});
