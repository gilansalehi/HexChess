import $ from 'jquery';

export const postGameStateData = (gameId, gameState) => {
  return (dispatch) => {
    dispatch({ type: 'POST_GAME_STATE_REQUEST' });
    return postGameState(gameId, gameState, dispatch)
  }
}

function postGameState(gameId, gameState, dispatch) {
  $.ajax({
    type: 'PUT',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    url: '/games/' + gameId,
    dataType: 'json',
    contentType: 'application/json',
    // Rails parses the JSON automatically so we must double-stringify to store gamestate as a string
    data: JSON.stringify({ game: { position: JSON.stringify(gameState) } }),
    success: function(json) {
      dispatch({ type: 'POST_GAME_STATE_SUCCESS', payload: json });
    },
    error: function(msg) {
      dispatch({ type: 'POST_GAME_STATE_ERROR', payload: msg });
    }
  });
}
