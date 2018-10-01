import actionTypes from '../constants/actionTypes';

export const fetchClientAction = (clientId) => {
  return (dispatch) => {
    fetch(`/api/v1/clients/${clientId}`, {
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      dispatch({type: actionTypes.FETCH_CLIENT, payload: body});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };
};
