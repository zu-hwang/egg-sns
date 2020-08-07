// reducer 통합
import { combineReducers } from 'redux';
// import feed from './feed/reducer';
// import comment from './comment/reducer';
import user from './user/reducer';

export default combineReducers({
  // feed,
  // comment,
  user,
});
