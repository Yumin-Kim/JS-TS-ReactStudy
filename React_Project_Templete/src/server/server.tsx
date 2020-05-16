import * as path from 'path';

import * as express from 'express';

import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import App from '../client/App';

const app = express();

if (process.env.NODE_ENV !== "production") {
    const webpack = require("webpack");
    const webpackconfig = require("../../../config/webpack.client.js");

    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require("webpack-hot-middleware");

    const compiler = webpack(webpackconfig);

    app.use(
        webpackDevMiddleware(compiler)
    );

    app.use(webpackHotMiddleware(compiler));

}

app.use(express.static(path.resolve(__dirname)));

app.get('*', (req, res, next) => {

    const context = {};
    const helmet = Helmet.renderStatic();
    const html = renderToString(
        <StaticRouter location={req.url} context={context} >
            <App />
        </StaticRouter>
    )

    res.set('content-type', 'text/html');
    res.send(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          ${helmet.title.toString()}
        </head>
        <body>
          <div id="root">${html}</div>
          <script type="text/javascript" src="main.js"></script>
        </body>
      </html>
  `);
})

app.listen(3003,()=>{
    console.log("Server started http://localhost:3003");
})

