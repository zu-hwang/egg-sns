import * as effects from 'redux-saga/effects';
import accountSaga from './account/saga';
import feedSaga from './feed/saga';

export default function* rootSaga() {
  yield effects.all([effects.fork(accountSaga), effects.fork(feedSaga)]);
}
