import { put , takeEvery ,all,delay ,call,takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

export function* helloSaga (){
    console.log("Hello Saga");
}


export function* incrementAsync(){
    console.log("incrementAsync")
    yield delay(1000);
    yield put({type:"INCREMENT"})
}

export function* watchIncrementAsync (){
    yield takeLatest("INCREMENT_ASYNC",incrementAsync)
}

function axiosFetch(language){
    console.log("axiosFetch")
    return Axios.get(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
}

export function* AxiosData (action){
    try{
        console.log("AxiosData");
        console.log(action);
           const result =  yield call(axiosFetch,action.data);
              yield put({type:"AXIOS_FETCH_SUCCESS",data:result.data.items})
    }catch(e){
        console.error(e)
    }
}

export function* watchAxiosFetchData(){
    yield takeEvery("AXIOS_FETCH_REQUEST",AxiosData);
}

function auto(){
    console.log("autoaxiosFetch")
    return Axios.get(`https://api.github.com/search/repositories?q=stars:>1+language:java&sort=stars&order=desc&type=Repositories`)
}

function* autoFetch(){
    try{
        const result = yield call(auto);
        yield put({type:"AXIOS_FETCH_SUCCESS",data:result.data.items})
    }catch(e){
        console.log(e);
    }
}

function* watchAutoFetch (){
    yield takeEvery("AUTO_AXIOS_REQUEST",autoFetch);
}

export default function* rootSaga(){
    console.log("rootSaga")
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchAxiosFetchData(),
        watchAutoFetch(),
    ])
}