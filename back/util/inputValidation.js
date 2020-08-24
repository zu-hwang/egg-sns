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
    console.log('회원가입-유효성검사');
    if (!fullNameValidator(fullName)) return 'fullName-Validation-failed';
    if (!passwordValidator(password)) return 'password-Validation-failed';
    if (phoneNumber && !phoneNumberValidator(phoneNumber))
      return 'phoneNumber-Validation-failed';
    if (email && !emailValidator(email)) return 'email-Validation-failed';
    if (!userNameValidator(userName)) return 'userName-Validation-failed';
    return true;
  } catch (error) {
    console.log({ error });
    return 'error';
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
