import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GamesList from '../components/gamesList';

import {
  fetchAllGames,
} from '../actions/startup';

import {
  postNewGame,
  joinGame,
  observeGame,
} from '../actions/gameIndex';

class GamesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };

    this.newGame = this.newGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.observeGame = this.observeGame.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllGames();
  }

  newGame() {
    const {postNewGame, user} = this.props;
    user ? postNewGame(user) : alert('Please log in');
  }

  joinGame(id) {
    const {joinGame, user} = this.props;
    user ? joinGame(user, id) : alert('Please log in');
  }

  observeGame(id) {
    const {observeGame, user} = this.props;
    observeGame(id);
  }

  render() {
    const { user, games, fetchAllGames } = this.props;
    return (
      <div className="sixty-left">
        <GamesList games={ games }
                   newGame={ this.newGame }
                   refresh={ fetchAllGames }
                   joinGame={ this.joinGame }
                   observeGame={ this.observeGame }
                   user={ user }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    games: state.games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllGames: fetchAllGames,
    postNewGame: postNewGame,
    joinGame: joinGame,
    observeGame: observeGame,
    // actionName: action imported from ./actions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesIndex);
