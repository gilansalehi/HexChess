import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GamesList games={ games }
                 newGame={ this.newGame }
                 refresh={ fetchAllGames }
                 handleClick={ this.handleClick }
                 user={ user }
      />
    )
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
