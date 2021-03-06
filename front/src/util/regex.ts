export const email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
export const phoneNumber = /^\d{3}-\d{3,4}-\d{4}$/;
// 가-힣a-zA-Z를 꼭 포함하고 띄어쓰기+가-힣a-zA-Z 의 1~50자리 대소문자 구분하지 않는 문자열
export const fullName = /^(?=.*[가-힣a-zA-Z])+[가-힣a-zA-Z\s]{1,50}$/i;
// (.) 연달아 사용 안되도록
// export const username = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
export const userName = /^(?=.*[a-z])(?!.*\.\.)(?!.*\.$)[a-z0-9._]{0,20}$/;
// export const username = /^(?=.*[a-z])[a-z0-9._]{2,20}$/i;
// 비밀번호 : 8~15자리 + 특수문자, 영어대소문자, 숫자 포함 형태
export const password = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

export const hashtag = /#[^\s#]+/gi;
export const hashtagSplit = /(#[^\s#]+)/gi;
