import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newProject } from '../actions/project';
import { pushPath } from 'redux-simple-router';

const remote = require('electron').remote;
const dialog = remote.require('electron').dialog;
const browserWindow = require('electron').remote.BrowserWindow.getFocusedWindow();

class NewProjectPage extends Component {
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
    this.props.dispatch(newProject(this.refs.path.value, this.refs.name.value));
    this.props.dispatch(pushPath('/'));
  }

  render() {
    return (
      <div className="new-project-page page">
        <h2>New project</h2>

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" placeholder="name" ref="name" required/><br/>
          <input type="text" placeholder="project path" ref="path" value={this.state.directory} required/>
          <button onClick={this.openDialog.bind(this)}>Choose project location</button>

          <br/>
          <input type="submit" value="Create"/>
        </form>
      </div>
    );
  }
}

export default connect()(NewProjectPage);
