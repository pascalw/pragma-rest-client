import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import requests from './requests';
import responses from './responses';
import project from './project';

const rootReducer = combineReducers({
  requests,
  responses,
  project,
  routing: routeReducer
});

export default rootReducer;
