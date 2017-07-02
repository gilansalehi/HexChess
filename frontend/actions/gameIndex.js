import $ from 'jquery';

export const postNewGame = (currentUser) => {
  return (dispatch) => {
    dispatch(postNewGameRequest());
    return postGame(currentUser, dispatch)
  }
}

function postGame(currentUser, dispatch) {
  $.ajax({
    type: 'POST',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    url: '/games',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({ game: { status: 'seeking', creator_id: currentUser.id } }),
    success: function(json) {
      dispatch({ type: 'POST_NEW_GAME_SUCCESS', payload: json });
    },
    error: function(msg) {
      dispatch({ type: 'POST_NEW_GAME_ERROR', payload: msg });
    }
  });
}

const postNewGameRequest = () => {
  return {
    type: "POST_NEW_GAME_REQUEST"
  }
}

const postNewGameSuccess = (payload) => {
  return {
    type: "POST_NEW_GAME_SUCCESS",
    payload
  }
}

const postNewGameError = () => {
  return {
    type: "POST_NEW_GAME_ERROR"
  }
}
