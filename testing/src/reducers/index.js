import { combineReducers } from 'redux';
import commentsReducer from './comments';

const rootReducer = combineReducers({
  // comments: (state = []) => state
  comments: commentsReducer
});

export default rootReducer;
