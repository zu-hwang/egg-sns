import {
  FOLLOW,
  UN_FOLLOW,
  LOG_IN,
  LOG_OUT,
  REQUEST_USER_DATA,
  REQUEST_FOLLOW,
  REQUEST_UN_FOLLOW,
} from './actionTypes';

import { UserData } from '../types';
// 액션 타입지정 내보내기 없음, 해당파일에서만 사용한다
// ? as const 키워드를 사용하여 타입지정
// ? 추후 액션-생성-함수를 통해 액션객체를 만들었을때 type이 string이 아닌 실제값을 가르킨다!
// :string 사용이 아닌 as const 사용한다는 것 잊지말기!

// 액션 생성자 함수 = export 하기

export const follow = (folloUserData: UserData) => {
  return {
    type: FOLLOW,
    payload: folloUserData, // 상대방 유저아이디
  };
};
export const unFollow = (unFollowUserId: number) => {
  return {
    type: UN_FOLLOW,
    payload: unFollowUserId, // 상대방 유저아이디
  };
};
export const login = (userData: UserData) => {
  // 패치 진행 이후 유저데이터 추가
  return {
    type: LOG_IN,
    payload: userData,
  };
};
export const logout = () => {
  return {
    type: LOG_OUT,
  };
};
export const requestFollow = (folloUserId: number) => {
  return {
    type: REQUEST_FOLLOW,
    payload: folloUserId, // 상대방 유저아이디
  };
};
export const requestUnFollow = (unFollowUserId: number) => {
  return {
    type: REQUEST_UN_FOLLOW,
    payload: unFollowUserId, // 상대방 유저아이디
  };
};
export const requestUserData = () => {
  return {
    type: REQUEST_USER_DATA,
  };
};
