
//dummtData
const initalState = {
    userInfo: {},
    isLoggin: false,
    postLength: null,
    counter: {
        postLength: null,
        memoLength: null,
        commentLength: null,
    }
}

//Action
//Main user function
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOAD_USER_INFO_REQUEST = "LOAD_USER_INFO_REQUEST";
export const LOAD_USER_INFO_SUCCESS = "LOAD_USER_INFO_SUCCESS";
export const LOAD_USER_INFO_FAILURE = "LOAD_USER_INFO_FAILURE";

export const LICKNAME_PATCH_REQUEST = "LICKNAME_PATCH_REQUEST"; 
export const LICKNAME_PATCH_SUCCESS = "LICKNAME_PATCH_SUCCESS"; 
export const LICKNAME_PATCH_FAILURE = "LICKNAME_PATCH_FAILURE"; 

//Memo associated user function
export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';


//Reducer
const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return state;
        case LOG_IN_SUCCESS:
            console.log(action.data)
            return {
                ...state,
                userInfo: action.data.userInfo,
                isLogging: true,
                counter: {
                    ...state.counter,
                    postLength: action.data.postLength,
                }
            }
        case LOG_IN_FAILURE:
            return {
                ...state,

            }
        case LOG_OUT_REQUEST:
            return state;
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                userInfo: {},
                isLogging: false,
            }
        case LOG_OUT_FAILURE:
            return {
                ...state,
            }
        case SIGN_UP_REQUEST:
            return {
                ...state,
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isSignUp: true,//다른 페이지나 회원가입 완료 표시
            }
        case SIGN_UP_FAILURE:
            return {
                ...state,
                isSignUp: false,
                data: action.data
            }
        case LOAD_USER_INFO_REQUEST:
            return {
                ...state,
            }
        case LOAD_USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: action.data.userInfo,
                isLogging: true,
                counter: {
                    ...state.counter,
                    postLength: action.data.postLength,
                }
            }
        case LOAD_USER_INFO_FAILURE:
            return {
                ...state,
            }
        case LICKNAME_PATCH_REQUEST :
            return {
                ...state
            }    
        case LICKNAME_PATCH_SUCCESS :
            return {
                ...state,
                userInfo:{...state.userInfo,nickname:action.data}
            }    
        case LICKNAME_PATCH_FAILURE :
            return {
                ...state
            }    
        default:
            return state
    }
}

export default userReducer;