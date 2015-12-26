import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import responses from './responses';
import projects from './projects';

const rootReducer = combineReducers({
  projects,
  responses,
  routing: routeReducer
});

export default rootReducer;
