import actionTypes from '../constants/actionTypes';

const initialState = {
  developer: {}
};

 const developersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DEVELOPER:
      return Object.assign({}, state, {developer: action.payload})
      break;
    default:

  }

}

export default developersReducer;
