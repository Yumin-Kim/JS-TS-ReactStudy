import * as React from "react";
import * as ReactDOM from 'react-dom';
import App from './page/App';
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store} >
            <App />
        </Provider>
    </BrowserRouter>
    , document.querySelector("#root"));
