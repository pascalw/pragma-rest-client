export const ADD_REQUEST = 'ADD_REQUEST';

export function addRequest(request) {
  return {
    type: ADD_REQUEST,
    request: request
  };
}

