import React, { Component } from 'react';
import RequestsList from '../components/RequestsList';
import RequestEditor from '../components/RequestEditor';
import { Link } from 'react-router'

class EditRequestPage extends Component {
  render() {
    return (
      <div id="main">
        <Link className="btn new-request" to='/new'>New request</Link>
        <RequestsList/>
        <RequestEditor id={ this.props.params.id }/>
      </div>
    );
  }
}

export default EditRequestPage;
