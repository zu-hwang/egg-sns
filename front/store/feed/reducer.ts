import produce from 'immer';
import * as egg from 'store/types';
import * as feed from 'store/feed/';

export const initialState: egg.Feed = {
  modalNewFeed: true,
  uplodedImages: [],
};

export const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case feed.SET_MODAL_NEW_FEED:
        draft.modalNewFeed = action.payload;
        break;
      case feed.SET_UPLOADED_IMAGES:
        draft.uplodedImages = action.payload;
        break;
      case feed.REMOVE_UPLOADED_IMAGE:
        draft.uplodedImages = draft.uplodedImages.filter(
          (item) => item !== action.payload,
        );
        break;
    }
  });
};

export default reducer;
