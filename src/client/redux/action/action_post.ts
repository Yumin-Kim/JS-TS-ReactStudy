import { PostState, InitialState } from "../IStore";
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



function action<T>(type: T, data?: PostState) {
    return { type, data }
}

interface I_Post_action {
    request: (data?: PostState) => Action;
    success: (data?: PostState) => Action;
    failure: (data?: PostState) => Action;
}

export const post_add : I_Post_action = {
    request: (data) => action(POST_ADD[REQEUST],data),
    success: data => action(POST_ADD[SUCCESS], data),
    failure: data => action(POST_ADD[FAILURE], data),
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


