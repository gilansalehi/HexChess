import React, { Component, PropTypes } from 'react';
import Piece from './piece.js';
import Hex from './hex.js';
import NavButton from './nav-button.js';
import Reserve from './reserve.js';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.generateOptionsList = this.generateOptionsList.bind(this);
  }

  generateOptionsList() {
    const { options } = this.props;

    return options.map((opt, i) => {
      return (
        <li key={i}>
          <NavButton option={ opt } handleClick={ opt.handleClick } />
        </li>
      );
    });
  }

  render() {
    // const quickDeploy...
    const { pieces } = this.props; 
    const optionsList = this.generateOptionsList();
    const showReserve = (this.props.player1.reserve === 'displayed');

    return (
      <div className="nav clearfix">
        <NavButton option={{ name: 'NAV' }} />
        <div className="nav-flex-positioner">
          <ul className="nav-list clearfix">
            { optionsList }
          </ul>
        </div>
        <div className={ showReserve ? 'displayed' : 'hidden' } >
          <Reserve
            player1={ this.props.player1 }
            showReserve={ showReserve }
            pieces={ pieces }
          />
        </div>
      </div>
    );
  }
}
