// 사가 액션 타입
export const FETCH_SIGNUP_DATA = 'account/fetch/SIGNUP_DATA';
export const FETCH_USER = 'account/fetch/USER';

export const UPDATE_USER = 'account/update/USER';
export const DELETE_USER = 'account/delete/USER';

// const updateAccountUser = (jwt: string) => (dispatch) => {
//   return dispatch({ type: UPDATE_USER, payload: jwt });
// };

export const updateAccountUser = (jwt: string) => ({
  type: UPDATE_USER,
  payload: jwt,
});
