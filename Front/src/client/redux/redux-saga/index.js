import { call , all } from 'redux-saga/effects'; 
import user from './user';
import posts from './posts';
export default function* rootSaga(){

    if(__isServer__) console.log("rootSaga");
    yield all([
        call(user),
        call(posts),
    ])
}