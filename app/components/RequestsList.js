import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { selectRequest, pushPath } from '../actions/ui';
import { closeProject } from '../actions/project';
import OverFlowMenu, { OverflowItem } from './OverFlowMenu';

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
    this.props.onProjectClose(this.props.project);
  }

  onNewRequest(e) {
    this.props.onNewRequest(this.props.project);
  }

  render() {
    const { project, selectedRequest } = this.props;
    return (
      <div className="project">
        <div className="project-details">
          <span className="name">{project.name}</span>

          <OverFlowMenu className="menu">
            <OverflowItem title="Create new request" onClick={this.onNewRequest.bind(this)}>
              Add request
              <i className="fa small fa-plus-circle"/>
            </OverflowItem>
            <OverflowItem title="Close project" onClick={this.onProjectClose.bind(this)}>
              Close project
              <i className="fa small fa-times-circle"/>
            </OverflowItem>
          </OverFlowMenu>
        </div>
        {
          project.requests.map((request, index) =>
            <RequestListItem key={index}
                             request={request}
                             selected={ request === selectedRequest }
                             onSelected={this.props.onRequestSelected}/>
          )
        }
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
    if (window.confirm('Are you sure you want to close this project?')) {
      this.props.dispatch(pushPath('/'));
      this.props.dispatch(closeProject(project));
    }
  }

  onNewRequest(project) {
    this.props.dispatch(pushPath(`/projects/${project.id}/requests/new`));
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
                           onNewRequest={this.onNewRequest.bind(this)}
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
