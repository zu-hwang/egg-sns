import * as sagacore from '@redux-saga/core';
import * as API from 'src/util/api';
import * as feed from 'store/feed';
import * as effects from 'redux-saga/effects';

function* fetchUploadImage(action) {
  try {
    console.log('사가 : 업로드이미지');
    const result = yield effects.call(API.uploadImage, action.payload);
    yield effects.put(feed.setUploadedImages(result.data.files));
  } catch (error) {
    console.log('사가:이미지업로드', error);
    console.dir(error);
  }
}
function* fetchUploadNewFeed(action) {
  try {
    console.log('사가 : 뉴 피드 업로드');
    const result = yield effects.call(API.uploadNewFeed, action.payload);
    // yield effects.put(feed.setUploadedImages(result.data.files));
    console.log({ result });
  } catch (error) {
    console.log('사가 : 뉴 피드 업로드 에러', error);
    console.dir(error);
  }
}
function* watchRequestUploadImage() {
  yield effects.takeLatest(feed.REQUEST_UPLOAD_IMAGE, fetchUploadImage);
}
function* watchRequestUploadNewFeed() {
  yield effects.takeLatest(feed.REQUEST_UPLOAD_NEW_FEED, fetchUploadNewFeed);
}
export default function* feedSaga(): sagacore.SagaIterator {
  yield effects.all([
    effects.fork(watchRequestUploadImage),
    effects.fork(watchRequestUploadNewFeed),
  ]);
}
