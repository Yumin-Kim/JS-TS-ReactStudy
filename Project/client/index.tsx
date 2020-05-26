import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';


const rootElements = document.querySelector("#root");
loadableReady(()=>{
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        , rootElements);
})