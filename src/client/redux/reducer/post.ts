import { PostState } from "../../typedefine/type_props_state"
import { Action } from "redux"

const initialState: {[key: string]: Array<PostState | null>} = {
    post: [],
}

const postReducer = (state = initialState,action:Action) => {
    switch(action.type){
        default : 
        return state;
    }    
}


export default postReducer;