import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import response from './response';
import projects from './projects';

const rootReducer = combineReducers({
  projects,
  response,
  routing: routeReducer
});

export default rootReducer;
