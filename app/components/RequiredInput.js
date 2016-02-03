import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default class RequiredInput extends Component {
  constructor(props) {
    super(props);
    this.boundOnInvalid = this.onInvalid.bind(this);

    this.state = {valid: true};
  }

  value() {
    return this.findDOMNode().value;
  }

  findDOMNode() {
    return ReactDOM.findDOMNode(this.refs.input);
  }

  componentDidMount() {
    this.findDOMNode().addEventListener('invalid', this.boundOnInvalid);
  }

  componentWillUnmount() {
    this.findDOMNode().removeEventListener('invalid', this.boundOnInvalid);
  }

  onInvalid() {
    this.setState({valid: false});
  }

  onChange(e) {
    let node = this.findDOMNode();

    this.setState({valid: node.validity.valid});
    this.props.onChange && this.props.onChange(e);
  }

  checkValidity() {
    const valid = this.refs.input.checkValidity();
    if (!valid)
      this.refs.input.focus();

    return valid;
  }

  render() {
    const className = classNames(this.props.className, this.state.valid ? '' : 'invalid');

    return <input ref="input" {...this.props}
                  className={ className }
                  onChange={this.onChange.bind(this)}
                  required/>
  }
}
