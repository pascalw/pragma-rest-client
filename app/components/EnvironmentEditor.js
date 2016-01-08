import React, { Component } from 'react';
import KeyValuePairEditor from '../components/KeyValuePairEditor';

import styles from './EnvironmentEditor.module.scss';

export default class EnvironmentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({environment: this.props.environment});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.environment !== nextProps.environment)
      this.setState({environment: nextProps.environment});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onChange(this.state.environment);
  }

  onVariablesChange(variables) {
    this.setState({environment: this.state.environment.set('variables', variables)});
  }

  onNameChange(e) {
    this.setState({environment: this.state.environment.set('name', e.target.value)});
  }

  onBack(e) {
    e.preventDefault();
    this.props.onBack();
  }

  render() {
    const environment = this.state.environment;
    if (environment == null)
      return null;

    return <div className="environmentEditor">
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" className="name" name="name" placeholder="name" value={environment.name}
               onChange={this.onNameChange.bind(this)}
               required/>

        <KeyValuePairEditor name={{ singular: 'Variable', plural: "Variables" }}
                            pairs={environment.variables}
                            onChange={this.onVariablesChange.bind(this)}/>

        <button className={styles.backButton} onClick={this.onBack.bind(this)}>
          <i className="fa fa-angle-left"/>
          Back
        </button>
        <input type="submit" value="Save"/>
      </form>
    </div>
  }
}
