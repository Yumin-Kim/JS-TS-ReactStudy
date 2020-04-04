import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import { 
    LOG_IN_REQUEST, 
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    LOG_IN_FAILURE, 
    LOG_IN_SUCCESS,
    LOAD_USER_INFO_REQUEST,
    LOAD_USER_INFO_FAILURE,
    LOAD_USER_INFO_SUCCESS,
    LOG_OUT_REQUEST,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    LICKNAME_PATCH_REQUEST,
    LICKNAME_PATCH_SUCCESS,
    LICKNAME_PATCH_FAILURE} from '../reducer/user';
import axios from 'axios';

function loginAPI(loginData) {
    return axios.post('http://localhost:3000/api/user/login', loginData,{
        withCredentials:true,
    });
}

function* login(action) {
    try {
        const result = yield call(loginAPI, action.data);
        console.log('Login result',result);
        yield put({
            type:LOG_IN_SUCCESS,
            data:{
                userInfo:result.data,
                postLength:result.data.postlength.length
            }
        })
    } catch (error) {
        yield put({
            type:LOG_IN_FAILURE
        })
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login)
}

function logoutAPI() {
    return axios.post('http://localhost:3000/api/user/logout',{},{
        withCredentials:true,
    } );
}

function* logout(){
    try{
        yield call(logoutAPI);
        yield put({
            type:LOG_OUT_SUCCESS,
        })
    }catch(e){
        console.log(e)
        yield put({
            type:LOG_OUT_FAILURE
        })
    }
    
}

function* watchLogout(){
    yield takeEvery(LOG_OUT_REQUEST,logout);
}

function signupAPI(userData) {
    return axios.post('http://localhost:3000/api/user/signup', userData);
}

function* signUp(action) {
    try {
        yield call(signupAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (e) {
        console.log(e.response);
        yield put({
            type: SIGN_UP_FAILURE,
            data:e.response.data
        })
    }
}


function* watchSignup() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}
function loaduserAPI(){
    return axios.get('http://localhost:3000/api/user/load',{
        withCredentials:true,
    })
}

function* loadUser(){
    try{
        const result  = yield call(loaduserAPI)
        console.log('loadUser',result);
        yield put({
            type:LOAD_USER_INFO_SUCCESS,
            data:{
                userInfo:result.data,
                postLength:result.data.Posts.length
            },
        })
    }catch(e){
        console.log(e);
        yield put({
            type:LOAD_USER_INFO_FAILURE,
        })
    }

}

function* watchLoadUser(){
    yield takeEvery(LOAD_USER_INFO_REQUEST,loadUser);
}

function nicknameDatchAPI(nickname){
    return axios.patch('http://localhost:3000/api/user/nickname',{nickname},{
        withCredentials:true
    })
}

function* nicknameDatch(action){
    try{
        const result = yield call(nicknameDatchAPI,action.data)
        console.log(result)
        yield put({
            type:LICKNAME_PATCH_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LICKNAME_PATCH_FAILURE
        })
    }
}

function* watchNicknameDatch(){
    yield takeEvery(LICKNAME_PATCH_REQUEST,nicknameDatch)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchLoadUser),
        fork(watchNicknameDatch),
    ])
}