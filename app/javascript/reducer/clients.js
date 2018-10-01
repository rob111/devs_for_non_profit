import actionTypes from '../constants/actionTypes';

const initialState = {
  client: {},
  projects: [],
  client_info: {},
  current_user: {}
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CLIENT:
      return Object.assign({}, state, action.payload)
      break;
    default:
      return state;
  }
};

export default clientsReducer;
