export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const AWAITING_RESPONSE = 'AWAITING_RESPONSE';

export function receiveResponse(response) {
  return {
    type: RECEIVE_RESPONSE,
    response: response
  };
}

export function receiveError(error) {
  return {
    type: RECEIVE_ERROR,
    error: error
  };
}

export function awaitingResponse() {
  return {
    type: AWAITING_RESPONSE
  };
}
