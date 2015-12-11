import React, { Component } from 'react';

class RequestEditor extends Component {
  render() {
    return (
      <div id="active-request">
        active request here: { JSON.stringify(this.props.id) }
      </div>
    );
  }
}

export default RequestEditor;
