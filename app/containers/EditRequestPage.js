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

  findRequest() {
    const project = this.props.projects.filter(p => p.id == this.props.params.projectId).get(0);
    if (!project)
      return null;

    return project.requests.filter(r => r.id == this.props.params.id).get(0);
  }

  onExecuteRequest(request) {
    this.props.executeRequest(request.method, request.url, request.headers.toJS(), request.body);
  }

  render() {
    const request = this.findRequest();
    if (request == null)
      return (<div/>);

    return (
      <div className="edit-request-page">
        <RequestEditor request={ request }
                       onRequestChange={this.props.updateRequest}
                       onRequestDelete={this.props.deleteRequest}
                       onRequestExecute={this.onExecuteRequest.bind(this)}/>

        <ResponseViewer response={ this.props.response }/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
    response: state.response
  }
}

export default connect(mapStateToProps, actionCreators)(EditRequestPage);
