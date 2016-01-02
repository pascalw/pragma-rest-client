import React, { Component } from 'react';
import RequestEditor from '../components/RequestEditor';
import ResponseViewer from '../components/ResponseViewer';
import * as actionCreators from '../actions/project';
import { connect } from 'react-redux';

class EditRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onExecuteRequest(request) {
    this.props.executeRequest(request.method, request.url, request.headers.toJS(), request.body);
  }

  render() {
    if (!this.props.request)
      return null;

    return (
      <div className="edit-request-page">
        <RequestEditor request={ this.props.request }
                       onRequestChange={this.props.updateRequest}
                       onRequestDelete={this.props.deleteRequest}
                       onRequestExecute={this.onExecuteRequest.bind(this)}/>

        <ResponseViewer response={ this.props.response }/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const project = state.projects.filter(p => p.id == ownProps.params.projectId).get(0);
  const request = project && project.requests.filter(r => r.id == ownProps.params.id).get(0);

  return {
    request: request,
    response: state.response
  }
}

export default connect(mapStateToProps, actionCreators)(EditRequestPage);
