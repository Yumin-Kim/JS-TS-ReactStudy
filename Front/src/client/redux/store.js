import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import reducer from './reducer/index';
import rootSaga from './redux-saga/index';
export const initalState = {
    user:{
        userInfo:{},
        isLoggin:false,
        postLength:null,
        counter:{
            postLength:null,
            memoLength:null,
            commentLength:null,
        }
    },
    posts:{
        mainPostings:[],
        LatestPostings:[],
        categoryPostings:[],
        memoPosts:[],
        categoryPosts:[],
        imagesPath:[],
        detailContent:[],
        isDetailContent:false,
        clickCategory:true,
    }
};

export const sagaMiddleware = createSagaMiddleware();
const configure = () =>{
    let store;
    const middlewares = [sagaMiddleware];
    if(__isServer__){
        console.log("server")
        store = createStore(reducer,initalState,applyMiddleware(...middlewares));
    }else{
        console.log("Browser")
        const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        const composeEnhancers = devTools || compose;
        store = createStore(reducer,initalState,composeEnhancers(applyMiddleware(...middlewares)));
    }
    sagaMiddleware.run(rootSaga)
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END)
    return store;
}

export default configure;