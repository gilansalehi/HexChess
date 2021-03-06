import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute, History, Location, browserHistory } from 'react-router';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';
import allReducers from './reducers/index';
import App from './containers/App';

// Create an enhanced history that syncs navigation events with the store

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

window.init = function () {
  document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
  });
};
