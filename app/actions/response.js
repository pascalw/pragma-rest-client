export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const AWAITING_RESPONSE = 'AWAITING_RESPONSE';

export function receiveResponse(response, request) {
  return {
    type: RECEIVE_RESPONSE,
    response: response,
    request: request
  };
}

export function receiveError(error, request) {
  return {
    type: RECEIVE_ERROR,
    error: error,
    request: request
  };
}

export function awaitingResponse(request) {
  return {
    type: AWAITING_RESPONSE,
    request: request
  };
}
