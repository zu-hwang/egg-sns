// 프로필 수정  => 값 검사

const valid = require('../util/inputValidation');
const isValidationOk = (req, res, next) => {
  try {
    if (req.loginedUserId && req.body) {
      const keyList = [
        'userName',
        'fullName',
        'password',
        'email',
        'phoneNumber',
        'content',
        'imageUrl',
      ];
      // 데이터 유효검사
      const newBody = keyList.reduce((acc, key) => {
        // null 제외하고 객체에 담기 && boolean은 포함
        if (req.body[key] !== null) {
          if (valid[key](req.body[key])) acc[key] = req.body[key];
          return res.status(400).json({ message: key + ':validateError' });
        }
        return acc;
      }, {});
      console.log({ 미드웨어유효검사결과_뉴바디: newBody });
      next();
    }
  } catch (error) {
    console.log({ updateProfile: error });
  }
};

module.exports = {
  isValidationOk,
};
