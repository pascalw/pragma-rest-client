export const ADD_REQUEST = 'ADD_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';

export function addRequest(request) {
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
