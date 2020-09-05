const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const create = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, {
      algorithm: process.env.ALGORITHM,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const decode = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY, {
      algorithm: process.env.ALGORITHM,
    }).id;
  } catch (error) {
    console.log(error);
  }
};

/**
 * NPM - jsonwebtoken 설명 참고
 * https://www.npmjs.com/package/jsonwebtoken
 */

module.exports = {
  create,
  decode,
};
