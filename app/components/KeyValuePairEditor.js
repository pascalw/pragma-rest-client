import React, { Component, PropTypes } from 'react';
import { List, Map } from 'immutable';
import styles from './KeyValuePairEditor.module.scss';

function listToMap(list) {
  return list.reduce((previousValue, currentValue) => {
    return previousValue.set(currentValue.get(0), currentValue.get(1));
  }, new Map());
}

function mapToList(map) {
  if (!List.isList(map)) {
    // convert map into a list of map, so UI can have stable sorting
    return map.map((value, key) => {
      return new List([key, value]);
    }).toList();
  }

  return map;
}

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
  static propTypes = {
    name: PropTypes.object.isRequired,
    pairs: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = this.stateForPairs(props.pairs);
  }

  componentDidMount() {
    this.setState(this.stateForPairs(this.props.pairs));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pairs !== nextProps.pairs)
      this.setState(this.stateForPairs(nextProps.pairs));
  }

  stateForPairs(pairs) {
    return {pairs: mapToList(pairs)};
  }

  notifyOnChange(pairs) {
    this.props.onChange(listToMap(pairs));
  }

  onChange(index) {
    return (newKey, newValue) => {
      let pairs = this.state.pairs.set(index, new List([newKey, newValue]));
      this.notifyOnChange(pairs);
    };
  }

  addEmpty(e) {
    e.preventDefault();

    let pairs = this.state.pairs.push(new List(['', '']));
    this.notifyOnChange(pairs);
  }

  removePair(index) {
    return () => {
      let pairs = this.state.pairs.remove(index);
      this.notifyOnChange(pairs);
    };
  }

  render() {
    return (
      <div className={styles.keyValuePairEditor}>
        <h1>{this.props.name.plural}</h1>
        <button className="icon" onClick={this.addEmpty.bind(this)}>
          <i className="fa small fa-plus-circle"/>
        </button>

        {this.state.pairs.map(([key, value], index) => {
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
