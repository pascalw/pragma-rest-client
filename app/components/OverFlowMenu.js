import React, { Component, PropTypes, cloneElement } from 'react';
import styles from './OverFlowMenu.module.scss';

export class OverflowItem extends Component {
  onClick(e) {
    this.props.onClick(e);
    this.props.onClicked();
  }

  render() {
    return (
      <div className={styles.item} {...this.props} onClick={this.onClick.bind(this)}>
        { this.props.children }
      </div>
    );
  }
}

export default class OverFlowMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  toggle() {
    this.setOpen(!this.isOpen());
  }

  isOpen() {
    return this.state.open;
  }

  setOpen(openOrClosed) {
    this.setState({open: openOrClosed});
  }

  onItemClicked() {
    this.toggle();
  }

  onMouseLeave() {
    this.setOpen(false);
  }

  render() {
    const cn = [this.state.open ? styles.overflowMenuOpen : styles.overflowMenu, this.props.className].join(' ');

    return (
      <div className={ cn }>
        <button className={styles.btn} onClick={this.toggle.bind(this)}>
          <i className="fa small fa-ellipsis-v"/>
        </button>

        <div className="items" onMouseLeave={this.onMouseLeave.bind(this)}>
          { React.Children.map(this.props.children, (child) => {
            return cloneElement(child, {
              onClicked: this.onItemClicked.bind(this)
            });
          })}
        </div>
      </div>
    );
  }
}
