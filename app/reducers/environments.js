import { UPSERT_ENVIRONMENT, DELETE_ENVIRONMENT, Environment } from '../actions/environments';
import { List, Map } from 'immutable';

function findIndex(state, environment) {
  return state.findIndex(e => e.id === environment.id);
}

export default function response(state = new List(), action) {
  let idx;
  switch (action.type) {
    case UPSERT_ENVIRONMENT:
      idx = findIndex(state, action.environment);

      const variables = new Map(action.environment.variables);
      const environment = new Environment({...action.environment, variables});

      return idx === -1 ? state.push(environment) : state.set(idx, environment);
    case DELETE_ENVIRONMENT:
      idx = findIndex(state, action.environment);
      return idx !== -1 ? state.delete(idx) : state;
    default:
      return state;
  }
}
