require("@loadable/babel-plugin")
import * as path from "path";
import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ChunkExtractor } from '@loadable/server';

import App from '../client/App';

const app = express();

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackConfig = require('../../../config/webpack.client.js')[0]

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require("webpack-hot-middleware");

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler)
  );

  app.use(webpackHotMiddleware(compiler));

}

app.use(express.static(path.resolve(__dirname)));
const pathR = path.resolve(__dirname);
const pathR1 = path.resolve(__dirname, "build");
const pathR2 = path.resolve(__dirname, "/build");
const path123 = path.resolve("config/build")

console.log(pathR);

app.get('*', (req, res, next) => {
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: App } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: webStats });

  // const store = createStore();
  console.log(webExtractor.getLinkTags());
  console.log(webExtractor.getStyleTags());
  console.log(webExtractor.getScriptTags());

  const context = {};
  const jsxTag = webExtractor.collectChunks(
    // <Provider>
    <StaticRouter location={req.url} context={context} >
      <App />
    </StaticRouter>
    // </Provider>
  )
  const html = renderToString(jsxTag);
  const helmet = Helmet.renderStatic();
  console.log(helmet.title.toString());


  res.set('content-type', 'text/html');
  res.send(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          ${helmet.title.toString()}
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
  `);
})

app.listen(3000, () => {
  console.log("Server started http://localhost:3003");
})

