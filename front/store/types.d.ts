import { Store } from 'redux';
import { Task } from 'redux-saga';
export * as account from './account/state';
export * as accountActions from './account';
//  각 앱의 타입설정 내보내기

/** @루트_스토어 인터페이스 */
export interface StoreState {
  account: account.Account;
}
/** @루트_스토어 타입 */
export type StoreState = { account: account.Account };

/** @루트_사가_스토어 타입 */
export interface SagaStore extends Store {
  sagaTask?: Task;
}
/** @루트_리듀서 타입 */
export type RootReducer = typeof import('./rootReducer').default;

/** @계정 회원가입 `signUpError_:_message` 타입 */
export type SignUpErrorMessage =
  | string
  | {
      userName: string | null;
      contact: string | null;
      fullName: string | null;
      password: string | null;
    };

/** @계정 회원가입 `signUpError` 인터페이스*/
export interface SignUpError {
  code: number | null;
  message: SignUpErrorMessage | null;
}

/** @계정 로그인 유저정보 `user` 인터페이스*/
export interface User {
  id: number;
  userName: string;
  email: string | null;
  phoneNumber: string | null;
  fullName: string;
  imageUrl: string | null;
  content: string | null;
  secretMode: boolean;
}

/** @계정 전체상태 `account` 인터페이스*/
export interface Account {
  user: User | null;
  // token: string | null;
  isLogedIn: boolean;
  logInSuccess: boolean;
  signUpSuccess: boolean;
  signUpError: SignUpError;
  isLoading: boolean;
}

/** @계정 액션생성자 `requestSignUp` 의 `payload:Props`인터페이스  */
export interface RequestSignUpData {
  userName: string;
  password: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
}
/** @계정 액션생성자 `requestSignUp` 의 `Return` 인터페이스  */
export interface ReturnRequestSignUp {
  type: typeof accountActions.REQUEST_SIGN_UP;
  payload: RequestSignUpData;
}
/** @계정 액션생성자 `setLoading` 의 `Return` 인터페이스  */
export interface ReturnSetLoading {
  type: typeof accountActions.SET_LOADING;
  payload: boolean;
}
/** @계정 액션생성자 `setSignUpError` 의 `Return` 인터페이스  */
export interface ReturnSetSignUpError {
  type: typeof accountActions.FAILURE_SIGN_UP;
  payload: {
    code: number | null;
    message: state.SignUpErrorMessage | null;
  };
}
/** @계정 액션생성자 `successSignUp` 의 `Return` 인터페이스  */
export interface ReturnSuccessSignUp {
  type: typeof accountActions.SUCCESS_SIGN_UP;
}
/** @계정 액션생성자 `successLogIn` 의 `Return` 인터페이스  */
export interface ReturnSuccessLogIn {
  type: typeof accountActions.SUCCESS_LOG_IN;
}
/** @계정 액션생성자 `RequestLogin` 의 `payload:Props` 인터페이스  */
export interface RequestLoginData {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password: string;
}
/** @계정 액션생성자 `RequestLogIn` 의 `Return` 인터페이스  */
export interface ReturnRequestLogIn {
  type: typeof accountActions.REQUEST_LOG_IN;
  payload: RequestLoginData;
}

/** @계정 액션생성자 `updateUserData` 의 `Return` 인터페이스  */
export interface ReturnUpdateUserData {
  type: typeof accountActions.UPDATE_USER_DATA;
  payload: state.User | null;
}
/** @계정 액션생성자 `requestUserData` 의 `Return` 인터페이스  */
export interface ReturnRequestUserData {
  type: typeof accountActions.REQUEST_USER_DATA;
}

/** @계정 액션생성자 `resetSuccess` 의 `Return` 인터페이스  */
export interface ReturnResetSuccess {
  type: typeof accountActions.RESET_SUCCESS;
}
