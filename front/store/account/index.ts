import * as egg from 'store/types';

export const REQUEST_SIGN_UP = 'account/REQUEST_SIGN_UP';
export const SUCCESS_SIGN_UP = 'account/SUCCESS_SIGN_UP';
export const FAILURE_SIGN_UP = 'account/FAILURE_SIGN_UP';
export const REQUEST_LOG_IN = 'account/REQUEST_LOG_IN';
export const SUCCESS_LOG_IN = 'account/SUCCESS_LOG_IN';
export const FAILURE_LOG_IN = 'account/FAILURE_LOG_IN';
export const REQUEST_USER_DATA = 'account/REQUEST_USER_DATA';
export const UPDATE_USER_DATA = 'account/UPDATE_USER_DATA';
export const REQUEST_LOG_OUT = 'account/REQUEST_LOG_OUT';
export const SUCCESS_LOG_OUT = 'account/SUCCESS_LOG_OUT';
export const SET_LOADING = 'account/SET_LOADING';
export const RESET_SUCCESS = 'account/RESET_SUCCESS';
export const SET_COOKIE_EXPIRY = 'account/SET_COOKIE_EXPIRY';

// 1. 회원가입 요청 > 요청
export const requestSignUp = (
  bodyData: egg.RequestSignUpData,
): egg.ReturnRequestSignUp => {
  return { type: REQUEST_SIGN_UP, payload: bodyData };
};

// 2. 비동기 진행중 상태값 isLoging
export const setLoading = (bool: boolean): egg.ReturnSetLoading => {
  return { type: SET_LOADING, payload: bool };
};

// 4. 회원가입 실패시 상태코드/에러메세지 상태값에 저장
export const setSignUpError = (payload: {
  code: number | null;
  message: egg.SignUpErrorMessage | null;
}): egg.ReturnSetSignUpError => {
  return { type: FAILURE_SIGN_UP, payload };
};

// 5. 회원가입 성공
export const successSignUp = (): egg.ReturnSuccessSignUp => {
  return { type: SUCCESS_SIGN_UP };
};

// 6. 로그인
export const successLogIn = (): egg.ReturnSuccessLogIn => {
  return { type: SUCCESS_LOG_IN };
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
