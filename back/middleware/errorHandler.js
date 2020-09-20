module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  console.error(err.stack);
  // return res.status(500).json({ message: 'serverError' });
};
