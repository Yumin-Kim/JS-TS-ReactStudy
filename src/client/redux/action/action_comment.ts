import { REQEUST, SUCCESS, FAILURE } from './action_post';
import { IComments, ICommentsData } from '../IStore';
import { ThunkAction } from './action';
//reduce로 하면 코드량은 확실히 줄지만 정확한 타이핑이 불가능하다 >> 계속 string으로 나옴

// action 반복줄이고 타이핑은 아직까지는 이게 최선
//reduce로 통해 만들어진 객체 타이핑!!
export interface IActionTypeName {
    REQEUST: string;
    SUCCESS: string;
    FAILURE: string;
}

type UndefinedActionName<T> = {
    [P in keyof T]?: T[P];
}

type IACtionTayeName_Mapped = UndefinedActionName<IActionTypeName> 
type Action_type_name = [typeof REQEUST, typeof FAILURE, typeof SUCCESS];

//문지열
function createActionTypeName<T>(actionType: T) : IActionTypeName {
    return ([REQEUST, FAILURE, SUCCESS] as Action_type_name).reduce<IActionTypeName>((prev, currentVar)=> {
        prev[currentVar] = `${actionType}_${currentVar}`;
        return prev;
    }, {} as IActionTypeName)
}

//ADD_COMMENT.REQUEST
const ADD_COMMENT_V = "ADD_COMMENT";
export const ADD_COMMENT = createActionTypeName<typeof ADD_COMMENT_V>(ADD_COMMENT_V);

const DELETE_COMMENT_V = "DELETE_COMMENT";
export const DELETE_COMMENT = createActionTypeName<typeof DELETE_COMMENT_V>(DELETE_COMMENT_V);

const UPDATE_COMMENT_V = "UPDATE_COMMENT";
export const UPDATE_COMMENT = createActionTypeName<typeof UPDATE_COMMENT_V>(UPDATE_COMMENT_V);

// function action(type , data){
//     return{}
// }

type aaaa = IActionTypeName[keyof IActionTypeName];

export interface IActionObject<T, U> {
    request: (data: U) => { type: T, data: U };
    success: (data: U) => { type: T, data: U };
    failure: (data: Error) => { type: T, data: Error };
}


export const add_comment: IActionObject<string, IComments> = {
    request: (data) => ({ type: ADD_COMMENT.REQEUST, data }),
    success: (data) => ({ type: ADD_COMMENT.SUCCESS, data }),
    failure: (data) => ({ type: ADD_COMMENT.FAILURE, data }),
}

export const addCommentAction = (data : IComments) :ThunkAction =>{
    return(dispatch) => {
        dispatch(add_comment.request(data));
        try{
            setTimeout(()=>{
                dispatch(add_comment.success(data));
            },500)
        }catch(error){
            console.log(error);
            dispatch(add_comment.failure(error));
        }
    }
} 


