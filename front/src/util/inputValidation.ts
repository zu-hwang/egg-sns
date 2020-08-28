import { ForID } from 'src/components/ui/AccountInput';
import {
  emailRule,
  phoneNumberRule,
  fullNameRule,
  userNameRule,
  passwordRule,
} from 'src/util/regex';

export const checkSignUpInputValid = (
  otherContact: string,
  fullName: string,
  userName: string,
  password: string,
): boolean => {
  if (
    (emailRule.test(otherContact) || phoneNumberRule.test(otherContact)) &&
    fullNameRule.test(fullName) &&
    userNameRule.test(userName) &&
    passwordRule.test(password)
  ) {
    return true;
  } else {
    return false;
  }
};

export type KeyName = 'userName' | 'email' | 'phoneNumber';
export interface ReturnCheckLoginInputValid {
  result: boolean;
  keyName?: KeyName;
}
export const checkLoginInputValid = (
  userId: string,
  password: string,
): ReturnCheckLoginInputValid => {
  // password 입력 확인
  if (passwordRule.test(password)) {
    if (userNameRule.test(userId)) return { result: true, keyName: 'userName' };
    if (emailRule.test(userId)) return { result: true, keyName: 'email' };
    if (phoneNumberRule.test(userId))
      return { result: true, keyName: 'phoneNumber' };
    return { result: false };
  }
  return { result: false };
};

export const checkInput = (value: string, forID: ForID) => {
  switch (forID) {
    case 'user-otherContact':
      return emailRule.test(value) || phoneNumberRule.test(value);
    case 'user-fullName':
      return fullNameRule.test(value);
    case 'user-name':
      return userNameRule.test(value);
    case 'user-password':
      return passwordRule.test(value);
    default:
      return false;
  }
};

export const seperateContact = (value: string): 'email' | 'phoneNumber' => {
  if (emailRule.test(value)) return 'email';
  return 'phoneNumber';
};
