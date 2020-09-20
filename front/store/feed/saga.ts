import * as API from 'src/util/api';
import * as feed from 'store/feed';
// import * as egg from 'store/types';
import * as effects from 'redux-saga/effects';
import * as sagacore from 'redux-saga';

function* fetchHeartAdd(action) {
  try {
    const result = yield effects.call(API.addFeedHeart, action.payload);
    yield effects.put(
      feed.addFeedHeart({
        feedId: action.payload,
        userId: result.data.result.userId,
      }),
    );
  } catch (error) {
    console.log(error);
  } finally {
    yield effects.put(feed.setLoadingComment(false));
  }
}

function* fetchHeartDelete(action) {
  try {
    const result = yield effects.call(API.deleteFeedHeart, action.payload);
    yield effects.put(
      feed.deleteFeedHeart({
        feedId: action.payload,
        userId: result.data.userId,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

function* fetchCreateComment(action: feed.ReturnRequestCreateComment) {
  try {
    yield effects.put(feed.setLoadingComment(true));
    const result = yield effects.call(API.createComment, action.payload);
    yield effects.put(
      feed.addComment({
        feedId: action.payload.feedId,
        newComment: result.data.newComment,
      }),
    );
    yield effects.put(feed.successUploadComment(true));
    yield effects.delay(1.5 * 1000);
    yield effects.put(feed.successUploadComment(false));
  } catch (error) {
  } finally {
    yield effects.put(feed.setLoadingComment(false));
  }
}
function* fetchDeleteComment(action: feed.ReturnRequestDeleteComment) {
  try {
    yield effects.put(feed.setLoadingCommentDelete(true));
    const result = yield effects.call(API.deleteComment, action.payload);
    yield effects.delay(1.5 * 1000);
    yield effects.put(
      feed.deleteComment({
        feedId: result.data.feedId,
        commentId: result.data.commentId,
      }),
    );
  } catch (error) {
  } finally {
    yield effects.put(feed.setLoadingCommentDelete(false));
  }
}

function* fetchUpdateComment(action: feed.ReturnRequestUpdateComment) {
  try {
    yield effects.put(feed.setLoadingComment(true));
    const result = yield effects.call(API.updateComment, action.payload);
    yield effects.delay(1.5 * 1000);
    yield effects.put(
      feed.updateComment({
        feedId: result.data.feedId,
        updatedComment: result.data.updatedComment,
      }),
    );
    /**
     * 0. 셀렉트 코멘트 아이디 초기화
     * 1. 로딩-코멘트 초기화
     */
    yield effects.put(feed.setCommentIdForUD(0));
    yield effects.put(feed.setLoadingComment(false));
  } catch (error) {
    console.log(error);
    yield effects.put(feed.setLoadingComment(false));
  }
}
function* setAlertAutoOn(action) {
  try {
    if (action.payload === 'newFeed') {
      yield effects.put(feed.setAlertNewFeed(true));
      yield effects.delay(3 * 1000);
      yield effects.put(feed.setAlertNewFeed(false));
    }
    if (action.payload === 'paging') {
      yield effects.put(feed.setAlertPaging(true));
      yield effects.delay(3 * 1000);
      yield effects.put(feed.setAlertPaging(false));
    }
  } catch (error) {
    console.log(error);
  }
}
function* fetchMypageProfile(action) {
  try {
    const result = yield effects.call(API.mypageProfile, action.payload);
    yield effects.put(feed.setMypageProfile(result.data.mypageProfile));
  } catch (error) {
    console.dir(error);
  }
}

// ? 마이페이지 피드리스트
function* fetchMyPageFeedList(action) {
  try {
    yield effects.put(feed.setLoading(true));
    const result = yield effects.call(API.mypageFeedList, action.payload);
    yield effects.put(feed.setPaging(result.data.paging));
    yield effects.put(feed.setMypageFeedList(result.data.myFeedList));
    yield effects.put(feed.setLoading(false));
  } catch (error) {
    console.dir(error);
    yield effects.put(feed.setLoading(false));
  }
}
function* fetchHomeFeedList(action) {
  try {
    yield effects.put(feed.setLoading(true));
    const result = yield effects.call(API.homeFeedList, action.payload);
    yield effects.put(feed.setHomeFeedList(result.data.homeFeedList));
  } catch (error) {
    console.log(error);
  } finally {
    yield effects.put(feed.setLoading(false));
  }
}
function* fetchUploadImage(action) {
  try {
    const result = yield effects.call(API.uploadImage, action.payload);
    yield effects.put(feed.setUploadedImages(result.data.files));
  } catch (error) {}
}
function* fetchDeleteImage(action) {
  try {
    const result = yield effects.call(
      API.deleteSampleImage,
      action.payload.deleteImageUrl,
    );
    if (result?.data?.message) {
      yield effects.put(feed.removeUploadedImage(action.payload.index));
    }
  } catch (error) {
    console.log('사가:이미지삭제요청', error);
    yield effects.call(API.deleteSampleImage, action.payload);
  }
}
function* fetchUploadNewFeed(action) {
  try {
    yield effects.put(feed.setLoading(true));
    const result = yield effects.call(API.uploadNewFeed, action.payload);
    yield effects.delay(2 * 1000);
    if (result.data.message) yield effects.put(feed.successUploadNewFeed(true));
    yield effects.put(feed.addFeedListAtHome(result.data.newFeed));
    yield effects.put(feed.setLoading(false));
    yield effects.put(feed.successUploadNewFeed(false)); // 로딩 마무리 되면 성공닫기
  } catch (error) {
    console.log('사가 : 뉴 피드 업로드 에러', { error });
    yield effects.put(feed.setLoading(false));
  }
}
function* watchRequestUploadImage() {
  yield effects.takeLatest(feed.REQUEST_UPLOAD_IMAGE, fetchUploadImage);
}
function* watchRequestDeleteImage() {
  yield effects.takeLatest(feed.REQUEST_DELETE_IMAGE, fetchDeleteImage);
}
function* watchRequestUploadNewFeed() {
  yield effects.takeLatest(feed.REQUEST_UPLOAD_NEW_FEED, fetchUploadNewFeed);
}
function* watchRequestHomeFeedList() {
  yield effects.takeLatest(feed.REQUEST_FEED_LIST_HOME, fetchHomeFeedList);
}
function* watchRequestMyPageFeedList() {
  yield effects.throttle(
    1000,
    feed.REQUEST_FEED_LIST_MYPAGE,
    fetchMyPageFeedList,
  );
}
function* watchSetAlertAutoOn() {
  yield effects.takeLatest(feed.SET_ALERT_AUTO_ON, setAlertAutoOn);
}
function* watchRequestHeartAdd() {
  yield effects.takeLatest(feed.REQUEST_HEART_ADD, fetchHeartAdd);
}
function* watchRequestHeartDelete() {
  yield effects.takeLatest(feed.REQUEST_HEART_DELETE, fetchHeartDelete);
}
function* watchRequestCreateComment() {
  yield effects.takeLatest(feed.REQUEST_CREATE_COMMENT, fetchCreateComment);
}
function* watchRequestUpdateComment() {
  yield effects.takeLatest(feed.REQUEST_UPDATE_COMMENT, fetchUpdateComment);
}
function* watchRequestDeleteComment() {
  yield effects.takeLatest(feed.REQUEST_DELETE_COMMENT, fetchDeleteComment);
}
function* watchRequestMyPageProfile() {
  yield effects.takeLatest(feed.REQUEST_MYPAGE_PROFILE, fetchMypageProfile);
}
export default function* feedSaga(): sagacore.SagaIterator {
  yield effects.all([
    effects.fork(watchRequestCreateComment),
    effects.fork(watchRequestUpdateComment),
    effects.fork(watchRequestDeleteComment),
    effects.fork(watchRequestUploadImage),
    effects.fork(watchRequestDeleteImage),
    effects.fork(watchRequestUploadNewFeed),
    effects.fork(watchRequestHomeFeedList),
    effects.fork(watchRequestMyPageProfile),
    effects.fork(watchRequestMyPageFeedList),
    effects.fork(watchRequestHeartAdd),
    effects.fork(watchRequestHeartDelete),
    effects.fork(watchSetAlertAutoOn),
  ]);
}
