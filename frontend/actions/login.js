import $ from 'jquery';

export const loginRequest = (credentials, callbacks) => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST_PENDING' });
    return login(credentials, dispatch, callbacks);
  }
}

const login = (credentials, dispatch, callbacks) => {
  $.ajax({
    url: '/session',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: 'POST',
    dataType: 'json',
    data: credentials,
    success: function (currentUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: currentUser });
      callbacks && callbacks.success();
    },
    error: function (msg) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid credentials.' });
      callbacks && callbacks.error();
    }
  });
}

export const logoutRequest = (currentUser) => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT_REQUEST_PENDING' });
    return logout(currentUser, dispatch);
  }
}

export const logout = (currentUser, dispatch) => {
  $.ajax({
    url: '/logout',
    type: 'GET',
    dataType: 'json',
    success: function (currentUser) {
      dispatch({ type: 'LOGOUT_SUCCESS', payload: currentUser });
    },
    error: function (msg) {
      dispatch({ type: 'LOGOUT_ERROR', payload: msg });
    }
  });
};

export const fetchCurrentUser = (callback) => {
  dispatch({ type: 'FETCH_CURRENT_USER_PENDING' });
  $.ajax({
    url: '/api/session',
    type: 'GET',
    dataType: 'json',
    success: function (currentUser) {
      dispatch({ type: 'FETCH_CURRENT_USER_SUCCESS', payload: currentUser });
      callback && callback();
    }
  });
}

export const signupRequest = (credentials, callbacks) => {
  return (dispatch) => {
    dispatch({ type: 'SIGNUP_REQUEST_PENDING' });
    return signup(credentials, dispatch, callbacks);
  }
}

const signup = (credentials, dispatch, callbacks) => {
  $.ajax({
    url: '/users',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: 'POST',
    dataType: 'json',
    data: credentials,
    success: function (currentUser) {
      dispatch({ type: 'SIGNUP_SUCCESS', payload: currentUser });
      callbacks && callbacks.success();
    },
    error: function (msg) {
      dispatch({ type: 'SIGNUP_ERROR', payload: msg });
      callbacks && callbacks.error();
    }
  });
}
