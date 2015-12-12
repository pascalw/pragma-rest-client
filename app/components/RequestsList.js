import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class RequestListItem extends Component {
  render() {
    const request = this.props.request;

    return (
      <article className="request">
        <Link to={`/requests/${request.id}`}>
          <span className={'method ' + request.method.toLowerCase() }>{ request.method }</span> { request.name }
        </Link>
      </article>
    );
  }
}

class RequestsList extends Component {
  static propTypes = {
    requests: PropTypes.array
  };

  render() {
    const { dispatch, requests } = this.props
    return (
      <div id="requests">
        {this.props.requests.map((request, index) =>
          <RequestListItem key={index} request={request}/>
        )}
      </div>
    );
  }
}

function select(state) {
  return {
    requests: state.requests
  }
}

export default connect(select)(RequestsList)
