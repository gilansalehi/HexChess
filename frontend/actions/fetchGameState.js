export const fetchGameStateData = (gameId) => {
  return (dispatch, getState) => {
    dispatch(fetchGameStateRequest());
    return fetchGameState(gameId).then(([response, json]) => {
      if (response.status === 200) {
        const { currentPlayer, thisPlayer } = getState().game;
        var serverCurrentPlayer = JSON.parse(json.position).currentPlayer;

        if (currentPlayer !== thisPlayer) {
          // not our turn according to client-side data
          dispatch(fetchGameStateSuccess(json));
        }
        if ( serverCurrentPlayer === thisPlayer ) {
          // server says that it is now our turn
          dispatch({ type: 'STOP_ACCEPTING_FETCH_DATA' });
        }
      } else {
        dispatch(fetchGameStateError(json))
      }
    })
  }
}

function fetchGameState(id) {
  const URL = '/games/' + id;
  return fetch(URL, { method: 'GET'})
     .then(response => Promise.all([response, response.json()]));
}

const fetchGameStateRequest = () => {
  return {
    type: 'FETCH_GAME_STATE_REQUEST'
  }
}

const fetchGameStateSuccess = (payload) => {
  return {
    type: 'FETCH_GAME_STATE_SUCCESS',
    payload
  }
}

const fetchGameStateError = (payload) => {
  return {
    type: 'FETCH_GAME_STATE_ERROR',
    payload
  }
}
