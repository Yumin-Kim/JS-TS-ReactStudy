import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.querySelector("#root");

hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , rootElement);