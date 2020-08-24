const bcrypt = require('bcrypt');

const hashPW = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 12);
};

const matchPW = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};
module.exports = { hashPW, matchPW };
