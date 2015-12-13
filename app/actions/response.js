export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';

export function receiveResponse(response, request) {
  return {
    type: RECEIVE_RESPONSE,
    response: response,
    request: request
  };
}
