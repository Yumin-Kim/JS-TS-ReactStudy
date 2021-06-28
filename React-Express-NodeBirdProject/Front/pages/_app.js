import React from "react";
import Helmet from "react-helmet";
import{ Container } from 'next/app';
import AppLayout from "../components/AppLayout";
import withRedux from "next-redux-wrapper";
import withReduxsaga from "next-redux-saga";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../Reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import { LOAD_USER_POSTS_REQUEST } from "../Reducer/post";
import { LOAD_USER_REQUEST } from "../Reducer/user";
import Axios from "axios";

//모든 페이지에 공통적으로 들어가는것들을 여기다모음

const Nodebird = ({ Component, store, pageProps }) => {
  //Component는 Next.js에서 넣어 주는 멤버 >> 말그대로 컴포넌트 전체를 넣어 주며 isServer router Component 등을 넗어준다
  return (
    <Container>
    <Provider store={store}>
    <Helmet
          title="NodeBird"
          htmlAttributes={{ lang: 'ko' }}
          meta={[{
            charset: 'UTF-8',
          }, {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          }, {
            'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
          }, {
            name: 'description', content: '제로초의 NodeBird SNS',
          }, {
            name: 'og:title', content: 'NodeBird',
          }, {
            name: 'og:description', content: '제로초의 NodeBird SNS',
          }, {
            property: 'og:type', content: 'website',
          }, {
            property: 'og:image', content: 'https://nodebird.com/favicon.ico',
          }]}
          link={[{
            rel: 'shortcut icon', href: '/favicon.ico',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
          }]}
        />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
    </Container>
  );
};
//store 만드는 과정 withRedux라는 고위함수를 만들어 주는데 확장자 처럼 사용되며
//state+reducer가 합쳐진 것을 모으는 곳이 store라고함
// export default withRedux((initialState,options)=>{
//     const middlewares = [];
//     const enhancer =  compose(
//         applyMiddleware(...middlewares)
//         ,!options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
//         window.__REDUX_DEVTOOLS_EXTENSION__():(f)=>f);
//     const store=createStore(reducer,initialState,enhancer);
// //middlewares는 state,action,reducer와 store사이 기능을 추가 변조 할수있는 역할을 가짐
//     return store;
// })(Nodebird);

Nodebird.getInitialProps = async context => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  if (ctx.isServer && cookie) {
    Axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxsaga(Nodebird));
