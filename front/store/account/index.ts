import * as egg from 'store/types';

export const REQUEST_LOG_IN = 'account/REQUEST_LOG_IN';
export const REQUEST_LOG_OUT = 'account/REQUEST_LOG_OUT';
export const REQUEST_SIGN_UP = 'account/REQUEST_SIGN_UP';
export const REQUEST_USER_DATA = 'account/REQUEST_USER_DATA';
export const REQUEST_INPUT_VALID = 'account/REQUEST_INPUT_VALID';
export const REQUEST_COOKIE_EXPIRY = 'account/REQUEST_COOKIE_EXPIRY';
export const SUCCESS_SIGN_UP = 'account/SUCCESS_SIGN_UP';
export const SUCCESS_LOG_IN = 'account/SUCCESS_LOG_IN';
export const SUCCESS_LOG_OUT = 'account/SUCCESS_LOG_OUT';
export const FAILURE_SIGN_UP = 'account/FAILURE_SIGN_UP';
export const FAILURE_LOG_IN = 'account/FAILURE_LOG_IN';
export const RESET_SUCCESS = 'account/RESET_SUCCESS';
export const UPDATE_USER_DATA = 'account/UPDATE_USER_DATA';
export const SET_LOADING = 'account/SET_LOADING';
export const SET_VALID_MASSAGE_ = 'account/SET_VALID_MASSAGE_';
export const SET_VALID_MASSAGE_EMAIL = 'account/SET_VALID_MASSAGE_EMAIL';
export const SET_VALID_MASSAGE_USERID = 'account/SET_VALID_MASSAGE_USERID';
export const SET_VALID_MASSAGE_CONTACT = 'account/SET_VALID_MASSAGE_CONTACT';
export const SET_VALID_MASSAGE_USERNAME = 'account/SET_VALID_MASSAGE_USERNAME';
export const SET_VALID_MASSAGE_FULLNAME = 'account/SET_VALID_MASSAGE_FULLNAME';
export const SET_VALID_MASSAGE_PASSWORD = 'account/SET_VALID_MASSAGE_PASSWORD';
export const SET_VALID_MASSAGE_PHONENUMBER =
  'account/SET_VALID_MASSAGE_PHONENUMBER';

// 1. 회원가입 요청 > 요청
interface RequestSignUpProps {
  userName: string;
  password: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  contact?: string;
}
export const requestSignUp = (
  bodyData: RequestSignUpProps,
): egg.ReturnRequestSignUp => ({
  type: REQUEST_SIGN_UP,
  payload: bodyData,
});

// 2. 비동기 진행중 상태값 isLoging

export const setLoading = (bool: boolean): egg.ReturnSetLoading => ({
  type: SET_LOADING,
  payload: bool,
});

// 4. 회원가입 실패시 상태코드/에러메세지 상태값에 저장
interface SetSignUpErrorProps {
  code: number | null;
  message: egg.InputErrorMessage | null;
}
export const setSignUpError = (
  payload: SetSignUpErrorProps,
): egg.ReturnSetSignUpError => ({ type: FAILURE_SIGN_UP, payload });

// 5. 회원가입 성공
export const successSignUp = (): egg.ReturnSuccessSignUp => ({
  type: SUCCESS_SIGN_UP,
});

// 6. 로그인
export const successLogIn = (): egg.ReturnSuccessLogIn => {
  return { type: SUCCESS_LOG_IN };
};
// 6-1. 로그인 실패시 상태코드/에러메세지 상태값에 저장
export const setLogInError = (payload: {
  code: number;
  message: egg.InputErrorMessage;
}): egg.ReturnSetLogInError => {
  return { type: FAILURE_LOG_IN, payload };
};

// 7. 로그인 요청 > 사가
export const requestLogIn = (
  payload: egg.RequestLoginData,
): egg.ReturnRequestLogIn => {
  return { type: REQUEST_LOG_IN, payload };
};

// 8. 유저정보 업데이트
export const updateUserData = (
  payload: egg.User | null,
): egg.ReturnUpdateUserData => {
  return { type: UPDATE_USER_DATA, payload };
};
// 9. 유저정보 요청 > 사가
export const requestUserData = (): egg.ReturnRequestUserData => {
  return { type: REQUEST_USER_DATA };
};

export const resetSuccess = (): egg.ReturnResetSuccess => {
  return { type: RESET_SUCCESS };
};

export const requestInputValid = (
  payload: egg.RequestInputValidData,
): egg.ReturnRequestInputValid => {
  return { type: REQUEST_INPUT_VALID, payload };
};

export const setValidMessage = (payload: {
  type: string;
  payload: string;
}): { type: string; payload: string } => {
  return {
    type: payload.type,
    payload: payload.payload,
  };
};

// ! 쿠키 만료연장 리퀘스트 작성하기
export const requestCookieExpiry = (): egg.ReturnRequestCookieExpiry => {
  return {
    type: REQUEST_COOKIE_EXPIRY,
  };
};
