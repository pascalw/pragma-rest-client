import React, { Component } from 'react';
import RequestEditor from '../components/RequestEditor';
import { connect } from 'react-redux';
import { addRequest } from '../actions/request';

class NewRequestPage extends Component {
  onRequestCreated(request) {
    this.props.dispatch(addRequest(request));
  }

  newRequest() {
    return {method: 'GET'}
  }

  render() {
    return (
      <RequestEditor request={this.newRequest()} onRequestChange={this.onRequestCreated.bind(this) }/>
    );
  }
}

function select(state) {
  return {
    requests: state.requests
  }
}

export default connect(select)(NewRequestPage);
