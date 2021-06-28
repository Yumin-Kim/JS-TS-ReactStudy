//Node Module
import * as path from 'path';
//Server Config Module
import * as express from 'express';
//Front Config Module
import * as React from 'react';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet';
import { ChunkExtractor } from '@loadable/server';


const app = express();
const publicPath = path.resolve(__dirname);

if (process.env.NODE_ENV !== "production") {
    const webpack = require("webpack");
    const webpackConfig = require("../../webpack/dev/webpack.client.js")[0];
    const compiler = webpack(webpackConfig);

    const WDM = require("webpack-dev-middleware");
    const WHM = require("webpack-hot-middleware");

    app.use(WDM(compiler,{
      publicPath:webpackConfig.output.publicPath
    }));
    app.use(WHM(compiler));

}

app.use(express.static(publicPath));

app.get("*", (req, res, next) => {
    const nodeStatusFile = path.resolve(__dirname, './node/loadable-stats.json');
    const webStatusFile = path.resolve(__dirname, "./web/loadable-stats.json");

    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStatusFile });
    const {default:App} = nodeExtractor.requireEntrypoint();
    const webExtractor = new ChunkExtractor({ statsFile: webStatusFile });

    const jsx = webExtractor.collectChunks(
        <StaticRouter location={req.url} context={{}} >
            <App />
        </StaticRouter>
    );
    const html = renderToString(jsx);
    const helmet = Helmet.renderStatic();

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
    console.log("Express Server Port is 3000");
})

