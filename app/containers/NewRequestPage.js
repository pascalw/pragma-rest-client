import React, { Component } from 'react';
import RequestsList from '../components/RequestsList';
import RequestEditor from '../components/RequestEditor';

export default class NewRequestPage extends Component {
  render() {
    return (
      <div id="main">
        <RequestsList/>
        <RequestEditor/>
        new
      </div>
    );
  }
}
