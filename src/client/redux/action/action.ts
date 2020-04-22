import { UserState } from '../../typedefine/type_props_state';

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export interface ThunkDispatch {
    (thunkAction : ThunkAction) : void;
    <A> (action : A) : A;
}

type ThunkAction = (dispatch: ThunkDispatch) => void;

export interface LoginRequest {
    type: typeof LOG_IN_REQUEST;
    data: { name: string, text: string };
}

export interface LoginSuccess {
    type: typeof LOG_IN_SUCCESS;
    data: { name: string, text: string };
}

export interface LoginFailure {
    type: typeof LOG_IN_FAILURE;
    error: Error;
}

export const loginRequest = (data: { name: string, text: string } ): LoginRequest => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}


export const loginSueccss = (data:  { name: string, text: string }) : LoginSuccess => {
    return {
        type:LOG_IN_SUCCESS,
        data
    }
}
export const loginFailure = (error : Error) : LoginFailure => {
    return{
        type:"LOG_IN_FAILURE",
        error,
    }
}


export const loginAction = (data : { name: string, text: string }) : ThunkAction =>{
    console.log("loginAction");
    return(dispatch)=>{
        dispatch(loginRequest(data));
        try{
            setTimeout(()=>{
                dispatch(loginSueccss(data));
            },1000);
        }catch(e){
            dispatch(loginFailure(e));
        }
    }
}












