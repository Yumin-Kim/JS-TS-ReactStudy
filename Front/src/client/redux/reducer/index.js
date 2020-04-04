import { combineReducers } from "redux";
import userReducer from './user';
import postsReducer from './post';

const reducer = combineReducers({
    user:userReducer,
    posts:postsReducer,
});

export default reducer;