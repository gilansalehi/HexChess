import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
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
      <Router>
        <div className="main group">
        <Route exact path={''} component={GamesIndex} />
          <Route exact path={'/'} component={GamesIndex} />
          <Route path={'/games/:id'} component={Game} />
        </div>
      </Router>
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
