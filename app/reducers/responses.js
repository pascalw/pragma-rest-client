import { AWAITING_RESPONSE, RECEIVE_RESPONSE } from '../actions/response';
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
        body: action.response
      }));
    case UPDATE_PATH:
      return state.clear();
    default:
      return state;
  }
}
