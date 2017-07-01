import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GamesList from '../components/gamesList';

import {
  fetchAllGames,
} from '../actions/startup';

import {
  postNewGame,
} from '../actions/gameIndex';

class GamesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };
  }

  componentDidMount() {
    const self = this;
    const continuouslyFetchGamesIndex = () => {
      this.props.fetchAllGames();
      window.setTimeout(continuouslyFetchGamesIndex, 3000);
    }
    continuouslyFetchGamesIndex();
  }

  render() {
    const { games, postNewGame } = this.props;
    return (
      <div>
        <GamesList games={games} newGame={ postNewGame } />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllGames: fetchAllGames,
    postNewGame: postNewGame,
    // actionName: action imported from ./actions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesIndex);
