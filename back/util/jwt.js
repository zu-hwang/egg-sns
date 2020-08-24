const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const createJWT = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, {
      algorithm: process.env.ALGORITHM,
    });
  } catch (error) {
    console.log(error);
  }
};

const decodeJWT = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY, {
      algorithm: process.env.ALGORITHM,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * NPM - jsonwebtoken 설명 참고
 * https://www.npmjs.com/package/jsonwebtoken
 */

module.exports = {
  createJWT,
  decodeJWT,
};
