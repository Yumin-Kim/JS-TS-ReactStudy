import { AddPostAction, ADD_POST } from "../actions/posts";
import produce from "immer";

const initalState : string[] = [];

const postsReducer = (prevState = initalState,action : AddPostAction) : string[] => {
    return produce(prevState,(draft)=>{
        switch(action.type){
            case ADD_POST:
                draft.push(action.data);
                break;
            default :
                return prevState;
        }
    })
}


export default postsReducer; 