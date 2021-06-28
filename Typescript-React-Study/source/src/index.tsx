import * as React from 'react';
import {hydrate} from 'react-dom';

import App from './App';

const rootElement = document.querySelector("#root");

hydrate(<App/>,rootElement);