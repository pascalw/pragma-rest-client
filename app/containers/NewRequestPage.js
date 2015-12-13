import React, { Component } from 'react';
import RequestEditor from '../components/RequestEditor';
import { connect } from 'react-redux';
import { addRequest } from '../actions/request';

class NewRequestPage extends Component {
  render() {
    return (
      <div className="new-request-page">
        <RequestEditor request={ { method: 'GET' } }
                       onRequestChange={ this.props.addRequest }/>
      </div>
    );
  }
}

function select(state) {
  return {
    requests: state.requests
  }
}

export default connect(select, {addRequest: addRequest})(NewRequestPage);
