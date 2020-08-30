import * as rules from 'src/util/regex';
import { ForID } from 'src/components/ui/AccountInput';

export type KeyName =
  | 'userName'
  | 'email'
  | 'phoneNumber'
  | 'contact'
  | 'userId';
export interface ReturnCheckLoginInputValid {
  result: boolean;
  keyName?: KeyName;
}
export const checkLoginInputValid = (
  userId: string,
  password: string,
): ReturnCheckLoginInputValid => {
  // password 입력 확인
  if (rules.password.test(password)) {
    checkLoginContactMode(userId);
    // if (rules.userName.test(userId)) return { result: true, keyName: 'userName' };
    // if (rules.email.test(userId)) return { result: true, keyName: 'email' };
    // if (rules.phoneNumber.test(userId))
    //   return { result: true, keyName: 'phoneNumber' };
    // return { result: false };
  }
  return { result: false };
};

export const checkLoginContactMode = (
  userId: string,
): ReturnCheckLoginInputValid => {
  if (rules.userName.test(userId)) return { result: true, keyName: 'userName' };
  if (rules.email.test(userId)) return { result: true, keyName: 'email' };
  if (rules.phoneNumber.test(userId))
    return { result: true, keyName: 'phoneNumber' };
  return { result: false };
};

export const checkInput = (value: string, forID: ForID) => {
  switch (forID) {
    case 'user-contact':
      return rules.email.test(value) || rules.phoneNumber.test(value);
    case 'user-fullName':
      return rules.fullName.test(value);
    case 'user-name':
      return rules.userName.test(value);
    case 'user-password':
      return rules.password.test(value);
    default:
      return false;
  }
};

export const seperateKeyName = (
  mode: 'contact' | 'userId',
  value: string,
): KeyName => {
  if (
    mode === 'userId' &&
    rules.userName.test(value) &&
    !rules.phoneNumber.test(value) &&
    !rules.email.test(value)
  )
    return 'userName';

  if (!rules.email.test(value) && rules.phoneNumber.test(value))
    return 'phoneNumber';
  if (rules.email.test(value) && !rules.phoneNumber.test(value)) return 'email';
  return mode;
};

export const submitSignUp = (
  contact: string,
  fullName: string,
  userName: string,
  password: string,
): boolean => {
  if (
    (rules.email.test(contact) || rules.phoneNumber.test(contact)) &&
    rules.fullName.test(fullName) &&
    rules.userName.test(userName) &&
    rules.password.test(password)
  )
    return true;
  return false;
};

export const submitLogIn = (userId: string, password: string): boolean => {
  if (
    (rules.email.test(userId) ||
      rules.phoneNumber.test(userId) ||
      rules.userName.test(userId)) &&
    rules.password.test(password)
  )
    return true;
  return false;
};
