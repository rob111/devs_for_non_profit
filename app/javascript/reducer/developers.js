import actionTypes from '../constants/actionTypes';

const initialState = {
  developer: {},
  projects: [],
  clients:[],
  info: {},
  current_user: {}
};

 const developersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DEVELOPER:
      return Object.assign({}, state, action.payload)
      break;
    default:
      return state;
  }

}

export default developersReducer;
