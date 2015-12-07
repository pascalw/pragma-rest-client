import React, { Component } from 'react';
import RequestsList from '../components/RequestsList';
import RequestEditor from '../components/RequestEditor';

export default class HomePage extends Component {
  render() {
    return (
      <div id="main">
        <button className="new-request">New request</button>
        <RequestsList/>
        <RequestEditor/>
      </div>
    );
  }
}
