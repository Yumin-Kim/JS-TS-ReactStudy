import { createStore, compose, applyMiddleware, AnyAction, Store, Dispatch, Action, MiddlewareAPI } from 'redux';
import  reducer  from './reducer/index';
import createSagaMiddleware  from 'redux-saga';
import rootSaga from './saga/index';
//1. thnuk saga 충돌 없는지 확인!! 일단 아직까지는 실행 오류나 충돌 사항 없음!!
//2. saga 에서 할 dispatch는 search 인데 kakao에서 제공하는 다음 검색 엔진 이용하여 결과 출력 하기
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
sagaMiddelware.run(rootSaga)


export default store;