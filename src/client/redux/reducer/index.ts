import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";
// import counterReducer from './counter';

//각기 다른 다른 사람의 코드 보고 따로 짜보기!!
//1.redux에서 추천하는거 연습


const reducer = combineReducers({
    user:userReducer,//제로초
    post:postReducer,//real-world >> reduce를 이용하여 action 생성후 타입 지정
})


export default reducer;