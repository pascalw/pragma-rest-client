import { RECEIVE_RESPONSE } from '../actions/response';
import { Map } from 'immutable';

export default function responses(state = new Map(), action) {
  switch (action.type) {
    case RECEIVE_RESPONSE:
      return state.updateIn([action.request.projectId, action.request.id], () => action.response);
    default:
      return state;
  }
}
