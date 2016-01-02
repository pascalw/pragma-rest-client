import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import response from './response';
import projects from './projects';
import ui from './ui';

const rootReducer = combineReducers({
  projects,
  response,
  ui,
  routing: routeReducer
});

export default rootReducer;
