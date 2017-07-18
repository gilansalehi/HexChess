import React, { Component, PropTypes } from 'react';
import Button from './button';

export default class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = { show: true };

    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    this.setState({ show: false });
  }

  render() {
    const { text, handleClick } = this.props;
    return (
      <div className={ this.state.show ? 'notification' : 'hidden' }>
        <span className='notification-text'>{ text }</span>
        <span onClick={this.dismiss} className='mini-button float-right'>×</span>
      </div>
    );
  }
}
