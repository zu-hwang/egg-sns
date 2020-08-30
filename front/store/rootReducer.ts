import * as egg from 'store/types';
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, AnyAction } from 'redux';
import { initialState as accountInitialState } from './account/reducer';
import accountReducer from './account/reducer';

export const storeInitialState = {
  account: accountInitialState,
};

const rootReducer = (
  state: egg.StoreState = storeInitialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case HYDRATE: // 서버사이드에서 사요옹
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        account: accountReducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
