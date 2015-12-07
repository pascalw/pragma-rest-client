import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

class RequestsList extends Component {
  static propTypes = {
    requests: PropTypes.array
  };

  render() {
    const { dispatch, requests } = this.props
    return (
      <div id="requests">
        {this.props.requests.map((request, index) =>
          <article key={index} className="request">
            <a href="#">
              <span className={'method ' + request.method.toLowerCase() }>{ request.method }</span> { request.name }
            </a>
          </article>
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
