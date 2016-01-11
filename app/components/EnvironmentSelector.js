import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { pushPath, selectEnvironment, unsetEnvironment } from '../actions/ui';
import Select from './Select';

import styles from './EnvironmentSelector.module.scss';

const MANAGE_SELECT_ID = '__manage__';
const NO_ENVIRONMENT_ID = '__no_environment__';

const DEFAULT_OPTIONS = new List([
  {value: MANAGE_SELECT_ID, label: 'Manage...'},
  {value: NO_ENVIRONMENT_ID, label: 'No environment'}
]);

export default class EnvironmentSelector extends Component {
  onChange(e) {
    if (e.target.value === MANAGE_SELECT_ID) {
      this.props.dispatch(pushPath('/environments'));
    } else if (e.target.value == NO_ENVIRONMENT_ID) {
      this.props.dispatch(unsetEnvironment());
    } else {
      const environmentId = e.target.value;
      const environment = this.props.environments.find(e => e.id == environmentId);
      this.props.dispatch(selectEnvironment(environmentId));
    }
  }

  render() {
    const selected = this.props.activeEnvironment || NO_ENVIRONMENT_ID;
    const options = DEFAULT_OPTIONS.concat(this.props.environments.map((e) => {
      return {value: e.id, label: e.name}
    })).toJS();

    return (
      <div className="environmentSelector">
        <Select className={styles.select} name="environment"
                onChange={ this.onChange.bind(this)}
                selected={selected.toString()}
                options={options}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    environments: state.environments,
    activeEnvironment: state.ui.get('activeEnvironment')
  }
}

export default connect(mapStateToProps)(EnvironmentSelector);
