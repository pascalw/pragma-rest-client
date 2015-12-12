export const ADD_REQUEST = 'ADD_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const RELOAD_ALL = 'RELOAD_ALL';

export function addRequest(request) {
  if (request.id === undefined)
    request.id = Math.random().toString(32).slice(2).substr(0, 5);

  return {
    type: ADD_REQUEST,
    request: request
  };
}

export function updateRequest(request) {
  return {
    type: UPDATE_REQUEST,
    request: request
  };
}

export function deleteRequest(request) {
  return {
    type: DELETE_REQUEST,
    request: request
  };
}

export function reloadAllRequests(requests) {
  return {
    type: RELOAD_ALL,
    requests: requests
  };
}
