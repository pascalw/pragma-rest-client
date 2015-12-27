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
