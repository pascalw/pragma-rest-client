export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const AWAITING_RESPONSE = 'AWAITING_RESPONSE';

export function receiveResponse(response, id) {
  return {
    type: RECEIVE_RESPONSE,
    response: response,
    id: id
  };
}

export function receiveError(error, id) {
  return {
    type: RECEIVE_ERROR,
    error: error,
    id: id
  };
}

export function awaitingResponse(id) {
  return {
    type: AWAITING_RESPONSE,
    id: id
  };
}
