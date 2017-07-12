
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import $ from 'jquery';
import { Link } from 'react-router-dom';
import {
  signupRequest
} from '../actions/login';

class SignupForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleKeyDown(e) {
    if ( e.keyCode === 13 ) { // ENTER
      this.submit(e)
    }
  }

  submit(e) {
    e.preventDefault();
    const credentials = { user: this.state };
    if ( this.state.password !== this.state.confirmPassword ) {
      alert("Make sure your passwords match!");
      return false;
    }
    this.props.history.push('/play')
    this.props.signupRequest(credentials);
  }

  updateUsername(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  updatePassword(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  updateConfirmPassword(e) {
    const confirmPassword = e.target.value;
    this.setState({ confirmPassword });
  }

  render() {

    return (
      <div className="auth-page group sixty-left">
        <h1>Sign Up</h1>

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
          <label htmlFor="confirm">Confirm Password:</label><br></br>
          <input id="password"
                 type="password"
                 name="user[password]"
                 onChange={ e => this.updateConfirmPassword(e) }
                 value={ this.state.confirmPassword }
                 placeholder="Confirm your Password"></input>
          <br></br>

          <Link to={"/profile"} className="submit-button" type="submit" onClick={ this.submit }>Sign Up</Link>
        </form>

        <div className="join-block">
          Already Signed Up? &nbsp;
          <Link to={'/login'} style={{textDecoration:'underline'}}>Log In</Link>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signupRequest: signupRequest
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
