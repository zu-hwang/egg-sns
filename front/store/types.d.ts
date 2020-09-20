import { Store, AnyAction } from 'redux';
import { Task } from 'redux-saga';
import * as account from 'store/account';
import * as nav from 'store/nav';
import { AnyAction } from 'redux';
//  각 앱의 타입설정 내보내기

/** @루트_스토어 인터페이스 */
export interface StoreState {
  account: Account;
  feed: Feed;
  nav: nav.INav;
}

/** @루트_사가_스토어 타입 */
export interface SagaStore extends Store {
  sagaTask?: Task;
}

/** @루트_리듀서 타입 */
export type RootReducer = typeof import('./rootReducer').default;

export /** @계정 회원가입 `signUpError_:_message` 타입 */
type InputErrorMessage =
  | {
      userName: string | null;
      contact: string | null;
      fullName: string | null;
      password: string | null;
    }
  | string;

export interface InputError {
  code: number;
  message: InputErrorMessage;
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
  updatedAt: string;
}

export interface ICommentLike {
  id: number;
}
export interface ICommentOnlyId {
  id: number;
}
export interface IComment {
  id: number;
  Author: {
    id: number;
    userName: string;
  };
  content: string;
  createdAt: string;
  CommentLike: ICommentLike[] | [];
}
export interface ILike {
  id: number;
}
export interface IFeedImage {
  id: number;
  url: string;
  category?: 'photo' | 'video';
}
export interface IFeed {
  id: number;
  content: string;
  createdAt: string;
  Author: {
    id: number;
    userName: string;
    imageUrl: string | null;
  };
  Images: IFeedImage[]; //  널 절대 안됨
  FeedLike: ILike[] | []; // 빈배열 또는 내부값..
  Comments: IComment[] | []; // 빈배열 또는 내부값..
}

export interface IMypageImage extends IFeedImage {}

export interface IMypageFeed {
  id: number;
  Images: IMypageImage[];
  FeedLike: ILike[] | []; // 카운팅용
  Comments: ICommentOnlyId[] | []; // 카운팅용
}

export interface IPageUser {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string | null;
  fullName: string;
  imageUrl: string | null;
  content: string | null;
  secretMode: boolean;
}
export interface IRelation {
  id: number;
}
// export interface IMypageFeedList {
//   paging: number;
//   myFeedList: IMypageFeed[];
// }

export interface IMypageProfile {
  id: number;
  userName: string;
  email: string;
  imageUrl: string;
  content: string;
  secretMode: boolean;
  feedCount: number;
  follower: IRelation[];
  following: IRelation[];
}
/** @Feed 전체상태 `feed` Store 인터페이스*/
export interface Feed {
  modalNewFeed: boolean;
  modalDetailMypage: boolean;
  newFeedAlert: boolean;
  pagingAlert: boolean;
  deleteCommentAlert: boolean;
  successNewFeed: boolean;
  successComment: boolean;
  uploadedImages: string[];
  paging: number | null;
  homeFeedList: IFeed[] | [];
  loading: boolean;
  loadingComment: boolean;
  loadingCommentDelete: boolean;
  mypageProfile: IMypageProfile | null;
  mypageFeedList: IMypageFeed[] | [];
  selectedCommentId: number | null;
  deletedCommentId: number | null;
}

export interface IRecommand {
  id: number;
  userName: string;
  imageUrl: string;
  type: 'Random' | 'New' | 'Follower' | 'Target';
  xFriend?: string[];
  followStatus?: boolean;
}

/** @계정 전체상태 `account` 인터페이스*/
export interface Account {
  user: User | null;
  signUpSuccess: boolean;
  logInSuccess: boolean;
  signUpError: InputError | null;
  logInError: InputError | null;
  userIdValidMessage: string | null;
  contactValidMessage: string | null;
  phoneNumberValidMessage: string | null;
  emailValidMessage: string | null;
  userNameValidMessage: string | null;
  passwordValidMessage: string | null;
  fullNameValidMessage: string | null;
  isLoading: boolean;
  recommandList: IRecommand[] | [];
}

/** @계정 액션생성자 `requestSignUp` 의 `payload:Props`인터페이스  */
export interface RequestSignUpData {
  userName: string;
  password: string;
  fullName: string;
  constact?: string;
  email?: string;
  phoneNumber?: string;
}
/** @계정 액션생성자 `requestSignUp` 의 `Return` 인터페이스  */
export interface ReturnRequestSignUp {
  type: typeof account.REQUEST_SIGN_UP;
  payload: RequestSignUpData;
}
/** @계정 액션생성자 `setLoading` 의 `Return` 인터페이스  */
export interface ReturnSetLoading {
  type: typeof account.SET_LOADING;
  payload: boolean;
}
/** @계정 액션생성자 `setSignUpError` 의 `Return` 인터페이스  */
export interface ReturnSetSignUpError {
  type: typeof account.FAILURE_SIGN_UP;
  payload: {
    code: number | null;
    message: InputErrorMessage | null;
  };
}
export interface ReturnSetLogInError {
  type: typeof account.FAILURE_LOG_IN;
  payload: {
    code: number;
    message: InputErrorMessage;
  };
}
/** @계정 액션생성자 `successSignUp` 의 `Return` 인터페이스  */
export interface ReturnSuccessSignUp {
  type: typeof account.SUCCESS_SIGN_UP;
}
/** @계정 액션생성자 `successLogIn` 의 `Return` 인터페이스  */
export interface ReturnSuccessLogIn {
  type: typeof account.SUCCESS_LOG_IN;
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
  type: typeof account.REQUEST_LOG_IN;
  payload: RequestLoginData;
}
export interface ReturnRequestLogOut {
  type: typeof account.REQUEST_LOG_OUT;
}

/** @계정 액션생성자 `updateUserData` 의 `Return` 인터페이스  */
export interface ReturnUpdateUserData {
  type: typeof account.UPDATE_USER_DATA;
  payload: state.User | null;
}
/** @계정 액션생성자 `requestUserData` 의 `Return` 인터페이스  */
export interface ReturnRequestUserData {
  type: typeof account.REQUEST_USER_DATA;
}

/** @계정 액션생성자 `resetSuccess` 의 `Return` 인터페이스  */
export interface ReturnResetSuccess {
  type: typeof account.RESET_SUCCESS;
  payload?: string;
}

/** @계정 액션생성자 'requestInputValidation' 의 `payload:Props` 인터페이스 */
export interface RequestInputValidData {
  keyName:
    | 'contact'
    | 'userId'
    | 'email'
    | 'phoneNumber'
    | 'userName'
    | 'fullName'
    | 'password';
  value: string;
}
/** @계정 액션생성자 'requestInputValidation' 의 `Return` 인터페이스 */
export interface ReturnRequestInputValid {
  type: typeof account.REQUEST_INPUT_VALID;
  payload: RequestInputValidData;
}

/** @계정 액션생성자 'setValidMessageXXX' 의 `payload:Props` 인터페이스 */
export interface SetValidMessageData {
  message: string;
}

export interface ReturnRequestCookieExpiry {
  type: typeof account.REQUEST_COOKIE_EXPIRY;
}
