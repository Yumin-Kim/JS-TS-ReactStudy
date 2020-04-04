//express and node.js module
import express from 'express';
const port = process.env.PORT || 3050;
// import webpackDevMiddleware from require('webpack-dev-middleware');
// import webpackHotMiddleware from require('webpack-hot-middleware');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const { headersReferer } = require('./middeware');


//React
import React from 'react';
import reactDOMServer from 'react-dom/server';
//React Component
import App from '../client/pages/app';
//Redux
import { Provider } from 'react-redux';
// import store, { sagaMiddleware } from '../client/redux/store';
//React-router
import { StaticRouter } from 'react-router';
import rootSaga from '../client/redux/redux-saga';
import { sagaMiddleware } from '../client/redux/store';
import configure from '../client/redux/store';

const app = express();
const isDevelopment = process.env.NODE_ENV !== "production";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //쿠키모듈 사용할수있게함 쿠키 분석 할수 있음

// if (isDevelopment) {
//   console.log("웹팩 실행");
//   const webpack = require('webpack');
//   const webpackConfig = require("../../webpack.config");
//   const compiler = webpack(webpackConfig[1]);
//   app.use(require("webpack-dev-middleware")(compiler, {
//     hot: true,
//     stats: {
//       colors: true
//     }
//   }));
//   app.use(require("webpack-hot-middleware")(compiler));
// }
app.use(express.static('build'));
app.get('*', headersReferer, (req, res, next) => {
  //saga SSR
  const store = configure();
  store.runSaga(rootSaga).toPromise().then(() => {
    console.log("saga complete");
    const dispatchData = store.getState();
    const ReactApp = reactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} conntext={{}} >
          <App />
        </StaticRouter>
      </Provider>
    );
    console.log("dispatchData",dispatchData)
    res.send(`<!DOCTYPE html>
    <html>
      <head>
        <title>You me Blog </title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" rel="stylesheet">
        <script>
          window.__REDUX_INITIALSTATE__ = ${JSON.stringify(dispatchData)};
        </script>
      </head>
      <body>
        <div id="root">${ReactApp}</div>
        <script src="/index.js"></script>
      </body>
    </html>`);
  }).catch((e)=>{
    console.log(e)
  })
  console.log("store.close()");
  store.close();
  //비동기 요청을보내는 비동기요청을 기다리지 않고 바로 실행됨
  // store.dispatch(END);
  // await task.done;
  // const ReactApp = reactDOMServer.renderToString(
  //   <Provider store={store}>
  //     <StaticRouter location={req.url} conntext={{}} >
  //       <App />
  //     </StaticRouter>
  //   </Provider>
  // );
  // req.url 에 따라 분리하여 작성해야함  미들웨어로 분리하자니 밑에 코드 중복이 심할거 같고
  //만약 * 


})


app.listen(port, () => {
  console.log(`Server start on Port ${port}`);
})
