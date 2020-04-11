import { createStore, MiddlewareAPI, Dispatch, AnyAction, compose, applyMiddleware  } from "redux"
import reducer from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const initalState = {
    user:{
        isLoggingIn:false,
        data:null
    },
    posts:[],
}

const firstMiddleware = (store : MiddlewareAPI) => (next :Dispatch<AnyAction> ) => (action:AnyAction) =>{
    console.log('로깅',action);
    console.log('store',store);
    next(action);
}

const thunkMiddleware = (store : MiddlewareAPI) => (next :Dispatch<AnyAction> ) => (action:any) =>{
    if(typeof action === 'function'){
        return action(store.dispatch,store.getState);
    }
    return next(action);
}


const enhancer = process.env.NODE_ENV === 'production'?
                compose(applyMiddleware(firstMiddleware))
                :composeWithDevTools(applyMiddleware(firstMiddleware,thunkMiddleware)); //middleware redux랑 연결

const store = createStore(reducer,initalState,enhancer);

export default store;
