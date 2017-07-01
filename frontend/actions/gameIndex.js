import $ from 'jquery';

export const postNewGame = () => {
  return (dispatch) => {
    dispatch(postNewGameRequest());
    return postGame()
  }
}

function postGame() {
  $.ajax({
    type: 'POST',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    url: '/games',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({ game: { status: 'seeking', p1_id: 1, creator_id: 1 } }),
    // success: function(json) {
    //   return postNewGameSuccess(json);
    // },
    // error: function(args) {
    //   debugger;
    //   return postNewGameError(args)
    // }
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
