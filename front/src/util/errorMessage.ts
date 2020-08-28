const errorMessageMap = {
  // ['missing-required-data']: '필수데이터 누락',
  // ['sign-up-validater-error']: '서버 입력필드 유효성 검사 오류',
  // ['overlap-data-inspactor-error']: '유니크 데이터 검사 오류',
  ['fullNameValidationFailed']: '영문/한글 1-20자 이내 입력하세요.',
  ['passwordValidationFailed']:
    '영대소문자, 숫자, 특수문자 혼합 8-20자로 입력하세요.',
  ['phoneNumberValidationFailed']: '012-3456-7890 형식으로 입력하세요.',
  ['emailValidationFailed']: '올바른 이메일 형식이 아닙니다.',
  ['userNameValidationFailed']: '올바른 사용자명이 아닙니다.',
  ['phoneNumberOverlap']: '이미 사용중인 연락처입니다.',
  ['userNameOverlap']: '이미 사용중인 사용자 이름입니다.',
  ['emailOverlap']: '이미 사용중인 이메일입니다.',
};

export type ErrorMessageMap = typeof errorMessageMap;
export default errorMessageMap;
