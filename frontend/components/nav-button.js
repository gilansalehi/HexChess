import React, { Component, PropTypes } from 'react';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.handleClick();
  }
  

  render() {
    // const quickDeploy...
    const { option } = this.props
    return (
      <div className="nav-button hover-hands" onClick={ this.handleClick }>
        { option.name }
      </div>
    );
  }
}
