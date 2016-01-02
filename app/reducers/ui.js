import { SELECT_REQUEST } from '../actions/ui';
import { UPDATE_PATH } from 'redux-simple-router';
import { Map } from 'immutable';

export default function selectedRequest(state = new Map(), action) {
  switch (action.type) {
    case SELECT_REQUEST:
      return state.set('selectedRequest', action.request);
    case UPDATE_PATH:
      return state.remove('selectedRequest');
    default:
      return state;
  }
}
