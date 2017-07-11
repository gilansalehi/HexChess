export const fetchGameStateData = (gameId) => {
  return (dispatch, getState) => {
    dispatch(fetchGameStateRequest());
    return fetchGameState(gameId).then(([response, json]) => {
      if (response.status === 200) {
        const { currentPlayer, thisPlayer } = getState().game;
        if (currentPlayer !== thisPlayer) {
          // only dispatch an action if it's not our turn yet, because of asynchronicity
          dispatch(fetchGameStateSuccess(json));
        }
      } else {
        dispatch(fetchGameStateError(json))
      }
    }
    )
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
