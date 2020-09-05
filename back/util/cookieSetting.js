const HOUR = 1000 * 60 * 60;

module.exports = {
  defaultOption: {
    httpOnly: true,
    // signed:true
  },
  expiresOption: {
    expires: new Date(Date.now + 1 * HOUR),
    httpOnly: true,
  },
};
