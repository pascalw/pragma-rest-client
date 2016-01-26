import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createHashHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import { pushPath } from './actions/ui';
import routes from './routes';
import configureStore from './store/configureStore';
import { syncProjectsToDisk } from './pragma/ProjectFileSynchronizer';
import syncEnvironments from './pragma/environmentsSynchronizer';
import syncUiState from './pragma/uiStateSynchronizer';
import { upsertProject } from './actions/project';
import { Map } from 'immutable';

import './styles/app.scss';
import 'font-awesome/scss/font-awesome.scss';

const store = window.store = configureStore();
const history = createHashHistory();

syncReduxAndRouter(history, store);
syncProjectsToDisk(store);
syncEnvironments(store);
syncUiState(store);

window.openProject = () => {
  const remote = require('electron').remote;
  const dialog = remote.require('electron').dialog;
  const browserWindow = require('electron').remote.BrowserWindow.getFocusedWindow();

  const projectFile = dialog.showOpenDialog(browserWindow, {properties: ['openFile']})[0];

  store.dispatch(upsertProject(projectFile));
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
