import React, { Component, PropTypes } from 'react';
import bindKey from 'keymaster';
bindKey.filter = () => true; // allows trigger always, including when inputs are focused

import Codemirror, { defaultOptions as defaultCodeMirrorOptions } from './codeMirror';
import Select from './Select';
import RequiredInput from './RequiredInput';
import KeyValuePairEditor from './KeyValuePairEditor';

import { extractMimeType, HEADERS } from '../utils/headers';
import styles from './RequestEditor.module.scss';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
const REQUEST_TRIGGER_KEYS = '⌘+enter, ctrl+enter';

function codeMirrorOptions(request) {
  return {
    ...defaultCodeMirrorOptions,
    mode: extractMimeType(request.headers) || 'text/plain'
  };
}

class RequestForm extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({request: this.props.request});
    bindKey(REQUEST_TRIGGER_KEYS, this.onExecute.bind(this));
  }

  componentWillUnmount() {
    bindKey.unbind(REQUEST_TRIGGER_KEYS);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.request !== nextProps.request)
      this.setState({request: nextProps.request});
  }

  onChange(e) {
    this.setState({request: this.state.request.set(e.target.name, e.target.value)});
  }

  onBodyChange(body) {
    this.setState({request: this.state.request.set('body', body)});
  }

  onHeadersChange(headers) {
    this.setState({request: this.state.request.set('headers', headers)});
  }

  /**
   * Gets current request, skipping any empty headers.
   */
  prepareRequest() {
    return this.state.request.set('headers', this.state.request.headers.filter(header => {
      return header.length != 0;
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSave(this.prepareRequest());
  }

  onExecute(e) {
    e.preventDefault();

    if (this.refs.url.checkValidity())
      this.props.onExecute(this.prepareRequest());
  }

  render() {
    if (this.state.request === undefined)
      return (<form/>);

    const request = this.state.request;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <RequiredInput type="text" className="name" name="name" placeholder="name" value={request.name}
                       onChange={ this.onChange.bind(this)}/>

        <div className="method-url-group">
          <Select name="method"
                  onChange={ this.onChange.bind(this)}
                  selected={request.method}
                  options={ METHODS.map((m) => { return { value: m, label: m } } ) }/>

          <RequiredInput ref="url" type="text" className="url" name="url" placeholder="url" value={ request.url }
                         onChange={this.onChange.bind(this)}/>
          <button className="execute" onClick={ this.onExecute.bind(this) }>Execute</button>
        </div>

        <KeyValuePairEditor
          name={{ singular: 'Header', plural: 'Headers'}}
          pairs={request.headers}
          onChange={this.onHeadersChange.bind(this)}
          keyOptions={HEADERS}/>

        <Codemirror value={request.body || ''}
                    options={codeMirrorOptions(request)}
                    onChange={this.onBodyChange.bind(this)}/>

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
