import React, { Component } from 'react';
import { connect } from 'react-redux';

import EnvironmentEditor from '../components/EnvironmentEditor';
import { upsertEnvironment } from '../actions/environments';

import styles from './EnvironmentsPage.module.scss';

class EnvironmentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onEnvironmentChange(environment) {
    this.props.dispatch(upsertEnvironment(environment));
    this.stopEditing();
  }

  startEditing(id) {
    return e => {
      e.preventDefault();
      this.setState({selectedEnvironment: id});
    };
  }

  stopEditing() {
    this.setState({selectedEnvironment: null});
  }

  render() {
    if (this.state.selectedEnvironment) {
      const environment = this.props.environments.find(e => e.id === this.state.selectedEnvironment);
      return (
        <div className="page">
          <EnvironmentEditor environment={environment}
                             onChange={this.onEnvironmentChange.bind(this)}
                             onBack={this.stopEditing.bind(this)}/>
        </div>
      );
    }

    return (
      <div className="page">
        <h1 className={styles.header}>Environments</h1>
        <div className={styles.environmentsList}>
          <ul>
            {this.props.environments.map((environment, index) =>
              <li key={index}>
                <a onClick={this.startEditing(environment.id).bind(this)} href="#">
                  {environment.name}
                  <i className="fa fa-angle-right"/>
                </a>
              </li>
            )}
          </ul>

          {this.props.environments.size == 0 && <div>No environments</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    environments: state.environments
  }
}

export default connect(mapStateToProps)(EnvironmentsPage);
