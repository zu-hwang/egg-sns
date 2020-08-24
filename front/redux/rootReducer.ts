// import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

// 리듀서 불러오기
import accountReducer from './account/reducer';

// 리듀서의 타입 불러오기
// import { Account } from './account/state';

export default combineReducers({
  // index: (state = {}, action) => {
  //   // HYDRATE 추가
  //   switch (action.type) {
  //     case HYDRATE:
  //       console.log('HYDRATE', action);
  //       return { ...state, ...action.payload };
  //       default:
  //         return : state;
  //   }
  // },
  account: accountReducer,
});
