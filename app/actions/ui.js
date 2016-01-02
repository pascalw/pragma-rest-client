import { pushPath } from 'redux-simple-router';

export const SELECT_REQUEST = 'SELECT_REQUEST';

export function selectRequest(request) {
  return dispatch => {
    dispatch(pushPath(`/projects/${request.projectId}/requests/${request.id}`));

    dispatch({
      type: SELECT_REQUEST,
      request: request
    });
  };
}
