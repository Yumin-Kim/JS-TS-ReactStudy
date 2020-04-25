import { UserState } from '../IStore';

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export interface ThunkDispatch {
    (thunkAction: ThunkAction): void;
    <A>(action: A): A;
}

export type ThunkAction = (dispatch: ThunkDispatch) => void;

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
export interface LogoutRequest {
    type: typeof LOG_OUT_REQUEST,
    data: UserState,
}
export interface LogoutSuccess {
    type: typeof LOG_OUT_SUCCESS,
    data: UserState,
}
export interface LogoutFailure {
    type: typeof LOG_OUT_FAILURE,
    data: UserState,
}

export const loginRequest = (data: { name: string, text: string }): LoginRequest => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}
export const loginSueccss = (data: { name: string, text: string }): LoginSuccess => {
    return {
        type: LOG_IN_SUCCESS,
        data
    }
}
export const loginFailure = (error: Error): LoginFailure => {
    return {
        type: LOG_IN_FAILURE,
        error,
    }
}
export const logoutRequest = (data?: UserState) => {
    return {
        type: LOG_OUT_REQUEST,
        data
    }
}
export const logoutSucess = (data?: UserState) => {
    return {
        type: LOG_OUT_SUCCESS,
        data
    }
}
export const logoutFailure = (error : Error) => {
    return {
        type: LOG_OUT_SUCCESS,
        error
    }
}

export const logoutAction = (data?: UserState): ThunkAction => {
    return (dispatch) => {
        dispatch(logoutRequest());
        try{
            setTimeout(()=>{
                dispatch(logoutSucess());
            },1000);
        }catch(error){
            loginFailure(error);
        }
    }
}

export const loginAction = (data: { name: string, text: string }): ThunkAction => {
    console.log("loginAction");
    return (dispatch) => {
        dispatch(loginRequest(data));
        try {
            setTimeout(() => {
                dispatch(loginSueccss(data));
            }, 1000);
        } catch (e) {
            dispatch(loginFailure(e));
        }
    }
}












