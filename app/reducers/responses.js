import { AWAITING_RESPONSE, RECEIVE_RESPONSE, RECEIVE_ERROR } from '../actions/response';
import { UPDATE_PATH } from 'redux-simple-router'
import { Map } from 'immutable';

export default function responses(state = new Map(), action) {
  switch (action.type) {
    case AWAITING_RESPONSE:
      return state.updateIn([action.request.projectId, action.request.id], () => ({
        pending: true
      }));
    case RECEIVE_RESPONSE:
      return state.updateIn([action.request.projectId, action.request.id], () => ({
        object: action.response
      }));
    case RECEIVE_ERROR:
      return state.updateIn([action.request.projectId, action.request.id], () => ({
        error: action.error
      }));
    case UPDATE_PATH:
      return state.clear();
    default:
      return state;
  }
}
