import React, { Component, PropTypes } from 'react';
import { Typeahead } from 'react-typeahead';

import styles from './AutocompleteField.module.scss';

export default class AutocompleteField extends Component {
  value() {
    return this.refs.typeahead.refs.entry.value;
  }

  onOptionSelected(option) {
    this.props.onChange(option);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return <Typeahead {...this.props} ref="typeahead"
                                      className={styles.typeahead}
                                      maxVisible={10}
                                      onOptionSelected={ this.onOptionSelected.bind(this) }
                                      onChange={ this.onChange.bind(this) }
                                      customClasses={ styles }/>
  }
}
