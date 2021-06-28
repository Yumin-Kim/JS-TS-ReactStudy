import { fork,all,takeEvery,put,call } from 'redux-saga/effects';
import axios from 'axios';
import { WRITE_POSTING_REQUEST, WRITE_POSTING_FAILURE, WRITE_POSTING_SUCCESS, LOAD_POSTING_REQUEST, LOAD_POSTING_FAILURE, LOAD_POSTING_SUCCESS, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, LOAD_CATEGORY_REQUEST, LOAD_CATEGORY_SUCCESS, LOAD_CATEGORY_FAILURE, LOAD_DETAILCATEGORY_REQUEST, LOAD_DETAILCATEGORY_FAILURE, LOAD_DETAILCATEGORY_SUCCESS } from '../reducer/post';

function writePostingAPI (writeData) {
    return axios.post('http://localhost:3000/api/post/write',{writeData},{
        withCredentials:true,
    })
}

function* writePosting(action){
    try{
        yield call(writePostingAPI,action.data);
        yield put({
            type:WRITE_POSTING_SUCCESS,
        })
        console.log("writePosting action");
    }catch(e){
        console.error(e);
        yield put({
            type:WRITE_POSTING_FAILURE,
        })
    }
}

function* watchWritePosting () {
    console.log("watchWritePosting");
    yield takeEvery(WRITE_POSTING_REQUEST,writePosting);
}

 function loadPostingAPI(){
    return  axios.get('http://localhost:3000/api/post/');
}

function* LoadPosting(){
    try{
        console.log("LoadPosting action");
        console.log("LoadPosting result",);
        const result = yield call(loadPostingAPI);
        if(__isServer__) console.log("result",result);

        yield put({
            type:LOAD_POSTING_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LOAD_POSTING_FAILURE,
        })
    }
}

function* watchLoadPosting () {
    yield takeEvery(LOAD_POSTING_REQUEST,LoadPosting);
}

function uploadImagesAPI(formData){
    return axios.post('http://localhost:3000/api/post/image',formData,{
        withCredentials:true,
    })
}

function* uploadImage(action){
    try{
        const result = yield call(uploadImagesAPI,action.data);
        console.log(result)
        yield put({
            type:UPLOAD_IMAGES_SUCCESS,
            data:result.data
        })
    }
    catch(e){
        console.error(e);
    }
}

function* watchUploadImage(){
    yield takeEvery(UPLOAD_IMAGES_REQUEST,uploadImage);
}

function loadCategoryAPI(categoryId){
    return axios.get(`http://localhost:3000/api/post/category/${categoryId}`);
}

function* loadCategory(action){
    try{
        const result = yield call(loadCategoryAPI,action.data);
        yield put({
            type:LOAD_CATEGORY_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e)
        yield put({
            type:LOAD_CATEGORY_FAILURE,
            // data:result.data
        })

    }
}

function* watchLoadCategory(){
    yield takeEvery(LOAD_CATEGORY_REQUEST,loadCategory);
}

function loadDetailCategoryAPI (detailCategoryId) {
    return axios.get(`http://localhost:3000/api/post/detailcategory/${detailCategoryId}`);
}

function* loadDetailCagegory(action){
    try{
        const result = yield call(loadDetailCategoryAPI,action.data)
        yield put({
            type:LOAD_DETAILCATEGORY_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LOAD_DETAILCATEGORY_FAILURE,
        })
    }
}

function* watchLoadDetailCategory(){
    yield takeEvery(LOAD_DETAILCATEGORY_REQUEST,loadDetailCagegory);
}

export default function* postSaga(){
    if(__isServer__) console.log("rootSaga >> postSaga");
    yield all([
        fork(watchWritePosting),
        fork(watchLoadPosting),
        fork(watchUploadImage),
        fork(watchLoadCategory),
        fork(watchLoadDetailCategory),
    ])
} 