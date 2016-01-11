import React, { Component } from 'react';
import { connect } from 'react-redux';

import EnvironmentEditor from '../components/EnvironmentEditor';
import { upsertEnvironment, deleteEnvironment, Environment } from '../actions/environments';

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

      const environment = this.props.environments.find(e => e.id === id);
      this.setState({selectedEnvironment: environment});
    };
  }

  stopEditing() {
    this.setState({selectedEnvironment: null});
  }

  addNewEnvironment(e) {
    e.preventDefault();

    const newEnvironment = new Environment();
    this.setState({selectedEnvironment: newEnvironment});
  }

  onDeleteEnvironment(environment) {
    if (window.confirm('Are you sure you want to remove this environment?')) {
      this.props.dispatch(deleteEnvironment(environment));
      this.stopEditing();
    }
  }

  render() {
    if (this.state.selectedEnvironment) {
      return (
        <div className="page">
          <EnvironmentEditor environment={this.state.selectedEnvironment}
                             onChange={this.onEnvironmentChange.bind(this)}
                             onBack={this.stopEditing.bind(this)}
                             onDelete={this.onDeleteEnvironment.bind(this)}/>
        </div>
      );
    }

    return (
      <div className="page">
        <h1 className={styles.header}>Environments
          <button className={ 'icon ' + styles.newEnvironment} href="#" onClick={this.addNewEnvironment.bind(this)}>
            <i className="fa small fa-plus-circle"/>
          </button>
        </h1>

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
