import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GamesIndex from './gamesIndex';
import Game from './game';
import {
  keydown
} from '../actions/index.js';

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { game } = this.props;
    return(
      <div>
        <div className="main group">
          <GamesIndex />
          <Game {...game} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    keydown: keydown
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
