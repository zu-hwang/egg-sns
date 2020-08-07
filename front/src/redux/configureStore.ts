// next에서 간편하게 리덕스 설정을 도와주는 라이브러리 사용
// provider 사용하지 않고 HOC wrapper를 사용한다
import createWrapper from 'next-redux-wrapper';
import { createStore } from 'redux';
import rootReducer from './rootReducer';

const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
