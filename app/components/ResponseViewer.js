import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CodeMirror, { defaultOptions as globalDefaultCodeMirrorOptions } from './CodeMirror';

import { extractMimeType } from '../utils/headers';
import styles from './ResponseViewer.module.scss';

function toTitleCase(str) {
  return str.replace(/\w*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function prettifyBody(response) {
  const mimeType = extractMimeType(response.headers);

  if (mimeType === 'application/json' && response.body.length > 0) {
    try {
      return JSON.stringify(JSON.parse(response.body), null, 4);
    } catch (e) {
      return response.body;
    }
  }

  return response.body;
}

const defaultCodeMirrorOptions = {
  ...globalDefaultCodeMirrorOptions,
  readOnly: true
};

function codeMirrorOptions(response) {
  return {...defaultCodeMirrorOptions, mode: extractMimeType(response.headers)};
}

function responseStatusClassification(status) {
  if (status >= 500)
    return 'error';

  if (status >= 400 && status < 500)
    return 'warning';

  return 'ok';
}

class ResponseViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {prettifyBody: true};
  }

  body(response) {
    if (!this.state.prettifyBody)
      return response.body;

    return prettifyBody(response);
  }

  toggleBodyDisplay(e) {
    this.setState({prettifyBody: e.target.id === 'prettify-body'});
  }

  render() {
    if (!this.props.response)
      return null;

    if (this.props.response.pending) {
      return <div className={styles.responseLoading}>
        <div>
          <p>Loading...</p>
          <button onClick={this.props.onCancel}>Cancel</button>
        </div>
      </div>;
    }

    const response = this.props.response.object;
    const error = this.props.response.error;

    if (error)
      return (
        <div className={styles.response}>
          <div>
            <h3>Request failed</h3>
            { error.message }
          </div>
        </div>
      );

    return (
      <div className={styles.response}>
        <Tabs className={styles.tabs}>
          <TabList>
            <Tab>Body</Tab>
            <Tab>Headers</Tab>
          </TabList>
          <TabPanel>
            <span className="responseTime">{ response.responseTimeMs }&nbsp;ms</span>
            <span className={'status ' + responseStatusClassification(response.status)}>
              {response.status } { response.statusText }
            </span>

            <nav className={styles.bodyDisplayPicker}>
              <input id="prettify-body" type="radio" name="body"
                     checked={this.state.prettifyBody}
                     onChange={this.toggleBodyDisplay.bind(this)}/>
              <label htmlFor="prettify-body">Pretty</label>
              <input id="raw-body" type="radio" name="body"
                     checked={!this.state.prettifyBody}
                     onChange={this.toggleBodyDisplay.bind(this)}/>
              <label htmlFor="raw-body">Raw</label>
            </nav>

            <CodeMirror value={this.body(response)} options={codeMirrorOptions(response)}/>
          </TabPanel>
          <TabPanel>
            <span>
              <ul>
                { [...response.headers.keys()].map(header =>
                  <li key={header}>
                    <b>{toTitleCase(header)}:</b>&nbsp;
                {response.headers.get(header)}
                  </li>
                )}
              </ul>
            </span>
          </TabPanel>
        </Tabs>

      </div>
    );
  }
}

export default ResponseViewer;
