import * as sagacore from '@redux-saga/core';
import * as API from 'src/util/api';
import * as egg from 'store/types';
import * as account from 'store/account';
import * as root from 'store/rootReducer';
import * as effects from 'redux-saga/effects';

function* fetchRecommand() {
  try {
    const result = yield effects.call(API.recommandUser);
    yield effects.put(account.setRecommandList(result.data.recommandList));
  } catch (error) {
    console.log(error.response);
  }
}
function* fetchFollow(action: {
  type: typeof account.REQUEST_FOLLOW;
  payload: number;
}) {
  try {
    yield effects.put(account.setLoading(true));
    yield effects.call(API.follow, action.payload);
    yield effects.put(account.setFollowStatus(action.payload));
  } catch (error) {
    console.log(error.response);
  } finally {
    yield effects.put(account.setLoading(false));
  }
}
function* fetchUnFollow(action: {
  type: typeof account.REQUEST_UN_FOLLOW;
  payload: number;
}) {
  try {
    yield effects.put(account.setLoading(true));
    yield effects.call(API.unFollow, action.payload);
    yield effects.put(account.setFollowStatus(action.payload));
  } catch (error) {
    console.log(error.response);
  } finally {
    yield effects.put(account.setLoading(false));
  }
}
function* fetchInputValid(action: egg.ReturnRequestInputValid) {
  try {
    const result = yield effects.call(API.inputValidation, action.payload);
    const keyName = action.payload.keyName.toUpperCase();
    const newType = account.SET_VALID_MASSAGE_ + keyName;
    const newPayload = {
      type: newType,
      payload: result.data.message,
    };
    yield effects.put(account.setValidMessage(newPayload));
  } catch (error) {
    console.log(error.response);
  }
}
function* fetchCookieExpiry(action: egg.ReturnRequestCookieExpiry) {
  try {
    yield effects.put(account.setLoading(true));
    yield effects.call(API.cookieExpiry);
    yield effects.delay(2 * 1000);
    yield effects.put(account.setLoading(false));
  } catch (error) {
    console.log(error.response);
    yield effects.put(account.setLoading(false));
  }
}
function* fetchUserData(action: egg.ReturnRequestUserData) {
  try {
    yield effects.put(account.setLoading(true));
    const result = yield effects.call(API.loadUserData);
    if (result.data && result.data.user) {
      yield effects.put(account.updateUserData(result.data.user));
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield effects.put(account.setLoading(false));
  }
}

function* fetchLogOut(action: egg.ReturnRequestLogOut) {
  try {
    yield effects.put(account.setLoading(true));
    const result = yield effects.call(API.logOut);
    if (result.status === 200) {
      yield effects.put(root.resetRootState());
    }
  } catch (error) {
    console.log(error.response);
    yield effects.put(account.setLoading(false));
  }
}
function* fetchLogIn(action: egg.ReturnRequestLogIn) {
  try {
    yield effects.put(account.setLoading(true));
    const result = yield effects.call(API.logIn, action.payload);
    yield effects.put(account.updateUserData(result.data.user));
    yield effects.put(account.successLogIn());
    yield effects.put(account.setLoading(false));
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      yield effects.put(
        account.setLogInError({
          code: error.response.status,
          message: error.response.data.message,
        }),
      );
    }
    if (!error.response)
      yield effects.put(
        account.setLogInError({
          code: 500,
          message: error.message,
        }),
      );
    yield effects.put(account.setLoading(false));
  }
}

function* fetchSignUp(action: egg.ReturnRequestSignUp) {
  try {
    yield effects.put(account.setLoading(true));
    /* const result =  */ yield effects.call(API.signUp, action.payload);
    yield effects.put(account.successSignUp());
    yield effects.put(account.setLoading(false));
  } catch (error) {
    if (error.response) {
      console.dir(error.response);
      yield effects.put(
        account.setSignUpError({
          code: error.response.status,
          message: error.response.data.message,
        }),
      );
    }
    if (!error.response)
      yield effects.put(
        account.setSignUpError({ code: 500, message: error.message }),
      );
    yield effects.put(account.setLoading(false));
  }
}

function* watchReqeustRecommand() {
  yield effects.takeLatest(account.REQUEST_RECOMMAND, fetchRecommand);
}
function* watchReqeustFollow() {
  yield effects.takeLatest(account.REQUEST_FOLLOW, fetchFollow);
}
function* watchReqeustUnFollow() {
  yield effects.takeLatest(account.REQUEST_UN_FOLLOW, fetchUnFollow);
}
function* watchRequestUserData() {
  yield effects.takeLatest(account.REQUEST_USER_DATA, fetchUserData);
}
function* watchReqeustLogIn() {
  yield effects.takeLatest(account.REQUEST_LOG_IN, fetchLogIn);
}
function* watchReqeustLogOut() {
  yield effects.takeLatest(account.REQUEST_LOG_OUT, fetchLogOut);
}
function* watchRequestSignUp() {
  yield effects.takeLatest(account.REQUEST_SIGN_UP, fetchSignUp);
}
function* watchSetCookieExpriry() {
  yield effects.takeLatest(account.REQUEST_COOKIE_EXPIRY, fetchCookieExpiry);
}
function* watchReqeustInputValid() {
  // take()는 일회용 이기 때문에  while+take를 해야함
  // effects.takeLatest() 마지막 응답만 실행 (완료된것 말고 동시 로딩중인것만)
  // takeLeading() 맨 처음 응답 실행..
  // 결국은 응답 받는거만 취소하는 것이기 때문에
  // 백엔등서는 요청을 취소하는 일을 별개로 해야함 !
  // throttle(ms,액션타입,사가액션)로 설정하면 지정 ms까지는 요청을 안함
  // yield throttle(2 * 1000, account.REQUEST_INPUT_VALID, fetchInputValid);
  yield effects.takeLatest(account.REQUEST_INPUT_VALID, fetchInputValid);
}

export default function* eggSaga(): sagacore.SagaIterator {
  yield effects.all([
    effects.fork(watchRequestSignUp),
    effects.fork(watchReqeustLogIn),
    effects.fork(watchReqeustLogOut),
    effects.fork(watchRequestUserData),
    effects.fork(watchSetCookieExpriry),
    effects.fork(watchReqeustInputValid),
    effects.fork(watchReqeustFollow),
    effects.fork(watchReqeustUnFollow),
    effects.fork(watchReqeustRecommand),
  ]);
}

/**
 * 1. all로 앱루트사가의 실행할 함수 설정
 * 2. take로 해당 액션이 이 호출될떼 실행할 사가함수 설정
 * 3. 사가함수 내에서 api 호출을 effects.call또는 fork함수로 실행.~ 이후 받은데이터는 4번진행
 * 4. 3에서 비동기 데이터 받은 뒤 put(리덕스 디스패치기능)을 통해 액션타입 & 페이로드 데이터를 전달
 * 5. 4에서 비동기 로직 구현할때 try,catch로 감싸 예외처리하기
 */

// effects.call : 동기로 함수실행   > async,await처럼 구현
// fork : 비동기로 함수실행 > promise.then처럼 구현
