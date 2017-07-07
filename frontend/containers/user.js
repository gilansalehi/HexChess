import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    if ( !user ) {
      return (
        <div className="profile-page group sixty-left">
          <h1>Oops!</h1>
          <span>Something went wrong.  Please <Link to={'/login'}>Log In</Link></span>
        </div>
      )
    }
    return (
      <div className="profile-page group sixty-left">
        <h1>Welcome, { user.name }!</h1>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
