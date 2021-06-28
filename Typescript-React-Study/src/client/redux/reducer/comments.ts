import { ICommentsData, PostToComments, IComments } from "../IStore";
import { IActionTypeName, add_comment, ADD_COMMENT } from '../action/action_comment';
//타입 잡을때는 최대한 정확히 null undefined mapping은 최대한 안하는 쪽으로!!
//redux나 데이터 관련되서 할때는 미리 어떤 데이터가 올지 구상후에 코딩 생각 미리 안하니 시간 소모 넘 심함
//api 딱 정하고 거기에 관련된 사이트 만들기!!

type NullTypeMapped<T> = {
    [P in keyof T]: T[P][] | null;
}

const init = {
    comments:[
        {id:1,text:"Hello",name:"name", comments:[{todoListId:10,}]},
        {},
        {}
    ]
} 

const initialState: ICommentsData = {
    comments: [],
    timeStamp: null,
}
//동적으로 type 지정 하니 InitialState Type이 의미가 없어짐
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
        case ADD_COMMENT.SUCCESS: {
            return {
                ...state,
                comments:[...state.comments,action.data]
            }
        }
        default:
            return state;
    }
}

export default commentsReducer;