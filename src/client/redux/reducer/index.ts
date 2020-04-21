import { combineReducers } from "redux";
import userReducer from "./reducer";
import postReducer from "./post";

const reducer = combineReducers({
    user:userReducer,
    post:postReducer,
})


export default reducer;