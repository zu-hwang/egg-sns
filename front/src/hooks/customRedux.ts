import * as redux from 'react-redux';
import * as egg from 'store/types';

export const useDispatch = redux.useDispatch;
export const useSelector: redux.TypedUseSelectorHook<egg.StoreState> =
  redux.useSelector;
