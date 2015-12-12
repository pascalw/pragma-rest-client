import React, { Component } from 'react';
import RequestEditor from '../components/RequestEditor';
import { updateRequest } from '../actions/request';
import { connect } from 'react-redux';

class EditRequestPage extends Component {
  onRequestChange(request) {
    this.props.dispatch(updateRequest(request));
  }

  findRequest() {
    return this.props.requests.filter((r) => r.id == this.props.params.id)[0]
  }

  render() {
    const request = this.findRequest();
    if (request == null)
      return (<div/>);

    return (
      <RequestEditor request={ request } onRequestChange={this.onRequestChange.bind(this) }/>
    );
  }
}

function select(state) {
  return {
    requests: state.requests
  }
}

export default connect(select)(EditRequestPage);
