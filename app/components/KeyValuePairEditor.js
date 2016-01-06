import React, { Component, PropTypes } from 'react';
import { List, Map } from 'immutable';
import styles from './KeyValuePairEditor.module.scss';

class SinglePairEditor extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    pairType: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  };

  onChange(e) {
    e.preventDefault();
    this.props.onChange(this.refs.name.value, this.refs.value.value);
  }

  onRemove(e) {
    e.preventDefault();
    this.props.onRemove();
  }

  render() {
    return (
      <div className={styles.singleItem}>
        <input type="text" placeholder={this.props.pairType} ref="name"
               value={this.props.name}
               onChange={this.onChange.bind(this)}/>
        <input type="text" placeholder="Value" ref="value"
               value={this.props.value}
               onChange={this.onChange.bind(this)}/>

        <button className="icon" onClick={this.onRemove.bind(this)}>
          <i className="fa small fa-minus-circle"/>
        </button>
      </div>
    );
  }
}

export default class KeyValuePairEditor extends Component {
  static defaultProps = {
    pairs: new List()
  };

  static propTypes = {
    name: PropTypes.object.isRequired,
    pairs: React.PropTypes.instanceOf(List),
    onChange: PropTypes.func.isRequired
  };

  onChange(index) {
    return (newKey, newValue) => {
      let pairs = this.props.pairs.set(index, new List([newKey, newValue]));
      this.props.onChange(pairs);
    };
  }

  addEmpty(e) {
    e.preventDefault();

    let pairs = this.props.pairs.push(new List(['', '']));
    this.props.onChange(pairs);
  }

  removePair(index) {
    return () => {
      let pairs = this.props.pairs.remove(index);
      this.props.onChange(pairs);
    };
  }

  render() {
    return (
      <div className={styles.keyValuePairEditor}>
        <h1>{this.props.name.plural}</h1>
        <button className="icon" onClick={this.addEmpty.bind(this)}>
          <i className="fa small fa-plus-circle"/>
        </button>

        {this.props.pairs.map(([key, value], index) => {
          return <SinglePairEditor key={index}
                                   pairType={this.props.name.singular}
                                   name={key}
                                   value={value}
                                   onChange={this.onChange(index)}
                                   onRemove={this.removePair(index)}/>
        })}

      </div>
    );
  }
};
