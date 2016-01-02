import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequestEditor from '../components/RequestEditor';
import ResponseViewer from '../components/ResponseViewer';
import { Request, addRequest, executeRequest } from '../actions/project';
import { selectRequest } from '../actions/ui';

class NewRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({request: new Request({method: 'GET'})});
  }

  addRequest(request) {
    const action = addRequest(request, this.props.params.projectId);

    this.props.dispatch(action);
    this.props.dispatch(selectRequest(action.request));
  }

  onRequestExecute(request) {
    this.setState({request: request});
    this.props.dispatch(executeRequest(request.method, request.url, request.headers.toJS(), request.body));
  }

  render() {
    if (!this.state.request)
      return null;

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
    response: state.response
  }
}

export default connect(mapStateToProps)(NewRequestPage);
