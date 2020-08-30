const errorMessageMap = {
  // ['missing-required-data']: '필수데이터 누락',
  // ['sign-up-validater-error']: '서버 입력필드 유효성 검사 오류',
  // ['overlap-data-inspactor-error']: '유니크 데이터 검사 오류',
  // API/valitaion
  ['fullNameValidationFailed']: '영문/한글 1-20자 이내 입력하세요.',
  ['passwordValidationFailed']:
    '영문, 숫자, 특수문자 혼합 8-20자로 입력하세요.',
  ['phoneNumberValidationFailed']: '잘못된 형식 입니다.',
  ['emailValidationFailed']: '잘못된 형식 입니다.',
  ['userNameValidationFailed']: '사용할 수 없는 사용자명 입니다.',
  // API/Signup-defail : 이전 사용내역
  ['phoneNumberOverlap']: '이미 사용중인 연락처입니다.',
  ['userNameOverlap']: '이미 사용중인 사용자 이름입니다.',
  ['emailOverlap']: '이미 사용중인 이메일입니다.',
  ['notMatchingKeyName']: '키네임 확인해랏',
  ['validationError']: {
    // ? API/Signup : 현재 적용내역
    'user-contact': '이메일/휴대폰 번호 형식 맞지 않음',
    'user-fullName': '한글/영문/공백 포함 최대 20자 구성',
    'user-name': '특수문자(.)(_)와 2-20자 구성',
    'user-password': '영문/숫자/특수문자 포함 8-20자 구성',
  },
  ['overlapError']: {
    // ? API/Signup : 현재 적용내역
    'user-contact': '이미 사용중인 연락처',
    'user-name': '이미 사용중인 사용자 이름',
    'user-id': '이미 사용중인 사용자 이름',
  },
  ['serverError']: '서버에러닷!',
};

export type ErrorMessageMap = typeof errorMessageMap;
export default errorMessageMap;
