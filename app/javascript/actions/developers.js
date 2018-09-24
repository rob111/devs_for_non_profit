import actionTypes from '../constants/actionTypes';

export const fetchDeveloperAction = (developerId) => {
  return (dispatch) => {
    fetch(`/api/v1/developers/${developerId}`, {
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      dispatch({type: actionTypes.FETCH_DEVELOPER, payload: body});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
}
