import React, { Component, PropTypes } from 'react';
import Select from './Select';
import HeaderEditor from './HeaderEditor';
import { Map, List } from 'immutable';

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
      request.headers = request.headers.map((value, key) => {
        return new List([key, value]);
      }).toList();
    }

    this.setState({request: request});
  }

  componentDidMount() {
    this.setRequestState(this.props.request);
  }

  componentWillReceiveProps(nextProps) {
    this.setRequestState(nextProps.request);
  }

  onChange(e) {
    this.setState({request: Object.assign({}, this.state.request, {[e.target.name]: e.target.value})})
  }

  onHeadersChange(headers) {
    this.setState({request: Object.assign({}, this.state.request, {headers: headers})});
  }

  onSubmit(e) {
    e.preventDefault();

    let request = {...this.state.request};
    // convert headers back into map
    request.headers = request.headers.reduce((previousValue, currentValue) => {
      return previousValue.set(currentValue.get(0), currentValue.get(1));
    }, new Map());

    this.props.onSave(request);
  }

  render() {
    if (this.state.request === undefined)
      return (<form/>);

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="method-url-group">
          <Select name="method"
                  onChange={ this.onChange.bind(this)}
                  selected={this.state.request.method}
                  options={ METHODS.map((m) => { return { value: m, label: m } } ) }/>

          <input type="url" name="url" placeholder="url" value={ this.state.request.url }
                 onChange={this.onChange.bind(this)}
                 required/>
        </div>

        <input type="text" name="name" placeholder="name" value={this.state.request.name}
               onChange={ this.onChange.bind(this)}
               required/>

        <HeaderEditor headers={this.state.request.headers} onChange={this.onHeadersChange.bind(this)}/>

        <textarea className="body" name="body" placeholder="body"
                  value={this.state.request.body || ''}
                  onChange={this.onChange.bind(this)}/>

        <input type="submit" value="Save"/>
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

  onExecute(e) {
    e.preventDefault();
    this.props.onRequestExecute(this.props.request);
  }

  render() {
    return (
      <div className="request-editor">
        <button className="delete" onClick={this.onDelete.bind(this)}>Delete</button>

        <RequestForm request={this.props.request} onSave={this.props.onRequestChange.bind(this)}/>

        <button onClick={ this.onExecute.bind(this) }>Execute</button>
      </div>
    );
  }
}

export default RequestEditor;
