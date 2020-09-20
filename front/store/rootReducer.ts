import * as egg from 'store/types';
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, AnyAction } from 'redux';
import { initialState as accountInitialState } from 'store/account/reducer';
import { initialState as feedInitialState } from 'store/feed/reducer';
import { initialState as navInitialState } from 'store/nav/reducer';
import accountReducer from 'store/account/reducer';
import feedReducer from 'store/feed/reducer';
import navReducer from 'store/nav/reducer';

export const storeInitialState = {
  account: accountInitialState,
  feed: feedInitialState,
  nav: navInitialState,
};

export const RESET_ROOT_STATE = 'root/RESET_ROOT_STATE';
export const resetRootState = (): { type: typeof RESET_ROOT_STATE } => ({
  type: RESET_ROOT_STATE,
});
const rootReducer = (
  state: egg.StoreState = storeInitialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case HYDRATE: // 서버사이드에서 사요옹
      return action.payload;
    case RESET_ROOT_STATE:
      console.log('리셋!');
      return (state = { ...storeInitialState });
    default: {
      const combineReducer = combineReducers({
        account: accountReducer,
        feed: feedReducer,
        nav: navReducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
