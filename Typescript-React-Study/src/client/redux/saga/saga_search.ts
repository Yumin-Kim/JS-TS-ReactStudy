import { all,call , put , fork , takeEvery ,take } from 'redux-saga/effects';
import { fetchEntity ,searchEntity, SEARCH_DATA , Search_data} from '../action/action_search';
const searchSaga_searh = fetchEntity(searchEntity);  

function* watchHelloSaga(){
    console.log("starting Saga Middleware");
} 

function* watchSearch(){
    while(true){
        console.log("watchSearch Start")
        const {data:{query}} : Search_data = yield take(SEARCH_DATA);
        yield call(searchSaga_searh,query);
        console.log("watchSearch End")
    }
}

export default function* searchSaga(){
    yield all([
        yield fork(watchHelloSaga),
        yield fork(watchSearch)
    ])
}