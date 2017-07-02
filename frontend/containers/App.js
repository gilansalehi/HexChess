import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GamesIndex from './gamesIndex';
import Game from './game';
import LoginForm from '../containers/login';
import {
  keydown
} from '../actions/index.js';
import {
  logoutRequest,
} from '../actions/login';

class App extends Component {
  constructor(props) {
    super(props);

    this.buildNav = this.buildNav.bind(this);
  }

  buildNav() {
    const { user, logoutRequest } = this.props;
    if ( user ) {
      return (
        <nav>
          <Link to={'/'}>Home</Link>
          <span> Logged in as { user.name } </span>
          <a className='hover-hands' onClick={ logoutRequest }>Log Out</a>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/login'}>Log In</Link>
        </nav>
      );
    }
  }

  render() {
    const { game, user } = this.props;
    const nav = this.buildNav();

    return(
      <div>

      <Router>
        <div className="main group">
          { nav }
          <div className="routes">
            <Route exact path={'/'} component={GamesIndex} />
            <Route path={'/login'} component={LoginForm} />
            <Route path={'/games/:id'} component={Game} />
          </div>
        </div>
      </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.game,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    keydown: keydown,
    logoutRequest: logoutRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
