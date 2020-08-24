import { ForID } from 'src/components/ui/AccountInput';
import {
  emailRule,
  phoneNumberRule,
  fullnameRule,
  usernameRule,
  passwordRule,
} from 'src/util/regex';

export const checkSignUpInputValid = (
  otherContact: string,
  fullname: string,
  username: string,
  password: string,
): boolean => {
  if (
    (emailRule.test(otherContact) || phoneNumberRule.test(otherContact)) &&
    fullnameRule.test(fullname) &&
    usernameRule.test(username) &&
    passwordRule.test(password)
  ) {
    return true;
  } else {
    return false;
  }
};

export const checkLoginInputValid = (
  userId: string,
  password: string,
): boolean => {
  if (
    passwordRule.test(password) &&
    (usernameRule.test(userId) ||
      emailRule.test(userId) ||
      phoneNumberRule.test(userId))
    // username이 유저네임 일때
    // username이 이메일 일때
    // username이 핸드폰 번호일때
  ) {
    return true;
  } else {
    return false;
  }
};

export const checkInput = (value: string, forID: ForID) => {
  switch (forID) {
    case 'user-otherContact':
      return emailRule.test(value) || phoneNumberRule.test(value);
    case 'user-fullname':
      return fullnameRule.test(value);
    case 'user-name':
      return usernameRule.test(value);
    case 'user-password':
      return passwordRule.test(value);
    default:
      return false;
  }
};
