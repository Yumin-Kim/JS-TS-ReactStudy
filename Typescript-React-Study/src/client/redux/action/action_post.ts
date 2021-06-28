import { PostState, InitialState, CollectPost } from "../IStore";
import { Action } from "redux";
import {ThunkAction} from './action';

export const REQEUST = "REQEUST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

function createRequestTypes<T>(base: T){
    return [REQEUST, SUCCESS, FAILURE].reduce((actionType: { [key: string]: string }, type) => {
        actionType[type] = `${base}_${type}`;
        return actionType;
    }, {});
};

export const POST_ADD = createRequestTypes("POST_ADD");
export const POST_DELETE = createRequestTypes("POST_DELETE");
export const POST_UPDATE = createRequestTypes("POST_UPDATE");
export const POST_PATCH = createRequestTypes("POST_PATCH");

export const ADD_POST_ID = "ADD_POST_ID"; 

export function action<T>(type: T, data?: PostState | string | number| CollectPost) {
    return { type, data }
}

export interface I_Post_action {
    request: (data?: PostState) => Action;
    success: (data?: PostState) => Action;
    failure: (data?: PostState) => Action;
}
export interface I_Post_action_Update {
    request: (data?: string |PostState) => Action;
    success: (data?: string |PostState) => Action;
    failure: (data?: string |PostState) => Action;
}
export interface I_Post_action_Delete {
    request: (data?: number |PostState) => Action;
    success: (data?: number |PostState) => Action;
    failure: (data?: number |PostState) => Action;
}

export const post_add : I_Post_action = {
    request: (data) => action(POST_ADD[REQEUST],data),
    success: data => action(POST_ADD[SUCCESS], data),
    failure: data => action(POST_ADD[FAILURE], data),
}

export const post_update : I_Post_action_Update = {
    request : data => action(POST_UPDATE[REQEUST],data),
    success : data => action(POST_UPDATE[SUCCESS],data),
    failure : data => action(POST_UPDATE[FAILURE],data),
}
export const post_delete : I_Post_action_Delete = {
    request : data => action(POST_DELETE[REQEUST],data),
    success : data => action(POST_DELETE[SUCCESS],data),
    failure : data => action(POST_DELETE[FAILURE],data),
}

export const  addPostAction = (data : PostState):ThunkAction =>{
    return(dispatch)=>{
        dispatch(post_add.request(data));
        try{
            setTimeout(()=>{
                dispatch(post_add.success(data))
            },1000);
        }catch(error){

        }
    }
}

export const deletePostAction = (data : PostState | number) : ThunkAction => {
    console.log("deletePostAction")
    return(dispatch)=>{
        dispatch(post_delete.request(data));
        try{
            setTimeout(()=>{
                dispatch(post_delete.success(data));
            },200)
        }catch(error){

        }
    }
}

export const updateAction = (data : PostState | string) : ThunkAction =>{
    return(dispatch) =>{
        dispatch(post_update.request(data));
        try{
            setTimeout(()=>{
                dispatch(post_update.success(data));
            },500)
        }catch(errpr){
            
        }
    }
}
