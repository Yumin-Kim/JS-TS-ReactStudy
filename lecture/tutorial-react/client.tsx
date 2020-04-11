// import React from 'react';
import * as React from 'react';
import ReactDOM = require('react-dom');
import { hot } from 'react-hot-loader/root';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
const Hot = hot(App);

ReactDOM.render(
    <Provider store={store}>
        <Hot />
    </Provider>
    , document.querySelector('#root'));