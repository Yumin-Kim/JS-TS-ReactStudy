import { ICommentsData, PostToComments, IComments } from "../IStore";
import { IActionTypeName, add_comment, ADD_COMMENT } from '../action/action_comment';
//타입 잡을때는 최대한 정확히 null undefined mapping은 최대한 안하는 쪽으로!!
type NullTypeMapped<T> = {
    [P in keyof T]: T[P][] | null;
}

const initialState: ICommentsData = {
    comments: [],
    timeStamp: null,
}

interface IAction_Comment {
    type: string; //이렇게 action.type 타이핑이 안된다!! reduce로 만들면서 이부분이 많이 부족함!!
    data: ICommentsData | IComments; // 타입도 하나도 안잡힘 넘 크게 잡아서
}

const commentsReducer = (state = initialState, action: IAction_Comment) => {
    switch (action.type) {
        case ADD_COMMENT.REQEUST: {
            return {
                ...state,
            }
        }
        case ADD_COMMENT.REQEUST: {
            return {
                ...state,
                comments:[...state.comments,{id:"qwe"}]
            }
        }
        default:
            return state;
    }
}

export default commentsReducer;