import { Action } from "redux";
import { InitialState, UserState } from "../../typedefine/type_props_state";
import { LOG_IN_REQUEST, LoginSuccess, LoginFailure, LoginRequest, LOG_IN_SUCCESS, LOG_OUT_REQUEST, LogoutRequest, LogoutSuccess, LOG_OUT_SUCCESS } from "../action/action";
//state 절대성 라이브러리 없이 구성 >> lodash 사용해서!!
const initialState: UserState = {
    name: null,
    loginning: false,
    text: null,
    loggined:false,
}

type UserAction = LoginSuccess | LoginFailure | LoginRequest | LogoutRequest | LogoutSuccess;


const userReducer = (state = initialState, action: UserAction )  => {
    console.log("userReducer Dispatch",action);
    switch (action.type) {
        case LOG_IN_REQUEST :
            return {
                ...state,
                loginning : true,
            }
        case LOG_IN_SUCCESS :
            return {
                ...state,
                loginning : false,
                loggined : true,
                name:action.data.name,
                text:action.data.text,
            }    
        case LOG_OUT_REQUEST : 
            return{
               ...state,
               loginning : true,
            }    
        case LOG_OUT_SUCCESS :
            return{
                ...state,
                loginning : false,
                loggined : false,
            }    
        default:
            return state;
    }
}

export default userReducer;