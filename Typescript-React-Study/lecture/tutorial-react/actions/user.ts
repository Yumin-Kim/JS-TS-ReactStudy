import { addPost } from "./posts";

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const; 
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' as const; 
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' as const;
export const LOG_OUT = 'LOG_OUT';

export interface UserData {
    id: string;
    [key :string]:string;
} 

export interface LogRequestAction{
    type:typeof LOG_IN_REQUEST,
    data:UserData;
}

export interface LogSuccessAction{
    type:typeof LOG_IN_SUCCESS,
    data:{userId:string,nickname:string},
}

export interface LogFailureAction{
    type:typeof LOG_IN_FAILURE,
    error:Error,
}

export interface LogOutAction{
    type:typeof LOG_OUT
}

export interface ThunkDispatch {
    (thunkAction : ThunkAction) : void;
    <A> (action : A) : A;
    <TAction>(action : TAction | ThunkAction) : TAction;
}

export type ThunkAction = (dispatch : ThunkDispatch) => void;

export const logInRequest = (data : UserData) : LogRequestAction => {
    return{
        type:LOG_IN_REQUEST,
        data,
    }
} 
export const logInSuccess = (data : { userId: string; nickname: string; }) : LogSuccessAction => {
    return{
        type:LOG_IN_SUCCESS,
        data,
    }
} 
export const logInFailure = (error : Error) : LogFailureAction => {
    return{
        type:LOG_IN_FAILURE,
        error,
    }
} 

export const logIn = (data :UserData) : ThunkAction => {
    return (dispatch )=>{
        dispatch(logInRequest(data))
        try{
            setTimeout(()=>{
                dispatch(logInSuccess({
                    userId:'1',
                    nickname:'hello'
                }));
                dispatch(addPost('Hello Redux-thunk'));
            },1000)
        }
        catch(e){
            dispatch(logInFailure(e))
        }
    }
}

export const logout = () => {
    return{
        type:LOG_OUT,
    }
}