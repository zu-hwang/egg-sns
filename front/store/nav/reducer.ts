import produce from 'immer';
import * as nav from 'store/nav';
export const initialState: INav = {
  currentNav: null,
};

export const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case nav.SET_SELECT_NAV:
        draft.currentNav = action.payload;
      default:
        break;
    }
  });
};

export default reducer;

export interface INav {
  currentNav: 'home' | 'message' | 'explore' | 'notification' | 'my' | null;
}
