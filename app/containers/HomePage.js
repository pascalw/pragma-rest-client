import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RequestsList from '../components/RequestsList';
import RequestEditor from '../components/RequestEditor';

import Modal from '../components/Modal';
import ProjectCreator from '../components/ProjectCreator';

class HomePageNoProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {openCreateProjectModal: false};
  }

  openCreateProjectModal() {
    this.setState({openCreateProjectModal: true});
  }

  closeCreateProjectModal() {
    this.setState({openCreateProjectModal: false});
  }

  render() {
    return (<div className="page">
        Welcome to Pragma!
        <span>
          <a href="#" onClick={ () => window.openProject() }>Open</a>
          &nbsp;or&nbsp;
          <a href="#" onClick={() => this.openCreateProjectModal()}>create</a>
          &nbsp;a project to get started.
        </span>
        <Modal isOpen={this.state.openCreateProjectModal} onRequestClose={this.closeCreateProjectModal.bind(this)}>
          <ProjectCreator/>
        </Modal>
      </div>
    );
  }
}

export class HomePage extends Component {
  render() {
    if (this.props.projects.size == 0)
      return <HomePageNoProjects/>;

    return <div className="page">
      Welcome to Pragma!
      Select a request on the left.
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps)(HomePage);
