import React, { Component } from 'react';
import RequestsList from '../components/RequestsList';
import RequestEditor from '../components/RequestEditor';
import { Link } from 'react-router'

class EditRequestPage extends Component {
  render() {
    return (
      <RequestEditor id={ this.props.params.id }/>
    );
  }
}

export default EditRequestPage;
