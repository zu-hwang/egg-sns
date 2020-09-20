export const SET_SELECT_NAV = 'layout/SET_SELECT_NAV';

export const setSelectNav = (
  navName: null | 'my' | 'notification' | 'home' | 'message',
) => ({
  type: SET_SELECT_NAV,
  payload: navName,
});
