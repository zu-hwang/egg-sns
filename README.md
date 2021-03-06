<img src=https://i.ibb.co/pPwZRZ9/instagram-snap.jpg width='640' height='360' alt='인스타그램클론스냅샷'/>

# egg-sns
egg-sns는 **eungeegee-sns**의 약자이며 (홀로 북치고 장구치며 백/프론트엔드를 기능을 구현한..) 인스타그램 클론 프로젝트입니다.
2020.08.18 이후 현재까지, 야금야금 작성 중 입니다.

## 사용 기술 및 구현기능
### front-end
#### 사용기술
- typescript
- react hooks
- next
- redux & redux-saga
- styled-components
#### 구현기능
- 화면구성 : styled-components 사용
- 회원가입 기능 : 실시간 입력() 유효검사 및 중복검사 실행하여 화면표시
- 로그인 기능 : 로그인 성공 시 JWT 쿠키에 저장하여 사용자 확인
- 사진 게시글 작성
  - 인스타그램 PC버전에 없는 새 글 작성 기능 추가
  - FormData를 사용하여 사진 첨부 기능 구현
  - 최대사진 3장 포함 게시글 작성 가능하며, 사진 추가 & 제거 가능하도록 구현
  - 사진 여러 장 등록할 경우 슬라이드 화면 구성
- 댓글 작성/수정/삭제 기능
- 팔로우 추가/삭제 기능
- 게시글 좋아요/취소 기능
- 해쉬태그 게시글에 반영

### back-end
#### 사용기술
- node.js
- express : node 프레임워크
- sequelize + mysql  : DB ORM 
- bcrypt : 비밀번호 해쉬 암호화
- JWT : 로그인 인증 처리
- multer & sharp : 이미지파일 처리
- REST API

#### 구현기능
- sequelise ORM을 이용한 DB 모델링
- multer & sharp 모듈을 사용한 이미지 리사이징과 이미지 파일 관리
  - 오리지널/샘플리사이징/최종리사이징 구분하여 관리
  - 최종 DB 저장 or 삭제 요청 시 데이터 수정/삭제하여 데이터 관리
- API 구현
  - 회원가입 & 로그인 : 비밀번호 bcrypt 해쉬 암호처리 및 JWT 로그인 인증 (SSR구현으로 쿠키에 JWT 저장 및 사용)
  - 홈 화면 피드리스트 & 마이페이지 피드리스트 출력 및 페이징 구현
  - 친구관계에 따른 친구추천 목록 구성 
  - 팔로우 & 언팔로우 기능
  - 좋아요 & 좋아요 취소 기능
  - 새 글 작성 내용에서 해쉬태그 추출 & DB저장
