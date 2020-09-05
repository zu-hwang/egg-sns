const { User } = require('./../src/db/models/');
const { Op } = require('sequelize').Op;

const profileInspactor = async (req, res, next) => {
  try {
    if (req && req.newBody) {
      const newBodyList = Object.keys(req.newBody);
      const overlap = await User.findAll({
        where: {
          [Op.or]: {
            userName: req.newBody.userName,
            email: req.newBody.email,
            phoneNumber: req.newBody.phoneNumber,
          },
        },
      });
      console.log({ overlap });
      if (overlap.length > 0)
        return res.status(400).json({ message: 'overlapError : 미들웨어' });
      // if (overlapList.length > 0)
      //   return res
      //     .status(400)
      //     .json({ message: 'overlapError', overlap: overlapList });
      // // next();
      // console.log('끝');
      next();
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = { profileInspactor };
