import React, { Component, PropTypes } from 'react';
import Select from './Select';

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

  componentDidMount() {
    this.setState({request: this.props.request})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({request: nextProps.request})
  }

  onChange(e) {
    this.setState({request: Object.assign({}, this.state.request, {[e.target.name]: e.target.value})})
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSave(this.state.request)
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

        <input type="submit" value="Save"/>
      </form>
    )
  }
}

class RequestEditor extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
    onRequestChange: PropTypes.func.isRequired,
    onRequestDelete: PropTypes.func
  };

  onDelete(e) {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this request?"))
      this.props.onRequestDelete && this.props.onRequestDelete(this.props.request);
  }

  render() {
    return (
      <div className="request-editor">
        <button className="delete" onClick={this.onDelete.bind(this)}>Delete</button>

        <RequestForm request={this.props.request} onSave={this.props.onRequestChange.bind(this)}/>

        <button>Execute</button>
        <pre className="response"/>
      </div>
    );
  }
}

export default RequestEditor;
