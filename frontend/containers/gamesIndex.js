import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import GamesList from '../components/gamesList';
import Rules from '../components/rules';

import {
  fetchAllGames,
} from '../actions/startup';

import {
  postNewGame,
  joinGame,
  observeGame,
  updateReceived,
  createAction,
  cancelSeek,
  playComputer,
} from '../actions/gameIndex';

class GamesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'none'
    };

    this.applyFilter = this.applyFilter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.newGame = this.newGame.bind(this);
    this.playComputer = this.playComputer.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setupActionCable = this.setupActionCable.bind(this);
    this.setupPollGamesIndex = this.setupPollGamesIndex.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllGames();

    if (typeof App !== 'undefined') {
      this.setupActionCable();
    } else {
      this.setupPollGamesIndex();
    }
  }

  componentWillUnmount() {
    this.pollGamesIndex = false;
  }

  setupActionCable() {
    const self = this;
    console.log('Setting up Action Cable.' );
    App.games = App.cable.subscriptions.create("GamesChannel", {
      connected:    function() { console.log('GAMES_INDEX_SUCCESSFULLY_CONNECTED'); },
      disconnected: function() { console.log('GAMES_INDEX_DISCONNECTED'); },
      received:     function(data) { self.props.createAction(data); },
      speak: function(data) {
        console.log('cable is speaking...');
        return this.perform('speak', { data: data });
      }
    });
  }

  setupPollGamesIndex() {
    console.log('Action Cable unavailable, setting up db poll.')
    this.pollGamesIndex = () => {
      this.props.fetchAllGames();
      window.setTimeout(this.pollGamesIndex, 10000);
    }
    this.pollGamesIndex();
  }

  applyFilter() {
    const { games } = this.props;
    const { filter } = this.state;
    if ( filter === 'none' ) { return games; }
    return games.filter(g => g.status === filter);
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  newGame() {
    const {postNewGame, user} = this.props;
    user ? postNewGame(user) : alert('Please log in');
  }

  playComputer() {
    debugger;
    this.props.playComputer();
    // this.props.history.push('/games/ai');
  }

  handleClick(id) {
    const {user, games, joinGame, observeGame} = this.props;
    const game = games.filter(g => g.id === id)[0];
    if ( !user ) {
      observeGame(id);
    } else if ( user.id === game.p1_id ) {
      joinGame({ p1_id: user.id }, id);
    } else if ( user.id === game.p2_id ) {
      joinGame({ p2_id: user.id }, id);
    } else if ( !game.p2_id ) {
      joinGame({ p2_id: user.id, status: 'in progress' }, id);
    } else {
      observeGame(id)
    }
  }

  render() {
    const { user, games, fetchAllGames, cancelSeek } = this.props;
    const { filter } = this.state;
    let info;
    if (user) {
      info = (
        <span>
          Click a game below to join, or observe a game already in progress.
        </span>
      );
    } else {
      info = (
        <span>
          Click a game below to spectate.  You must <Link to={'/login'} style={{textDecoration:'underline'}}>log in</Link> to play.
        </span>
      );
    }

    const filteredGames = this.applyFilter();
    return (
      <div className="sixty-left center-pane">

        <h1 className="header"> Games </h1>
        <span className="sub-header">{ info }</span>
        <div className="tab-list clearfix consolas">
          <span className={`${filter === 'none' ? '' : 'in'}active tab`}
            onClick={e => this.setFilter('none')}>All</span>
          <span className={`${filter === 'seeking' ? '' : 'in'}active tab`}
            onClick={e => this.setFilter('seeking')}>Seeking</span>
          <span className={`${filter === 'in progress' ? '' : 'in'}active tab`}
            onClick={e => this.setFilter('in progress')}>In Progress</span>
        </div>

        <GamesList games={ filteredGames }
                   newGame={ this.newGame }
                   refresh={ fetchAllGames }
                   handleClick={ this.handleClick }
                   user={ user }
                   playComputer={ this.playComputer }
                   cancelSeek={ cancelSeek }
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
    updateReceived: updateReceived,
    createAction: createAction,
    cancelSeek: cancelSeek,
    playComputer: playComputer,
    // actionName: action imported from ./actions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesIndex);
