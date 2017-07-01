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

    this.bindFunctions();
  }

  bindFunctions() {
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(e) {
    this.props.keydown(e.target.value);
  }

  render() {
    const { game } = this.props;
    return(
      <div>
        <div className="main group">
          <div className="sidebar">
            <input value={this.props.input} onChange={this.updateInput} />
            { this.props.input }
          </div>
          <GamesIndex />
          <Game {...game} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    input: state.input,
    game: state.game,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    keydown: keydown
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
