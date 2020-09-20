import * as egg from 'store/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import rootSaga from 'store/rootSagas';
import rootReducer from 'store/rootReducer';
import createSagaMiddleware from 'redux-saga';

const configureStore: MakeStore<egg.StoreState> = (context: Context) => {
  // ! context에는 req:IncomingMessage, res:ServerResponse, query 있음
  // 1. 사가 미들웨어 생성 & 미들웨어 목록 작성
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  // 2. 환경에 따른 미들웨어 설정
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  // 3. 스토어 생성
  const store = createStore(rootReducer, enhancer);
  // 4. 사가 or 서버 띄우기
  (store as egg.SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper<egg.StoreState>(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});
