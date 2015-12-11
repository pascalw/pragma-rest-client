import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import NewRequestPage from './containers/NewRequestPage';
import EditRequestPage from './containers/EditRequestPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/new" component={NewRequestPage}/>
    <Route path="/requests/:id" component={EditRequestPage}/>
  </Route>
);
