import React, { Component, PropTypes } from 'react';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showKids: false,
    };

    this.showKids = this.showKids.bind(this);
    this.hideKids = this.hideKids.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showKids() {
    this.setState({ showKids: true });
  }

  hideKids() {
    this.setState({ showKids: false });
  }

  handleClick() {
    const { handleClick } = this.props;
    handleClick && handleClick();
  }

  render() {
    const { option } = this.props
    const { showKids } = this.state;
    const styler = { backgroundColor: option.color || '#777' };
    return (
      <div className="nav-button hover-hands"
        onClick={ this.handleClick }
        style={styler}
        onMouseEnter={ this.showKids }
        onMouseLeave={ this.hideKids }
      >
        { option.name }
        <div className="nav-button-value">{ option.value }</div>
        <div className="floaty" style={ showKids && this.props.children ? styler : {display: 'none'} }>
          { showKids && this.props.children }
        </div>
      </div>
    );
  }
}
