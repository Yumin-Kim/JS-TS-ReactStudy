import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";

const reducer = combineReducers({
    user:userReducer,
    post:postReducer,
})


export default reducer;