import { combineReducers } from 'redux';
import requests from './requests';
import responses from './responses';

const rootReducer = combineReducers({
  requests,
  responses
});

export default rootReducer;
