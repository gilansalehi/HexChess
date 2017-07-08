import React, { Component, PropTypes } from 'react';
import NavButton from './nav-button.js';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export default class Nav extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="nav clearfix">
        { this.props.children }
      </div>
    );
  }
}
