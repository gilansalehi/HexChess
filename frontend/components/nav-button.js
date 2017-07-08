import React, { Component, PropTypes } from 'react';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleClick } = this.props;
    handleClick && handleClick();
  }

  render() {
    const { option } = this.props
    const styler = { backgroundColor: option.color || '#777' };
    return (
      <div className="nav-button hover-hands" onClick={ this.handleClick } style={styler}>
        { option.name }
        <div className="nav-button-value">{ option.value }</div>
      </div>
    );
  }
}
