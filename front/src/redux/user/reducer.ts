import produce from 'immer';
import {
  FOLLOW,
  UN_FOLLOW,
  LOG_IN,
  LOG_OUT,
  REQUEST_USER_DATA,
  REQUEST_FOLLOW,
  REQUEST_UN_FOLLOW,
} from './actionTypes';
import { UserInitState, UserAction, UserData } from '../types';
// 리듀서 함수 = export default 하기
const initState: UserInitState = {
  userData: {
    id: 0,
    username: 'loading',
    imageUrl: 'loading',
    content: 'loading',
  },
  followList: [
    {
      id: 0,
      username: 'loading',
      imageUrl: 'loading',
      content: 'loading',
    },
  ],
};

export default (state = initState, action: UserAction) => {
  return produce((currentState = initState), (draftState) => {
    switch (action.type) {
      case FOLLOW:
        draftState.followList.push(action.payload);
        break;
      case UN_FOLLOW:
        const result = draftState.followList.filter(
          (list, index) => list.id !== action.payload,
        );
        draftState.followList = result;
        break;
      case LOG_IN:
        break;
      case LOG_OUT:
        delete draftState.userData;
        break;
      case REQUEST_FOLLOW:
        break;
      case REQUEST_UN_FOLLOW:
        break;
      case REQUEST_USER_DATA:
        break;

      default:
        break;
    }
  });
};
