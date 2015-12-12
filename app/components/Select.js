import React, { Component, PropTypes } from 'react';

export default class Select extends Component {
  static propTypes = {
    options: PropTypes.array,
    selected: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  render() {
    return (
      <select name={this.props.name} onChange={this.props.onChange} value={ this.props.selected }>
        {this.props.options.map((option, i) =>
          <option key={ i } value={option.value}>{option.label}</option>
        )}
      </select>
    );
  }
}
