const {
  emailRule,
  userNameRule,
  fullNameRule,
  phoneNumberRule,
  passwordRule,
} = require('./regex');

const userName = (str) => {
  return userNameRule.test(str);
};
const fullName = (str) => {
  return fullNameRule.test(str);
};

const email = (str) => {
  return emailRule.test(str);
};
const phoneNumber = (str) => {
  return phoneNumberRule.test(str);
};
const password = (str) => {
  return passwordRule.test(str);
};
const contact = (str) => {
  if (phoneNumberRule.test(str)) return true;
  if (emailRule.test(str)) return true;
  return false;
};
const userId = (str) => {
  if (userNameRule.test(str)) return true;
  if (phoneNumberRule.test(str)) return true;
  if (emailRule.test(str)) return true;
  return false;
};

const signUpErrorDetail = (body) => {
  // body = {}
  try {
    // throw new Error('억지 에러를 발생시킴');
    let result = {
      contact: null,
      email: null,
      phoneNumber: null,
      fullName: null,
      userName: null,
      password: null,
    };
    console.log('회원가입-유효성검사');
    if (body.email && !email(body.email))
      result.email = 'emailValidationFailed';
    if (body.phoneNumber && !phoneNumber(body.phoneNumber))
      result.phoneNumber = 'phoneNumberValidationFailed';
    if (body.contact && !contact(body.contact))
      result.contact = 'contactValidationFailed';
    if (!fullName(body.fullName)) result.fullName = 'fullNameValidationFailed';
    if (!password(body.password)) result.password = 'passwordValidationFailed';
    if (!userName(body.userName)) result.userName = 'userNameValidationFailed';
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
const signUp = (body) => {
  if (!contact(body.contact)) return 'validationError';
  if (!fullName(body.fullName)) return 'validationError';
  if (!email(body.email)) return 'validationError';
  if (!phoneNumber(body.phoneNumber)) return 'validationError';
  if (!userName(body.userName)) return 'validationError';
  return null;
};

const content = (str) => {
  if (str.length > 250) return str.slice(0, 250);
  return str;
};
const imageUrl = (str) => {
  console.log('이미지 유효검사', str);
  return str;
};

module.exports = {
  userName,
  fullName,
  email,
  phoneNumber,
  contact,
  userId,
  password,
  content,
  imageUrl,
  signUp,
  signUpErrorDetail,
};
