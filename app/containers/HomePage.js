import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RequestsList from '../components/RequestsList';
import RequestEditor from '../components/RequestEditor';

export class HomePage extends Component {
  render() {
    if (this.props.projects.size == 0)
      return (<div className="page">
        <a href="#" onClick={ () => window.openProject() }>Open</a>
        a project to get started
      </div>);

    return (
      <div className="page">Select a request on the left</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps)(HomePage);
