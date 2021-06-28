import "@babel/polyfill";
//react , redux default module
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
//Component
import reducer from './redux/reducer/reducers'
import sagaMonitor from '@clarketm/saga-monitor';

import rootSaga from './redux/saga/sagas';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

const config = {
  level: "log",
  effectTrigger: true,
  effectResolve: true,
  actionDispatch: true
};

const init = window.__INITIAL_STATE__;
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: sagaMonitor(config)
});
//Redux / Redux-Saga configure store
const composeEnhancerDevtool = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, init, composeEnhancerDevtool(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);




//HotModuleReplacement 자체적으로 module.hot을 넣어 주게 된디
if (module.hot) { // 제대로 분석 하기 

  console.log("module.hot")
  // module.hot.accept(
  //   dependencies, // Either a string or an array of strings
  //   callback // Function to fire when the dependencies are updated
  // );
  module.hot.accept("./pages/Home", () => {
    //import 한것이 있는데 이렇게 따로 변수를 지정하는 이유는 
    //import 한것은 절대적으로 변경 되지 않는 상수 참조를 하기때문에 따라 변수에 저장하여 변할 수 있게 변수에 저장

    //현재 './container/Counter'파일은 export default 내보내기가 되어있어 객체로 표현하면 { default : "Counter" } 있고 
    // 가져 오기 위해서는 require('./container/Counter').default 하는 것이 올바름
    const NewApp = require('./pages/Home').default; // export default >>가져오기 위한 방법

    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <NewApp value={store.getState()} />
        </BrowserRouter>
      </Provider>
      ,
      document.getElementById('root')
    )
  }); //
} else {
  console.log("Not found WebpackHotModule")
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
  )
}

