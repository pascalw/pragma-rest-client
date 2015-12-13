import React, { Component, PropTypes } from 'react';

class ResponseViewer extends Component {
  static defaultProps = {
    response: ''
  };

  render() {
    return (
      <pre className="response">{ this.props.response.toString() } </pre>
    );
  }
}

export default ResponseViewer;
