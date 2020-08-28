import { createStore, applyMiddleware, compose } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// 루트리듀서 & 사가
import rootSaga from 'store/rootSagas';
import rootReducer from 'store/rootReducer';
import { StoreState, SagaStore } from 'store/types';

const configureStore: MakeStore<StoreState> = (context: Context) => {
  // 1. 사가 미들웨어 생성 & 미들웨어 목록 작성
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  // 2. 환경에 따른 미들웨어 설정
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  // 3. 스토어 생성
  const store: SagaStore = createStore(rootReducer, enhancer);
  // 4. 사가 or 서버 띄우기
  // (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  // 5. 스토어 내보내기
  console.log('스토어 확인 : ', { store });
  return store;
};

const wrapper = createWrapper<StoreState>(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
