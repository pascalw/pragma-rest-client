import { pushPath as routerPushPath } from 'redux-simple-router';

export const SELECT_REQUEST = 'SELECT_REQUEST';
export const PUSH_PATH = 'PUSH_PATH';

export function selectRequest(request) {
  return dispatch => {
    dispatch(pushPath(`/projects/${request.projectId}/requests/${request.id}`));

    dispatch({
      type: SELECT_REQUEST,
      request: request
    });
  };
}

export function pushPath(path) {
  return routerPushPath(path);
}
