
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Notification from '../components/notification';

import $ from 'jquery';
import { Link } from 'react-router-dom';
import {
  loginRequest
} from '../actions/login';

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.showErrorNotification = this.showErrorNotification.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleKeyDown(e) {
    if ( e.keyCode === 13 ) { // ENTER
      this.submit(e)
    }
  }

  showErrorNotification(text) {
    return (
      <Notification text={text} />
    );
  }

  submit(e) {
    e.preventDefault();
    const self = this;
    const credentials = { user: this.state };
    const callbacks = {
      success: () => { self.props.history.push('/play') },
      error: () => { self.props.history.push('/login') },
    };
    this.props.loginRequest(credentials, callbacks);
  }

  updateUsername(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  updatePassword(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  render() {
    const { error } = this.props;

    return (
      <div className="auth-page group sixty-left">
        <h1>Log in</h1>
        <div>{ error && error.length && this.showErrorNotification(error) }</div>
        <form onSubmit={ this.submit } className="clearfix" onKeyDown={ e => this.handleKeyDown(e) }>

          <label htmlFor="username">Username:</label><br></br>
          <input id="username"
                 type="text"
                 name="user[username]"
                 onChange={ e => this.updateUsername(e) }
                 value={ this.state.name }
                 placeholder="Enter your username"></input>
          <br></br>

          <label htmlFor="password">Password:</label><br></br>
          <input id="password"
                 type="password"
                 name="user[password]"
                 onChange={ e => this.updatePassword(e) }
                 value={ this.state.password }
                 placeholder="Enter your password"></input>
          <br></br>

          <Link to={"/play"}>
            <div className="submit-button" type="submit" onClick={ this.submit }>Log In</div>
          </Link>
        </form>

        <div className="join-block">
          No account? &nbsp;
          <Link to={'/signup'} style={{textDecoration:'underline'}}>Sign Up</Link>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
    error: state.errors.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginRequest: loginRequest
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
