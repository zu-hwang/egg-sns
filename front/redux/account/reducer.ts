import { Account } from './state';
import * as account from './actions';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: Account = {
  user: {
    id: 0,
    fullName: '',
    username: '',
    imageUrl: '',
    content: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
    /**
     * getXXXProps 함수가 있는 페이지를 열때마다 HYDRATE액션타입이 전달
     * 초기페이지 로드 & 일반 페이지 탐색 중 발생
     * HYDRATE이 payload는 정적생성 또는 서버측 렌더링 시잠의 상태가 포험!
     * 리듀서는 이 상태와 기존 클라이 언트 상태를 적절히 병합해야함.
     * 설명 : https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
     */
    case account.UPDATE_USER:
      return {
        ...state,
      };
    case account.DELETE_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
