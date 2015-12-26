import React, { Component } from 'react';
import RequestEditor from '../components/RequestEditor';
import { connect } from 'react-redux';
import { addRequest } from '../actions/project';

class NewRequestPage extends Component {
  addRequest(request) {
    this.props.dispatch(addRequest(request, this.props.params.projectId));
  }

  render() {
    return (
      <div className="new-request-page">
        <RequestEditor request={ { method: 'GET' } }
                       onRequestChange={ this.addRequest.bind(this) }/>
      </div>
    );
  }
}

export default connect()(NewRequestPage);
