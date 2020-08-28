import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, AnyAction } from 'redux';
import * as egg from 'store/types';
import { initialState as accountInitialState } from './account/reducer';
// 리듀서 불러오기
import accountReducer from './account/reducer';

// 리듀서의 타입 불러오기
// import { Account } from './account/state';

export const storeInitialState = {
  account: accountInitialState,
};

/**
 * getXXXProps에서 로드&수정 된 스토어를 HYDRATE를 통해 받는다.
 * 문제 : 루트리듀서에서 HYDRATE를 index, 분할된 리듀서를 combineReducers()했을때, index안에 중복된 스토어가 생성된다... 심지어 여러번 되기도 함!..?왜?
 * 해결 : 루트리듀서를 생성할때 combineReducers가 아닌 확장된형태, 내부 수정이 가능하도록 로직을 작성해야 한다. 즉 ... combineReducer쓰지말고, 작성했!.. 흠.. 만약 리듀서 내부라면, 갠찬은데, 루트리듀서에서 작성하려니..
 * 참고링크 : https://github.com/kirill-konshin/next-redux-wrapper#app-and-getserversideprops-or-getstaticprops-at-page-level
 * 만약 SSR와 SSG를 함께 사용한다면 서버측과 클라이언트측 스토어를 분리한다
 */

const rootReducer = (
  state: egg.StoreState = storeInitialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case HYDRATE:
      console.log('하이드레이트', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        account: accountReducer,
      });
      return combineReducer(state, action);
    }
  }
};

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
