import { pushPath as routerPushPath } from 'redux-simple-router';

export const SELECT_REQUEST = 'SELECT_REQUEST';
export const SELECT_ENVIRONMENT = 'SELECT_ENVIRONMENT';
export const UNSET_ENVIRONMENT = 'UNSET_ENVIRONMENT';
export const PUSH_PATH = 'PUSH_PATH';

export function selectRequest(request) {
  return dispatch => {
    if (request.projectId)
      dispatch(pushPath(`/projects/${request.projectId}/requests/${request.id}`));
    else
      dispatch(pushPath(`/requests/${request.id}`));

    dispatch({
      type: SELECT_REQUEST,
      request: request
    });
  };
}

export function selectEnvironment(id) {
  return {
    type: SELECT_ENVIRONMENT,
    id: id
  }
}

export function unsetEnvironment() {
  return {
    type: UNSET_ENVIRONMENT
  }
}

export function pushPath(path) {
  return routerPushPath(path);
}
