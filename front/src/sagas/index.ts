import { all, fork, take, call, put } from 'redux-saga/effects';
import axios from 'axios';

// ! 사가 함수 작성

// ! rootSaga만 내보내기함
export default function* rootSaga() {
  yield all([]);
}
