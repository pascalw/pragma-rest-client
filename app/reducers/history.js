import { Request, LOG_REQUEST } from '../actions/project';
import Immutable, { List, Record, Map } from 'immutable';

export default function history(state = new List(), action) {

  switch (action.type) {
    case LOG_REQUEST:
      const loggedRequest = new Request(action.request)
        .remove('projectId')
        .set('id', state.size)
        .set('name', action.request.url);

      return state.push(loggedRequest);
    default:
      return state;
  }
}
