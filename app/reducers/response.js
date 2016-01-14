import { AWAITING_RESPONSE, RECEIVE_RESPONSE, RECEIVE_ERROR, CANCEL_RESPONSE } from '../actions/response';
import { UPDATE_PATH } from 'redux-simple-router'
import { Map } from 'immutable';

const defaultState = null;

export default function response(state = defaultState, action) {
  switch (action.type) {
    case AWAITING_RESPONSE:
      return {pending: true, cancel: action.cancel};
    case RECEIVE_RESPONSE:
      if (!state || !state.pending)
        return defaultState;

      return {object: action.response};
    case RECEIVE_ERROR:
      if (!state || !state.pending)
        return defaultState;

      return {error: action.error};
    case CANCEL_RESPONSE:
      state && state.cancel && state.cancel();
      return defaultState;
    case UPDATE_PATH:
      return defaultState;
    default:
      return state;
  }
}
