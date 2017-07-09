import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GamesIndex from './gamesIndex';
import Game from './game';
import Nav from '../components/app-nav';
import NavButton from '../components/nav-button.js';
import LoginForm from '../containers/login';
import SignupForm from '../containers/signup';
import Profile from '../containers/user';
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
    this.handleSession = this.handleSession.bind(this);
  }

  handleSession() {
    const { user } = this.props;

    if (user) {
      this.props.logoutRequest();
    }
  }

  buildNav() {
    const { user, logoutRequest } = this.props;

    const userInfo = (<div> Logged in as: { user && user.name } </div>);

    return (
      <Nav options={[]}>
        <Link to={'/'}>
          <NavButton option={{ name: 'Home' }} />
        </Link>
        <Link to={user ? '/profile' : '/signup' }>
          <NavButton
            option={{
              name:  user ? 'Hello!' : 'Sign Up',
              color: user ? '#fa0'   : '#777',
            }}
          >
            { user && userInfo }
          </NavButton>
        </Link>
        <Link to={user ? '/' : '/login'} onClick={ this.handleSession }>
          <NavButton option={{ name: user ? 'Log Out' : 'Log In'}} />
        </Link>
      </Nav>
    );
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
            <Route path={'/signup'} component={SignupForm} />
            <Route path={'/games/:id'} component={Game} />
            <Route path={'/profile'} component={Profile} />
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
