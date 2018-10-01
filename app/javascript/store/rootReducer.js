import { combineReducers } from 'redux';
import developersReducer from '../reducer/developers';
import clientsReducer from '../reducer/clients';


const rootReducer = combineReducers({
  developer: developersReducer,
  client: clientsReducer
});

export default rootReducer;
