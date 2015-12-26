import { RECEIVE_RESPONSE } from '../actions/response';

export default function responses(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RESPONSE:
      let projectResponses = state[action.request.projectId] || {};
      projectResponses = Object.assign({}, projectResponses, {[action.request.id]: action.response});

      return Object.assign({}, state, {[action.request.projectId]: projectResponses});
    default:
      return state;
  }
}
