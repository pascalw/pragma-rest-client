import React, { Component } from 'react';
import RequestEditor from '../components/RequestEditor';
import ResponseViewer from '../components/ResponseViewer';
import * as actionCreators from '../actions/request';
import { connect } from 'react-redux';

class EditRequestPage extends Component {
  findRequest() {
    return this.props.requests.filter((r) => r.id == this.props.params.id)[0]
  }

  render() {
    const request = this.findRequest();
    if (request == null)
      return (<div/>);

    return (
      <div className="edit-request-page">
        <RequestEditor request={ request }
                       onRequestChange={this.props.updateRequest}
                       onRequestDelete={this.props.deleteRequest}/>
        <ResponseViewer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    requests: state.requests
  }
}

export default connect(mapStateToProps, actionCreators)(EditRequestPage);
