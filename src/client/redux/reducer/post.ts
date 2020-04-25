import { PostState ,InitialState } from "../IStore"
import { Action } from "redux"
import { post_add, REQEUST, POST_ADD, SUCCESS } from "../action/action_post";


const initialState: {[key: string]: Array<PostState | null>} = {
    post: [],
    comment:[],
}

export type InitialPostState = PostState[keyof PostState];

interface AddPostAction {
    type: string;
    data:Array<PostState>;
}

const postReducer = (state = initialState,action:AddPostAction) => {
    console.log(">>>>>>>>>>>>>> postReducer",action,state.post)
    switch(action.type){
        case POST_ADD[REQEUST]:{
            return{
                ...state
            }
        }
        case POST_ADD[SUCCESS]:{
            return{
                ...state,
                post:[...state.post,action.data],
            }
        }
        default : 
        return state;
    }    
}


export default postReducer;