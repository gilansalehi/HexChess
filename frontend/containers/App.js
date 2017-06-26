import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import Board from '../components/board.js';
// import Nav from '../components/nav.js';
// import InfoPanel from '../components/info.js';
// import { Util } from './utils';
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
    return(
      <div>
        <div className="main group">
          <div className="sidebar">
            <input value={this.props.input} onChange={this.updateInput} />
            { this.props.input }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    input: state.input,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    keydown: keydown
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
