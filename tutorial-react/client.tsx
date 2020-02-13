// import React from 'react';
import * as React from 'react';
import ReactDOM = require('react-dom');
import {hot} from 'react-hot-loader/root';
// import ClientDOM from './ClientDOM';

// import ClientDOM from './ClientDOM';
import ClientDom from './ClientDOM_Class';

const Hot = hot(ClientDom);

ReactDOM.render(<Hot/>,document.querySelector('#root'));