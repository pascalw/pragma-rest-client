import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequestEditor from '../components/RequestEditor';
import ResponseViewer from '../components/ResponseViewer';
import { Request, addRequest, executeRequest } from '../actions/project';

const UNSAVED_RESPONSE_ID = '__unsaved__';

class NewRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({request: new Request({method: 'GET'})});
  }

  addRequest(request) {
    this.props.dispatch(addRequest(request, this.props.params.projectId));
  }

  onRequestExecute(request) {
    this.setState({request: request});
    this.props.dispatch(executeRequest(UNSAVED_RESPONSE_ID, request.method, request.url, request.headers.toJS(), request.body));
  }

  render() {
    if (!this.state.request)
      return <div className="new-request-page"/>;

    return (
      <div className="new-request-page">
        <RequestEditor request={ this.state.request }
                       onRequestChange={ this.addRequest.bind(this) }
                       onRequestExecute={ this.onRequestExecute.bind(this) }/>

        <ResponseViewer response={ this.props.response }/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    response: state.responses.get(UNSAVED_RESPONSE_ID)
  }
}

export default connect(mapStateToProps)(NewRequestPage);
