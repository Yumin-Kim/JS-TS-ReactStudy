//call 함수 동기적으로 호출 fork 함수 비동기적으로 호출 put 액션 dispatch take 해당 액션이 dispatch 되면 제너레이터 next를 실행 하게함
//all 여러 이펙트를 동시에 실항 할 수 있게 함
//사가 자체 적으로 next() 호출을 자동으로 해주는 제너레이터임
//제너레이터는 한번 사용하면 다시 사용 할 수 없기 때문에 무한 루프를 사용하여 반복 실행이 될 수 있도록 한다
// function* watchLogin(){
    //     // while(true){
    //     //     console.log("대기");
    //     //     yield take(LOG_IN)
    //     //     yield delay(4000);
    //     //     yield put({
    //     //         type:LOG_IN_SUCCESS
    //     //     })
    //     //     console.log("LOG_IN_SUCCESS");
    //     // }while saga에서 문법으로 지원 takeEvery
    //     //사용자의 시도가 유효할때 takeEvery
    //     //유효 하지 않고 한번만 발생 하길 원할때 takeLatest
    //     // yield takeEvery(LOG_IN,function* (){
    //     //     yield put({
    //     //         type:LOG_IN_SUCCESS
    //     //     })
    //     //     console.log(1);
    //     //     console.log(12);
    //     //     console.log(13);
    //     //     console.log(14);
    //     // })
    
    // }
import { all ,call,put,takeLatest,takeEvery, fork,take,delay} from 'redux-saga/effects';
import { LOG_IN_REQUEST, SIGN_UP_REQUEST, LOG_IN_FAILURE, SIGN_UP_SUCCESS ,SIGN_UP_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST } from '../Reducer/user';
import { LOG_IN_SUCCESS } from '../Reducer/user';
import axios from 'axios';

function loginAPI(loginData){
    return axios.post('http://localhost:3065/api/user/login',loginData,{
        withCredentials:true //서로 쿠키 교환 axios에서 지원
    });
}

function* login(action){
    try{
        const result = yield call(loginAPI,action.data);
        yield put({
            type:LOG_IN_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.log(e)
        yield put({
            type:LOG_IN_FAILURE
        })
    }
}

function* watchLogin (){
    yield takeEvery(LOG_IN_REQUEST,login);
}

function signUpAPI(signUpData){
    return axios.post('http://localhost:3065/api/user',signUpData);
}

function* signUp(action) {
    try {
      yield call(signUpAPI,action.data);
      yield put({ // put은 dispatch 동일
        type: SIGN_UP_SUCCESS,
      });
    } catch (e) { // loginAPI 실패
      console.log(action);
      yield put({
        type: SIGN_UP_FAILURE,
        error: e,
      });
    }
  }


function* watchSignUp(){
    yield takeEvery(SIGN_UP_REQUEST,signUp)
}
function logoutAPI(){
    return axios.post('http://localhost:3065/api/user/logout',{},{
        withCredentials:true
    });
}

function* logout(action) {
    try {
      yield call(logoutAPI);
      yield put({ // put은 dispatch 동일
        type: LOG_OUT_SUCCESS,
      });
    } catch (e) { // loginAPI 실패
      console.log(action);
      yield put({
        type: LOG_OUT_FAILURE,
        error: e,
      });
    }
  }


function* watchLogout(){
    yield takeEvery(LOG_OUT_REQUEST,logout)
}
function loadUserAPI(userId){
    return axios.get(userId ?`http://localhost:3065/api/user/${userId}` : 'http://localhost:3065/api/user',{
        withCredentials:true,
    });
}

function* loadUser(action) {
    try {
      const result = yield call(loadUserAPI,action.data);
      yield put({ // put은 dispatch 동일
        type: LOAD_USER_SUCCESS,
        data : result.data,
        me:!action.data
      });
    } catch (e) { // loginAPI 실패
      console.log(e);
      yield put({
        type: LOAD_USER_FAILURE,
        error: e,
      });
    }
  }

function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST,loadUser)
}


export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUser),
        fork(watchSignUp)
    ]);
}