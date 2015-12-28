import React, { Component, PropTypes } from 'react';

class ResponseViewer extends Component {
  render() {
    if (!this.props.response)
      return <div/>;

    if(this.props.response.pending) {
      return <div>Loading...</div>;
    }

    return (
      <pre className="response">{ this.props.response.body.toString() } </pre>
    );
  }
}

export default ResponseViewer;
