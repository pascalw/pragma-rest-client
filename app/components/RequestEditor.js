import React, { Component, PropTypes } from 'react';
import Select from './Select';
import HeaderEditor from './HeaderEditor';
import { Map, List } from 'immutable';

import styles from './RequestEditor.module.scss';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

class RequestForm extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  setRequestState(request) {
    if (request && !List.isList(request.headers)) {
      // convert headers into a list of headers, so UI can have stable sorting
      request = request.set('headers', request.headers.map((value, key) => {
        return new List([key, value]);
      }).toList());
    }

    this.setState({request: request});
  }

  componentDidMount() {
    this.setRequestState(this.props.request);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.request !== nextProps.request)
      this.setRequestState(nextProps.request);
  }

  onChange(e) {
    this.setState({request: this.state.request.set(e.target.name, e.target.value)});
  }

  onHeadersChange(headers) {
    this.setState({request: this.state.request.set('headers', headers)});
  }

  onSubmit(e) {
    e.preventDefault();

    // convert headers back into map
    const request = this.state.request.set('headers', this.state.request.headers.reduce((previousValue, currentValue) => {
      return previousValue.set(currentValue.get(0), currentValue.get(1));
    }, new Map()));

    this.props.onSave(request);
  }

  onExecute(e) {
    e.preventDefault();
    this.props.onExecute(this.state.request);
  }

  render() {
    if (this.state.request === undefined)
      return (<form/>);

    const request = this.state.request;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" className="name" name="name" placeholder="name" value={request.name}
               onChange={ this.onChange.bind(this)}
               required/>

        <div className="method-url-group">
          <Select name="method"
                  onChange={ this.onChange.bind(this)}
                  selected={request.method}
                  options={ METHODS.map((m) => { return { value: m, label: m } } ) }/>

          <input type="url" className="url" name="url" placeholder="url" value={ request.url }
                 onChange={this.onChange.bind(this)}
                 required/>
          <button className="execute" onClick={ this.onExecute.bind(this) }>Execute</button>
        </div>

        <HeaderEditor headers={request.headers} onChange={this.onHeadersChange.bind(this)}/>

        <textarea className="body" name="body" placeholder="body"
                  value={request.body || ''}
                  onChange={this.onChange.bind(this)}/>

        <input type="submit" value="Save"/>

        {request.id ? <button className="delete" onClick={this.props.onDelete}>Delete</button> : null}
      </form>
    )
  }
}

class RequestEditor extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
    onRequestChange: PropTypes.func.isRequired,
    onRequestDelete: PropTypes.func,
    onRequestExecute: PropTypes.func
  };

  onDelete(e) {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this request?"))
      this.props.onRequestDelete && this.props.onRequestDelete(this.props.request);
  }

  onExecute(request) {
    this.props.onRequestExecute(request);
  }

  render() {
    return (
      <div className={styles.requestEditor}>
        <RequestForm request={this.props.request}
                     onSave={this.props.onRequestChange.bind(this)}
                     onExecute={this.onExecute.bind(this)}
                     onDelete={this.onDelete.bind(this)}/>
      </div>
    );
  }
}

export default RequestEditor;
