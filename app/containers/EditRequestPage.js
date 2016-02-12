import React, { Component } from 'react';
import RequestEditor from '../components/RequestEditor';
import ResponseViewer from '../components/ResponseViewer';
import * as actionCreators from '../actions/project';
import { pushPath } from '../actions/ui';
import { cancel as cancelRequest } from '../actions/response';
import { connect } from 'react-redux';

class EditRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onExecuteRequest(request) {
    this.props.executeRequest(request.method, request.url, request.headers.toJS(), request.body);
    this.props.logRequest(request);
  }

  onDeleteRequest(request) {
    this.props.deleteRequest(request);
    this.props.pushPath('/');
  }

  onCancel() {
    this.props.cancelRequest();
  }

  render() {
    if (!this.props.request)
      return null;

    return (
      <div className="edit-request-page">
        <RequestEditor request={ this.props.request }
                       onRequestChange={this.props.updateRequest}
                       onRequestDelete={this.onDeleteRequest.bind(this)}
                       onRequestExecute={this.onExecuteRequest.bind(this)}/>

        <ResponseViewer response={ this.props.response } onCancel={this.onCancel.bind(this)}/>
      </div>
    );
  }
}

function requestFromProjects(state, projectId, requestId) {
  const project = state.projects.filter(p => p.id == projectId).get(0);
  return project && project.requests.filter(r => r.id == requestId).get(0);
}

function requestFromHistory(state, requestId) {
  return state.history.filter(r => r.id == requestId).get(0);
}

function mapStateToProps(state, ownProps) {
  let request;

  if (ownProps.params.projectId)
    request = requestFromProjects(state, ownProps.params.projectId, ownProps.params.id);
  else
    request = requestFromHistory(state, ownProps.params.id);

  return {
    request: request,
    response: state.response
  }
}

export default connect(mapStateToProps, {...actionCreators, pushPath, cancelRequest})(EditRequestPage);
