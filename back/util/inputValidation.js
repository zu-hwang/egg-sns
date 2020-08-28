const {
  emailRule,
  userNameRule,
  fullNameRule,
  phoneNumberRule,
  passwordRule,
} = require('./regex');

const userNameValidator = (str) => {
  return userNameRule.test(str);
};
const fullNameValidator = (str) => {
  return fullNameRule.test(str);
};

const emailValidator = (str) => {
  return emailRule.test(str);
};
const phoneNumberValidator = (str) => {
  return phoneNumberRule.test(str);
};
const passwordValidator = (str) => {
  return passwordRule.test(str);
};

const signUpValidater = ({
  userName,
  fullName,
  password,
  email = null,
  phoneNumber = null,
}) => {
  try {
    // throw new Error('억지 에러를 발생시킴');
    let result = {
      contact: null,
      fullName: null,
      userName: null,
      password: null,
    };
    console.log('회원가입-유효성검사');
    if (phoneNumber && !phoneNumberValidator(phoneNumber))
      result.contact = 'phoneNumberValidationFailed';

    if (!phoneNumber && email && !emailValidator(email))
      result.contact = 'emailValidationFailed';

    if (!fullNameValidator(fullName))
      result.fullName = 'fullNameValidationFailed';

    if (!passwordValidator(password))
      result.password = 'passwordValidationFailed';

    if (!userNameValidator(userName))
      result.userName = 'userNameValidationFailed';

    console.log('회원가입-유효성검사-끝');
    return Object.keys(result).filter((key) => result[key] !== null).length > 0
      ? result
      : null;
  } catch (error) {
    console.log('회원가입-유효성검사-에러');
    console.log({ error });
    return 'sign-up-validater-server-error';
  }
};

module.exports = {
  signUpValidater,
  emailValidator,
  userNameValidator,
  fullNameValidator,
  phoneNumberValidator,
  passwordValidator,
};
