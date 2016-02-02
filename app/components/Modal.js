import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';

import styles from './Modal.module.scss';

const modalStyle = {
  overlay: {
    backgroundColor: styles.overlayBackground,
    zIndex: 100
  },
  content: {
    width: '50%',
    left: '25%',
    top: '20%',
    minHeight: '30%',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    background: styles.contentBackground,
    borderRadius: styles.borderRadius,
    padding: styles.padding
  }
};

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func
  };

  close() {
    this.props.onRequestClose && this.props.onRequestClose();
  }

  render() {
    return (
      <ReactModal isOpen={this.props.isOpen}
                  onRequestClose={this.props.onRequestClose}
                  style={modalStyle}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={this.close.bind(this)}>✕</button>
        </div>

        { this.props.children }
      </ReactModal>
    );
  }
}
