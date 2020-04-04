import React from 'react';
import ReactDom from 'react-dom';
import App from './pages/app';
// import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import configure from './redux/store';

const store = configure();

ReactDom.hydrate(
    <Provider store={store} >
        <CookiesProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CookiesProvider>
    </Provider>
    , document.querySelector("#root"));