# cookie 사용하기

로컬스토리지,세션스토리지와 달리 쿠키는 클라이언트에서 서버로 요청시에 자동으로 쿠키를 포함하여 요청을 하게 된다. 서버에서는 쿠키에 담긴 정보를 확인하여 응답에 창고한다.

> JWT 토큰은 JS에서 접근할 수 있는 Localstorage보다 JS에서 접근할 수 없는 httponly cookie에 저장하는 것이 XSS 공격에 안전하다. ( JS를 페이지에서 쓸 수 없게 escaping을 잘 해두면 LocalStorage에 저장하더라도 XSS 공격을 막을 수 있다. )
> 단, CSRF 공격에 취약하기 때문에, CSRF 토큰을 만들어서 double checking을 통해 보안에 신경 쓸 필요가 있다.
> httponly cookie는 프론트가 아닌 서버에서 Response해줄 때 붙여준다.
> 출처: https://sjquant.tistory.com/22

하지만 서버사이드 렌더링에서는 요청에서 직접 쿠키를 넣어줘야 하니 빠뜨리지말도록!

- 쿠키는 key-value-pair로 저장됨, 로컬/세션과 동일
- 로그인유지, 최근 본 상품, 7일간 보지 않기 등의 기능에 사용
- 옵션은 만료기간/쿠키경루/쿠키도메인설정/프로토콜용으로만 사용가능 옵션 등
- 다른 브라우저에서 서로 호환되지 않음 == 브라우저에 저장되기 때문

로컬스토리지/세션스토리지는 서버사이드 렌더링에서 사용할수 없음으로 쿠키를 사용해 유저정보를 쿠키에 저장하도록 하는데, `cookie-parser` 모듈을 통해 편뤼하게 사용할 수 있으니. 모듈을 설취하자.

- 설치 : `npm i cookie-parser`

## 사용법

익스프레스와 함께 사용하는 법, 미들웨어를 등록하자!

- **주의!** : static 미들웨어 설정 보다 윗줄에 위치하도록 한다!

```js
// 모듈 임포트
const cookieParser = require('cookie-parsor');

//익스프레스 설정하기
app.use(cookieParser());
app.use('/', express.static()); // static설정보다 윗줄에 위치하도록!
app.get('/', (req, res) => {
  // 사용자로부터 받은 요청에서 쿠키 확인하기
  req.cookies[쿠키key이름];
  // 쿠키 에 대이터 저장하여 보내기
  res.cookie('키이름', '밸류', 옵션);
  res.cookie('키이름', '밸류', { maxAge: 30000 }); // 30초간 유지
});

app.get('/', (req, res) => {
  // read cookies
  console.log(req.cookies);
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
  };
  // Set cookie
  res.cookie('cookieName', 'cookieValue', options); // options is optional
  res.send('');
});
```

### 쿠키 옵션

쿠키는 영구적 쿠키/ 세션 쿠키로 구분된다.

- 영구적 쿠키 : 만료기간이 지정되어 있는 쿠키로 브라우저를 닫아도 만료기간까지 유지
- 세션 쿠키: 만료기간이 지정되지 않은 쿠키로, 브라우저를 다으면 사라짐

쿠키에 만료시간을 설정하지 않을경우 **세션쿠키**설정 됨!

- maxAge : 밀리초 단위로 만료시간 설정
- expires : 쿠키 만료시간 일 기준 설정 `365` ,
- path : 쿠키경로지정....?
- domain : 도메인지정
- secure: https 프로토콜만 쿠키사용가능
- httpOnly : http프로토콜(https포함)에서만 쿠키사용
- signed : 쿠키의 서명여루 결정

## 클라이언트에서 설정할것!

**클라이언트에서 사용할때는 옵션으로 `credentials` 을 설정해야 한다!**

```js
// 클라이언트에서 요청시 할것
var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
// 안되면 더 추가..ㅠ
// headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Credentials', 'true');

// application/x-www-form-urlencodedjson
return fetch('/your/server_endpoint', {
  method: 'POST',
  mode: 'same-origin',
  redirect: 'follow',
  credentials: 'include', // Don't forget to specify this if you need cookies
  headers: headers,
  body: JSON.stringify({
    first_name: 'John',
    last_name: 'Doe',
  }),
});
```

## 쿠키 생성&삭제 한눈에 보기

| 생성                                      | 삭제                                           |
| ----------------------------------------- | ---------------------------------------------- |
| res.cookie('키이름',값)                   | res.clearCookie('키이름')                      |
| res.cookie('키이름',값,{path:'패쓰값'})   | res.clearCookie('키이름',{path:'패쓰값'})      |
| res.cookie('키이름',값,{signed:'옵션값'}) | res.clearCookie('키이름',값,{signed:'옵션값'}) |

- 옵션과 함깨 설정했으면 동일 옵션으로 설정해서 지워야 한다!
