import { Action } from "redux";
import { InitialState, UserState } from "../../typedefine/type_props_state";
//state 절대성 라이브러리 없이 구성 >> lodash 사용해서!!
const initialState: UserState = {
    name: null,
    loginning: false,
    text: null,
}



const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default userReducer;