import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createHashHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import { pushPath } from 'redux-simple-router';
import routes from './routes';
import configureStore from './store/configureStore';
import LocalStorageAdapter from './LocalStorageAdapter';
import { openProject } from './actions/project';

import './app.scss';

const store = window.store = configureStore();
const history = createHashHistory();

const localStorageAdapter = new LocalStorageAdapter(store, localStorage);
if (localStorageAdapter.getInitialState().project)
  store.dispatch(openProject(localStorageAdapter.getInitialState().project));

syncReduxAndRouter(history, store);

window.openProject = () => {
  const remote = require('electron').remote;
  const dialog = remote.require('electron').dialog;
  const browserWindow = require('electron').remote.BrowserWindow.getFocusedWindow();

  const projectFile = dialog.showOpenDialog(browserWindow, {properties: ['openFile']})[0];

  store.dispatch(openProject(projectFile));
  store.dispatch(pushPath('/'));
};

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
