# redux

## duck style 작성법

액션-타입, 액션-생성자-함수, 리듀서를 한곳에 작성

- ~~액션-타입 : 내보내기 안함~~
- ~~액션-생성자-함수 : export 내보내기~~
- ~~리듀서 : export default 내보내기~~
- 코드가 너무 길고 복잡해저서 분리함!

## redux-logger

콘솔로그에 호출 액션생성자 함수와 처리 값을 찍어준다. 데브툴로 보지 않고 콘솔로 간편하게 볼수 있다.

## redux-thunk

액션크리에이터 함수가 객체를 반환하는 것이 아닌 함수를 반환하도록 만들수 있다. 보통 비동기 처리를 할때 사용하는데, 서버에 데이터패치 한뒤 이후 처리를 분기하여 다음 리듀서를 지정하는데 사용한다.
해당 라이브러리 코드는 15줄 밖에 안되는 .. 매우 짧음.. !

```js
// redux-thunk 코드
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

## redux-saga

thunk의 발전형 미들웨어 라고 생각해도 될까나~? 간단한 구현은 thunk로 충분히 구현되지만 조금 복잡해 지기 시작하면 saga 사용을 추천한다!

비동기처리 이외에 추가되는 기능들이 있다.

- Throttle : 마지막 함수가 호출된 후 일정시간 지나기 전까지 호출되지 않도록함.(즉, 마지막 호출 후 지정시간 홀드)
- Debounce : 연이어 호출되는 함수들중 마지막 함수(또는 첫 함수) 만 호출하도록 하는 것

위에 언급한 쓰로틀/디바운스를 지원하기 때문에 셀프 디도스(무한 서버 호출공격)을 막아주는 기능도 있다.

> react에서만 사용할때는 [redux-saga](https://redux-saga.js.org/)를 사용하고 SSR-next에서 사용할 경우 [nex-redux-saga](https://github.com/bmealhouse/next-redux-saga)를 추가 사용한다.
>
> - `npm i redux-saga next-redux-saga`

### 폴더구조

- src
  - redux
    - store.js
      - saga-middleware 생성
      - store 생성 시 saga-middleware 적용
      - saga-middleware 실행
  - sagas
    - index.js : rootSaga + 그 밖에 saga함수들 정의

### `src/sagas` : 사가함수 구현

- `rootSaga`만 `export default` 함
  - `all` 이펙트로 모든 시작점의 사가-함수를 배열에 담아 `rootSaga`를 구성

### side-effects

[`redux-saga` 공식문서 effect-creators](https://redux-saga.js.org/docs/api/)

- `all([사가함수1, 사가함수2,...])`
  - 사가함수 시작점을 배열로 전달
  - 동시 병력구조로 실행
- `put(action)` : `dispatch()`와 동일한 역할
  - 디스패치에 action(`{type,payload}`형태의 객체, 즉, 액션-생성자-함수 리턴) 객체전달 전달하여 리듀서를 실행
  - `put(channel, action)` :
  - 블럭되지 않도록 유의하여 사용
  - 비동기
- `take(타입)` : 특정액션 감시 용도
  - **블럭 이펙트** : 동기 실행
  - 하지만 무한루프에서 블럭을 할때는 `take`보다 `takeEvery/takeLatest/takeLeading`을 사용
  - `*`를 인자로 넣어 모든 타입에 적용할 수 있음
- `takeEvery(pattern, 사가함수, ...args)`
  - 1번 인자의 타입일 경우, 2번 인자의 사가함수 실행
  - 1번 인자는 `string | array | function` 가능
  - redux-thunk와 가장 유사한 동작을 함.. ?
- `takeLeading(pattern, 사가함수, ...args)`
  - 쓰로틀 개념 ??
  - **최초 요청이 완료될 때까지 요청 차단**, 완료 후 신규요청 받음
- `takeLatest(pattern, 사가함수, ...args)`
  - `takeEvery`와 동일하지만, 여러번 요청시 **이전 요청 자동취소, 제일 마지막 요청만 수행**
  - 디바운스 지원??
- `takeMaybe` : take와 동일하지만 saga를 종료하지 않음 (?)
  - 모든 사가는 `END` 오브젝트를 얻음
- `fork(사가함수)` : 새로운 하위 saga-task 생성
  - 비동기
  - 생성시점에서 호출 사가함수는 부모 task가 됨
  - fork된 사가함수가 자식 task가 됨
  - 부모 task가 취소 될 경우, 자식 task도 취소
  - 특정 자식 task만 취소 가능
- `call(사가함수or사가task)` : fork와 동일하지만, **fork+블럭 이펙트=call**
  - `call(fn, ...args)` 와 같이 API를 직접하지 않고, `call` 이펙트를 사용하여 테스트-코드 작성할때 사용한다.
  - 페치는 promise를 반환하여 디버깅이 어렵, `call`은 일반 객체 반환
  - **블럭 이펙트** : 동기 실행 (즉, 순서대로 함수실행해야 하는 API요청에 쓰임)
  - 인자는 사가함수 or 사가 task를 받음
  - 사가 task는 **사가함수의 리턴 값**을 나타냄
  - 보통 Promise 실행에 쓰이며, Promise-resolve 될 때까지 블럭상태
- `select(selector, ...args)`
  - redux의 state를 가져올때 사용하는 이펙트
  - 인자 없이 사용할 경우 `getState()`와 동일효과
  - **블럭 이펙트** : 동기 실행
- `delay(ms, [val])` : `ms` 동안 실행차단하고, 값을 반환
- `race({key1:사이드이팩트(), key2:사이드이팩트()})`
  - `race`는 인자를 객체로 전달하며 각 키를 동시에 시작하여
  - 먼저 완료되는 것 하나만 다음 단계로, **나머지 실행은 자동 취소**
- `throttle(ms, pattern, saga, ...args)`
  - `ms` 동안 **신규 요청을 막음**
  - `fork, actionChannel, take, delay`를 사용하여 구현한 고급 API
- `debounce(ms, pattern, saga, ...args)`
  - `ms` : 작업이 실행된 이후 최소 경과해야 하는 시간
- `retry(maxTries, delay, fn, ...args)`
  - `fn`을 `args` 인수로 호출하도록 지시
  - 실패할경우 `delay` 간격으로 최대 `maxTries` 번 시도
- `cps`
- `actionChannel` : 대기죽인 작업의 버퍼 제공
- `flush` : 버퍼링된 모든 항목 플러쉬
- `spawn` : `fork`의 완전 분리형?
- `join(task)` : 이전 분기된 작업의 결과를 기다리도록 지시하는 효과
- `cancel(task)` : 이전 분기된 작업을 취소하도록 지시
- `cancelled` : 생성기가 취소되었는지 여부 반환

### side-effect의 동기/비동기

#### Blocking(동기)

- `retry`
- `take`
- `takeMaybe`
- `putResolve`
- `call`
- `apply`
- `cps`
- `join`
- `flush`
- `cancelled`
- `race`
- `delay`

#### Non-Blocking(비동기)

- `takeEvery`
- `takeLatest`
- `takeLeading`
- `throttle`
- `debounce`
- `put`
- `put(channel, action)`
- `fork`
- `spawn`
- `cancel`
- `select`
- `actionChannel`

#### 상황에따라 다름

- `all`
- `take(channel)`
