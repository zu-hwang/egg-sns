import { SagaIterator } from '@redux-saga/core';
import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import * as API from 'src/util/api';
import * as egg from 'store/types';
import * as account from 'store/account';

function* fetchCookieExpiry() {
  try {
    console.log('쿠키 만료시간 늘려서 저장해주세용!😘');
  } catch (error) {
    console.dir(error);
  }
}
function* fetchUserData(action: egg.ReturnRequestUserData) {
  try {
    console.log('유저데이터 업데이트');
    yield put(account.setLoading(true));
    const result = yield call(API.loadUserData);
    console.log('유저데이터 출력', result.data.user);
    yield put(account.updateUserData(result.data.user));
    yield put(account.setLoading(false));
  } catch (error) {
    console.dir('유저데이터 패치(fetchUserData) 에러 : ', error);
    yield put(account.setLoading(false));
  }
}

function* fetchLogIn(action: egg.ReturnRequestLogIn) {
  try {
    console.log('로그인 리퀘스트 시작!');
    yield put(account.setLoading(true));
    const result = yield call(API.logIn, action.payload);
    console.log('로그인 리퀘스트 결과', { result });
    yield put(account.updateUserData(result.data.user));
    yield put(account.successLogIn());
    yield put(account.setLoading(false));
  } catch (error) {
    console.dir('로그인 패치(fetchLogIn) 에러 : ', error);
    yield put(account.setLoading(false));
  }
}

function* fetchSignUp(action: egg.ReturnRequestSignUp) {
  try {
    yield put(account.setLoading(true));
    const result = yield call(API.signUp, action.payload);
    // 상태코드 200-300 일때
    console.log(typeof result, '결과', result);
    yield put(account.setLoading(false));
    yield put(account.successSignUp());
  } catch (error) {
    // 상태코드 400-500 일때

    console.dir('회원가입 패치(fetchSignUp) 에러 : ', error);
    if (error.response)
      yield put(
        account.setSignUpError({
          code: error.response.status,
          message: error.response.data.message,
        }),
      );
    if (!error.response)
      yield put(account.setSignUpError({ code: 500, message: error.message }));
    // 2. 로딩 완료로 변경
    yield put(account.setLoading(false));
  }
}

function* watchRequestUserData() {
  yield takeLatest(account.REQUEST_USER_DATA, fetchUserData);
}
function* watchReqeustLogIn() {
  yield takeLatest(account.REQUEST_LOG_IN, fetchLogIn);
}
function* watchRequestSignUp() {
  yield takeLatest(account.REQUEST_SIGN_UP, fetchSignUp);
}
function* watchSetCookieExpriry() {
  yield takeLatest(account.REQUEST_SIGN_UP, fetchCookieExpiry);
}

export default function* eggSaga(): SagaIterator {
  yield all([
    fork(watchRequestSignUp),
    fork(watchReqeustLogIn),
    fork(watchRequestUserData),
    fork(watchSetCookieExpriry),
  ]);
}

/**
 * 1. all로 앱루트사가의 실행할 함수 설정
 * 2. take로 해당 액션이 이 호출될떼 실행할 사가함수 설정
 * 3. 사가함수 내에서 api 호출을 call또는 fork함수로 실행.~ 이후 받은데이터는 4번진행
 * 4. 3에서 비동기 데이터 받은 뒤 put(리덕스 디스패치기능)을 통해 액션타입 & 페이로드 데이터를 전달
 * 5. 4에서 비동기 로직 구현할때 try,catch로 감싸 예외처리하기
 */

// call : 동기로 함수실행   > async,await처럼 구현
// fork : 비동기로 함수실행 > promise.then처럼 구현
