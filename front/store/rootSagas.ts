import { all, fork } from 'redux-saga/effects';

import accountSaga from './account/saga';

export default function* rootSaga() {
  yield all([fork(accountSaga)]);
}
