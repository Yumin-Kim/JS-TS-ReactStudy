import { LogFailureAction, LogSuccessAction, LogRequestAction, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT, LogOutAction } from "../actions/user";
import produce from 'immer';
export interface UserState {
    isLoggingIn: boolean,
    data: {
        nickname: string,
    } | null
}

const initalState: UserState = {
    isLoggingIn: false,
    data: null,
}

type UserReducerAction = LogFailureAction | LogSuccessAction | LogRequestAction | LogOutAction

const userReducer = (prevState = initalState, action: UserReducerAction) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.isLoggingIn = true;
                draft.data = null;
                break;
            case LOG_IN_SUCCESS:
                draft.data = action.data;
                draft.isLoggingIn = false;
                break;
            case LOG_IN_FAILURE:
                draft.data = null;
                draft.isLoggingIn = false;
                break;
            case LOG_OUT: {
                draft.data = null;
                break;
            }
            default:
                break;
        }
    })
}

export default userReducer;