import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Codemirror, { defaultOptions as globalDefaultCodeMirrorOptions } from './Codemirror';

import { extractMimeType } from '../utils/headers';
import styles from './ResponseViewer.module.scss';

function toTitleCase(str) {
  return str.replace(/\w*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function prettifyBody(response) {
  const mimeType = extractMimeType(response.headers);

  if (mimeType === 'application/json')
    return JSON.stringify(JSON.parse(response.body), null, 4);

  return response.body;
}

const defaultCodeMirrorOptions = {
  ...globalDefaultCodeMirrorOptions,
  readOnly: true
};

function codeMirrorOptions(response) {
  return {...defaultCodeMirrorOptions, mode: extractMimeType(response.headers)};
}

class ResponseViewer extends Component {
  render() {
    if (!this.props.response)
      return null;

    if (this.props.response.pending) {
      return <div className={styles.response}>
        <p>Loading...</p>
      </div>;
    }

    const response = this.props.response.object;
    const error = this.props.response.error;

    if (error)
      return (
        <div className={styles.response}>
          <h3>Request failed:</h3>
          { error.message }
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
            <span>
              <b>Status:&nbsp;</b>
              {response.status } { response.statusText }
              <span className="responseTime">{ response.responseTimeMs }&nbsp;ms</span>
            </span>
            <Codemirror value={prettifyBody(response)} options={codeMirrorOptions(response)}/>
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
