import { combineReducers } from 'redux';
import developersReducer from '../reducer/developers'


const rootReducer = combineReducers({
  developer: developersReducer
});

export default rootReducer;
