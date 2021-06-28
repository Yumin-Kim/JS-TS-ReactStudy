import { call , all } from 'redux-saga/effects';
import searchSaga from './saga_search';
//saga 모음
export default function* rootwsaga(){
    console.log(" sagaMiddle Ware")
    yield all([
        call(searchSaga),
    ])
} 