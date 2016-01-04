import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { selectRequest } from '../actions/ui';
import { closeProject } from '../actions/project';

import styles from './RequestsList.module.scss';

class RequestListItem extends Component {
  onClick(e) {
    e.preventDefault();
    this.props.onSelected(this.props.request);
  }

  render() {
    const request = this.props.request;
    const className = this.props.selected ? 'request selected' : 'request';

    return (
      <article className={className}>
        <a href="#" onClick={this.onClick.bind(this)}>
          <span className={'method ' + request.method.toLowerCase() }>{ request.method }</span>
          { request.name }
        </a>
      </article>
    );
  }
}

class ProjectListItem extends Component {
  onProjectClose(e) {
    e.preventDefault();
    this.props.onProjectClose(this.props.project);
  }

  render() {
    const { project, selectedRequest } = this.props;
    return (
      <div className="project">
        <div className="project-details">
          <span className="name">{project.name}</span>

          <Link className="close-project" title="Close project" to='#' onClick={this.onProjectClose.bind(this)}>
            <i className="fa small fa-times-circle"/>
          </Link>
          <Link className="new-request" title="Create new request" to={`/projects/${project.id}/requests/new`}>
            <i className="fa small fa-plus-circle"/>
          </Link>
        </div>
        {project.requests.map((request, index) =>
          <RequestListItem key={index}
                           request={request}
                           selected={ request === selectedRequest }
                           onSelected={this.props.onRequestSelected}/>
        )}
      </div>
    );
  }
}

class RequestsList extends Component {
  static propTypes = {
    requests: PropTypes.array
  };

  onRequestSelected(request) {
    this.props.dispatch(selectRequest(request));
  }

  onProjectClose(project) {
    if (window.confirm('Are you sure you want to close this project?'))
      this.props.dispatch(closeProject(project));
  }

  render() {
    const { dispatch, projects, selectedRequest } = this.props;
    if (projects.count() == 0)
      return null;

    return (
      <div className={styles.requestsList}>
        {this.props.projects.map((project, index) =>
          <ProjectListItem key={index} project={project}
                           selectedRequest={selectedRequest}
                           onRequestSelected={this.onRequestSelected.bind(this)}
                           onProjectClose={this.onProjectClose.bind(this)}/>
        )}
      </div>
    );
  }
}

function select(state) {
  return {
    projects: state.projects,
    selectedRequest: state.ui.get('selectedRequest')
  }
}

export default connect(select)(RequestsList)
