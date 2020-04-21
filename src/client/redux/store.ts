import { createStore, compose, applyMiddleware, AnyAction, Store, Dispatch, Action, MiddlewareAPI } from 'redux';
import  reducer  from './reducer/index';
import createSagaMiddleware from 'redux-saga';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const firstMiddleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
    console.log("로깅", action);
    next(action);
}
const thunkMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (typeof action === 'function') { // 비동기
        return action(store.dispatch, store.getState);
      }
    return next(action);
}
const sagaMiddelware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [firstMiddleware,thunkMiddleware];
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware,sagaMiddelware)));
// sagaMiddelware.run(rootSaga)


export default store;