import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, History } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.bindFunctions();
  }

  bindFunctions() {
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return(
      <div>
        <div className="main group">
          <div className="sidebar">
            <input value={this.state.text} onChange={this.updateInput} />
            { this.state.text }
          </div>
          <content className="content group">
            {this.props.children}
          </content>
        </div>
      </div>
    );
  }
}

window.init = function () {
  document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  });
};
