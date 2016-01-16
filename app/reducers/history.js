import { Request, LOG_REQUEST } from '../actions/project';
import Immutable, { List, Record, Map } from 'immutable';

export default function history(state = new List(), action) {

  switch (action.type) {
    case LOG_REQUEST:
      debugger;

      const loggedRequest = new Request(Immutable.fromJS(action.request))
        .set('name', action.request.url)
        .set('id', state.size);

      return state.push(loggedRequest);
    default:
      return state;
  }
}
