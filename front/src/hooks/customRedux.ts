import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
} from 'react-redux';
import { RootState } from 'store/rootReducer';

export const useDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
