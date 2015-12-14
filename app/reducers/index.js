import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import requests from './requests';
import responses from './responses';

const rootReducer = combineReducers({
  requests,
  responses,
  routing: routeReducer
});

export default rootReducer;
