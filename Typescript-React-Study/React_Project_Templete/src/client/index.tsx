import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';

import GlobalStyle from './style/GlobalStyle';
import App from './App';

loadableReady(()=>{
    const rootElement = document.querySelector("#root");
    hydrate(
        <BrowserRouter>
        <>
            <GlobalStyle/>
            <App />
        </>
        </BrowserRouter>
        , rootElement);    
});

if (module.hot) {
    module.hot.accept();
  }