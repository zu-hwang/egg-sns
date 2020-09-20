import produce from 'immer';
import * as account from 'store/account';
import * as egg from 'store/types';

export const initialState: egg.Account = {
  user: null, // 로그인(쿠키 토큰 확인한) 유저정보
  signUpSuccess: false, // 회원가입 후 > 쿠키저장 안내용
  signUpError: null, // 로그인/회원가입 에러 { code: null, message: null },
  logInSuccess: false, // 로그인 후 > 쿠키저장 안내용
  logInError: null, // 로그인/회원가입 에러 { code: null, message: null },
  userIdValidMessage: null, // 로그인 유저네임 인풋 확인용, { code: null, message: null },
  emailValidMessage: null, // 이메일 인풋 확인용, { code: null, message: null },
  phoneNumberValidMessage: null, // 폰넘버 인풋 확인용, { code: null, message: null },
  contactValidMessage: null, // 연락처(회원가입) 인풋 확인용, { code: null, message: null },
  userNameValidMessage: null, // 유저네임 인풋 확인용, { code: null, message: null },
  passwordValidMessage: null, // 유저네임 인풋 확인용, { code: null, message: null },
  fullNameValidMessage: null, // 풀네임 인풋 확인용, { code: null, message: null },
  isLoading: false,
  recommandList: [],
};

type Action =
  | ReturnType<typeof account.requestFollow>
  | ReturnType<typeof account.requestUnFollow>
  | ReturnType<typeof account.requestSignUp>
  | ReturnType<typeof account.setLoading>
  | ReturnType<typeof account.setSignUpError>
  | ReturnType<typeof account.successSignUp>
  | ReturnType<typeof account.successLogIn>
  | ReturnType<typeof account.setLogInError>
  | ReturnType<typeof account.requestLogIn>
  | ReturnType<typeof account.requestLogOut>
  | ReturnType<typeof account.successLogOut>
  | ReturnType<typeof account.updateUserData>
  | ReturnType<typeof account.requestUserData>
  | ReturnType<typeof account.resetSuccess>
  | ReturnType<typeof account.requestInputValid>
  | ReturnType<typeof account.setValidMessage>
  | ReturnType<typeof account.setRecommandList>
  | ReturnType<typeof account.setFollowStatus>
  | ReturnType<typeof account.requestCookieExpiry>;

const reducer = (state = initialState, action: Action) => {
  return produce<egg.Account>(state, (draft) => {
    switch (action.type) {
      case account.SET_LOADING:
        draft.isLoading =
          typeof action.payload === 'boolean'
            ? action.payload
            : draft.isLoading;
        break;
      case account.SUCCESS_SIGN_UP:
        draft.signUpError = initialState.signUpError;
        draft.signUpSuccess = true;
        break;
      case account.FAILURE_SIGN_UP:
        // if (action.payload && typeof action.payload !== 'string')
        draft.signUpError = action.payload as egg.InputError;
        break;
      case account.FAILURE_LOG_IN:
        if (typeof action.payload !== 'string')
          draft.logInError = action.payload;
        break;
      case account.SUCCESS_LOG_IN:
        draft.logInError = initialState.logInError;
        draft.logInSuccess = true;
        break;
      case account.SUCCESS_LOG_OUT:
        // 로그아웃 성공. 모든 데이터 초기화
        draft = initialState;
        break;
      case account.UPDATE_USER_DATA:
        draft.user = action.payload;
        break;

      // ? 쿠키저장 or 쿠키저장안함 이후 리셋
      case account.RESET_SUCCESS:
        draft.signUpError = initialState.signUpError;
        draft.signUpSuccess = initialState.signUpSuccess;
        draft.logInError = initialState.logInError;
        draft.logInSuccess = initialState.logInSuccess;
        draft.contactValidMessage = initialState.contactValidMessage;
        draft.userNameValidMessage = initialState.userNameValidMessage;
        draft.fullNameValidMessage = initialState.fullNameValidMessage;
        draft.passwordValidMessage = initialState.passwordValidMessage;
      // ? 실시간 인풋 유효 체크용
      case account.SET_VALID_MASSAGE_USERID:
        draft.userIdValidMessage =
          typeof action.payload === 'string' || action.payload === null
            ? action.payload
            : draft.userIdValidMessage;
        break;
      case account.SET_VALID_MASSAGE_CONTACT:
        draft.contactValidMessage = action.payload;
        break;
      case account.SET_VALID_MASSAGE_EMAIL:
        draft.emailValidMessage = action.payload;
        break;
      case account.SET_VALID_MASSAGE_PHONENUMBER:
        draft.phoneNumberValidMessage = action.payload;
        break;
      case account.SET_VALID_MASSAGE_USERNAME:
        draft.userNameValidMessage = action.payload;
        break;
      case account.SET_VALID_MASSAGE_PASSWORD:
        draft.passwordValidMessage = action.payload;
        break;
      case account.SET_VALID_MASSAGE_FULLNAME:
        draft.fullNameValidMessage = action.payload;
        break;
      case account.SET_RECOMMAND_LIST:
        if (action.payload.length > 0) {
          draft.recommandList = (action.payload as egg.IRecommand[]).map(
            (item) => ({ ...item, followStatus: false }),
          );
        } else {
          draft.recommandList = action.payload as [];
        }
        break;
      case account.SET_FOLLOWSTATUS:
        draft.recommandList.forEach((RCMUser, index) => {
          if (RCMUser.id === (action.payload as number)) {
            draft.recommandList[index].followStatus = !draft.recommandList[
              index
            ].followStatus;
          }
        });
        break;
    }
  });
};

export default reducer;
