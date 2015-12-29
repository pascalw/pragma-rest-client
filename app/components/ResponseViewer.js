import React, { Component, PropTypes } from 'react';

function toTitleCase(str) {
  return str.replace(/\w*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

class ResponseViewer extends Component {
  render() {
    if (!this.props.response)
      return <div/>;

    if (this.props.response.pending) {
      return <div>Loading...</div>;
    }

    const response = this.props.response.object;
    const error = this.props.response.error;

    if (error)
      return (
        <div className="response">
          <h3>Request failed:</h3>
          { error.message }
        </div>
      );

    return (
      <div className="response">
        <span>
          <b>Status:&nbsp;</b>
          {response.status } { response.statusText }
        </span>
        <span>
          <ul>
            { Object.keys(response.headers).map(header =>
              <li key={header}>
                <b>{toTitleCase(header)}:</b>&nbsp;
                {response.headers[header]}
              </li>
            )}
          </ul>
        </span>
        <pre>{ response.body } </pre>
      </div>
    );
  }
}

export default ResponseViewer;
