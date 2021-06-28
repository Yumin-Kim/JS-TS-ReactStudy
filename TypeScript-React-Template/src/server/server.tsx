import '@babel/polyfill'
import * as express from 'express';

import MarkUpRouter from './routes/Markup';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import reducer from '../client/redux/reducer/reducers';
import rootSaga from '../client/redux/saga/sagas';
import {
  StaticRouter,
  StaticRouterProps,
  StaticRouterContext,
} from "react-router";
import Home from '../client/pages/Home';
import Html from './Html';

const app = express();
app.use(express.static("build"));
if (process.env.DEVELOP_COFIG === "hot") {
    console.log("Webpack Build")
    const webpack = require("webpack");
    const webpackConfig = require('../../webpack.config');
    const compiler = webpack(webpackConfig[0]);
    app.use(require("webpack-dev-middleware")(compiler, {
        publicPath: webpackConfig[0].output.publicPath,
        stats: { colors: true }
    }))
    app.use(require("webpack-hot-middleware")(compiler))
}

app.use('/api/Markup', MarkUpRouter);



// app.get("*", async (req, res, next) => {
app.get("*", (req, res, next) => {
    // const sagaMiddleware = createSagaMiddleware();
    // const store = createStore(reducer, applyMiddleware(sagaMiddleware));
    // const sagaPromise = sagaMiddleware.run(rootSaga).toPromise(); //promise로 변형

    //server에서 window의 데이터를 읽고 redux에 넣는 것은 못하는듯
    //서버에 staicRouter를 사용하고 context안에 데이터를 넣어서 
    //클라이언트에 보내는 방법은 this.props.staticContext를 사용하게끔
    //routes.js 파일 만들어서 동적인 라우팅 처리 
    //쿠기 사용하여 최근에 본 데이터도 추가하는 기능 구현
    //버튼 누르면 쿠키 삭제하여 최근에 본 리스트 삭제 기능

    //req.url에따라 각기 다른 dispatch 할 수 있게끔
    // store.dispatch({ type: "AXIOS_FETCH_REQUEST", data: "javascript" })
    // store.dispatch({ type: "INCREMENT_ASYNC" })
    // store.dispatch(END) //END로 dispatch 끊어버림

    //redux와 req.url에 따라 분기 처리 필요!!
    //v2 
    const data = { name: "ServerSide Rendering" as StaticRouterContext };

    // try {
    //     await sagaPromise; //promise resolve작업
    //     const initialState = store.getState();
    //     const renderProps = {
    //         preloadState: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`,
    //         preloadRedux: `window.__INITIAL_ROUTE__ = ${JSON.stringify(data)}`,
    //         script: "/build.js"
    //     }
type MY_STATIC_CONTEXT = {
  statusCode?: number; // THIS IS SO YOU EXTEND THE ORIGINAL TYPE,
  data: string; // THIS IS MY CUSTOM PROP
};
const context: MY_STATIC_CONTEXT = {
  data: "Hello",
};
        ReactDOMServer.renderToStaticNodeStream(
          <StaticRouter location={req.url} context={context}>
            {/* <Provider store={store}> */}
            {/* <Html {...renderProps} > */}
            <Html >
                <Home />
            </Html>
            {/* </Provider> */}
          </StaticRouter>
        ).pipe(res);
    // } catch (e) {
    //     console.log(e)
    //     res.status(500).send(e);
    // }
})

app.listen(3000, () => {
    console.log("3000port Start");
})














// import '@babel/polyfill'
// import express from 'express';

// import React from 'react';
// import ReactDOMServer from 'react-dom/server';

// import Counter from './Counter';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware, { END } from 'redux-saga';

// import reducer from './reducers';
// import rootSaga from './sagas';
// import PreloadContext from './PreloadContext';

// const app = express();
// app.use(express.static("build"));
// app.get("*", async (req, res, next) => {
//     const sagaMiddleware = createSagaMiddleware();
//     const store = createStore(reducer, applyMiddleware(sagaMiddleware));
//     const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();
//     console.log("sagaMiddleware.run(rootSaga) ",sagaMiddleware.run(rootSaga))
//     console.log("\n\n");
//     console.log("sagaPromise",sagaPromise);
//     console.log("\n\n");

//     const preloadContext = {
//         done: false, // 완료여부
//         promises: [] // 적재된 작업들
//     };

//     const ReactComponent = ReactDOMServer.renderToStaticMarkup(
//         <PreloadContext.Provider value={preloadContext} >
//             <Provider store={store}>
//                 <Counter />
//             </Provider>
//         </PreloadContext.Provider>
//     )
//     store.dispatch({type:"AXIOS_FETCH_REQUEST",data:"javascript"})
//     store.dispatch({type:"INCREMENT_ASYNC"})
//     try {
//     store.dispatch(END)
//         console.log("sagaPromise",sagaPromise)
//         await sagaPromise;
//         console.log("preloadContext.promises",preloadContext.promises)
//         await Promise.all(preloadContext.promises);
//         const initialState = store.getState()
//         res.send(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Redux-saga real-world universal example</title>
//       <script type="text/javascript" charset="utf-8">
//       window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
//       </script>
//     </head>
//     <body>
//       <div id="root">${ReactComponent}</div>
//       <script src="/index.js"></script>

//       </body>
//       </html>
//       `)
//     } catch (e) {
//         console.log(e)
//         res.status(500).send(e);
//     }
//     preloadContext.done = true;
// })

// // window.__INITIAL_STATE__ = ${initialState};
// app.listen(3000, () => {
//     console.log("3000port Start");
// })