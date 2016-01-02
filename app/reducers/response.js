import { AWAITING_RESPONSE, RECEIVE_RESPONSE, RECEIVE_ERROR } from '../actions/response';
import { UPDATE_PATH } from 'redux-simple-router'
import { Map } from 'immutable';

const defaultState = null;

export default function response(state = defaultState, action) {
  switch (action.type) {
    case AWAITING_RESPONSE:
      return {pending: true};
    case RECEIVE_RESPONSE:
      return {object: action.response};
    case RECEIVE_ERROR:
      return {error: action.error};
    case UPDATE_PATH:
      return defaultState;
    default:
      return state;
  }
}
