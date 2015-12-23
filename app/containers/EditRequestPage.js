import React, { Component } from 'react';
import RequestEditor from '../components/RequestEditor';
import ResponseViewer from '../components/ResponseViewer';
import * as actionCreators from '../actions/project';
import { connect } from 'react-redux';

class EditRequestPage extends Component {
  findRequest() {
    const project = this.props.projects.filter(p => p.id == this.props.params.projectId)[0];
    if (!project)
      return null;

    return project.requests.filter(r => r.id == this.props.params.id)[0];
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
                       onRequestExecute={this.props.executeRequest}/>

        <ResponseViewer response={ (this.props.responses[request.projectId] || {})[request.id] }/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
    responses: state.responses
  }
}

export default connect(mapStateToProps, actionCreators)(EditRequestPage);
