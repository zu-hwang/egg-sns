// next에서 간편하게 리덕스 설정을 도와주는 라이브러리 사용
// provider 사용하지 않고 HOC wrapper를 사용한다
import createWrapper from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'next-redux-saga';
// 리덕스에서 비동기 액션을 하도록 도와줌 => 비동기 1개에 동기함수 여러개 연결가능
// thunk 또는 saga를 쓰게 됨.
// import thunk from 'redux-thunk';
// import logger from 'redux-thunk';
import rootReducer from './rootReducer';
import rootSaga from '../sagas';

const preloadedState = {};
const configureStore = (preloadedState, { isServer, req = null }) => {
  // redux-saga 설정
  const sagaMiddleware = createSagaMiddleware();

  const enhancer =
    // 프로덕션모드일때 redux-devtools-extension 사용안함
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(sagaMiddleware))
      : composeWithDevTools(applyMiddleware(sagaMiddleware));

  // redux-saga를 사용할경우 초기상태값(=preloadedState)를 꼭 추가한다!
  const store = createStore(rootReducer, preloadedState, enhancer);

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
