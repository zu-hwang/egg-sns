import produce from 'immer';
import * as account from 'store/account';
import * as egg from 'store/types';

export const initialState: egg.Account = {
  user: null,
  isLogedIn: false,
  signUpSuccess: false,
  logInSuccess: false,
  signUpError: { code: null, message: null },
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case account.SET_LOADING:
        // console.log('set_loadeing', action.payload);
        draft.isLoading = action.payload;
        break;
      case account.SUCCESS_SIGN_UP:
        draft.signUpError = { code: null, message: null };
        draft.signUpSuccess = true;
        break;
      case account.FAILURE_SIGN_UP:
        draft.signUpError = action.payload;
        break;
      case account.SUCCESS_LOG_IN:
        draft.logInSuccess = true;
        break;
      case account.SUCCESS_LOG_OUT:
        draft.logInSuccess = false;
        break;
      case account.UPDATE_USER_DATA:
        draft.user = action.payload;
        break;
      case account.RESET_SUCCESS:
        draft.signUpSuccess = false;
        draft.logInSuccess = false;
        break;
      default:
        break;
    }
  });
};

export default reducer;
