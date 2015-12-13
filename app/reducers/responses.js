import { RECEIVE_RESPONSE } from '../actions/response';

export default function responses(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RESPONSE:
      return Object.assign({}, state, {[action.request.id]: action.response});
    default:
      return state;
  }
}
