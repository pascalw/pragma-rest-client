import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RequestsList from '../components/RequestsList';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <div id="header"><Link to="/">Gettable</Link></div>
        <div id="main">
          <Link className="btn new-request" to='/new'>New request</Link>
          <RequestsList/>
          {this.props.children}
        </div>
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools');
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
}
