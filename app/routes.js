import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import NewRequestPage from './containers/NewRequestPage';
import EditRequestPage from './containers/EditRequestPage';
import NewProjectPage from './containers/NewProjectPage';
import EnvironmentsPage from './containers/EnvironmentsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/projects/:projectId/requests/new" component={NewRequestPage}/>
    <Route path="/projects/:projectId/requests/:id" component={EditRequestPage}/>
    <Route path="/project/new" component={NewProjectPage}/>
    <Route path="/environments" component={EnvironmentsPage}/>
  </Route>
);
