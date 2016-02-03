import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const remote = require('electron').remote;
const dialog = remote.require('electron').dialog;
const browserWindow = require('electron').remote.BrowserWindow.getFocusedWindow();

import RequiredInput from '../components/RequiredInput';
import { newProject } from '../actions/project';
import { pushPath } from '../actions/ui';

import styles from './ProjectCreator.module.scss';

class ProjectCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openDialog() {
    let directory = dialog.showOpenDialog(browserWindow, {properties: ['openDirectory']});
    this.setState({directory: directory});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(newProject(this.refs.path.value(), this.refs.name.value()));
    this.props.dispatch(pushPath('/'));
  }

  render() {
    return (
      <div>
        <h2 className={styles.title}>New project</h2>

        <form onSubmit={this.onSubmit.bind(this)}>
          <RequiredInput type="text" placeholder="name" ref="name"/>
          <br/>

          <div className={styles.inputAddon}>
            <RequiredInput type="text" placeholder="project path" ref="path" value={this.state.directory}/>
            <button onClick={this.openDialog.bind(this)}>Choose</button>
          </div>

          <input className={styles.submit} type="submit" value="Create"/>
        </form>
      </div>
    );
  }
}

export default connect()(ProjectCreator);
