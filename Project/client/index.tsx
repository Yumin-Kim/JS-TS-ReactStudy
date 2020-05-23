import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElements = document.querySelector("#root");

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , rootElements);