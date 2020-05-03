// //일단 액션도 같이 선언!!
// // const INCREMENT = "INCREMENT" as const;
// // const DECREMENT = "DECREMENT" as const;

// import { Action } from "redux";

// // export const counterActions = {
// //     increment:(data:number) =>({type:INCREMENT , data}),
// //     decrement :(data:number) => ({type:DECREMENT,data})
// // }

// // type IncrementAction = ReturnType<typeof counterActions.increment>
// // type DecrementAction = ReturnType<typeof counterActions.decrement>
// // type Action = IncrementAction | DecrementAction;

// type State = {
//     count : number;
// }

// const initialState : State =  {
//     count:0,
// }

// const counterReducer = ( state : State , action : Action ) => {
//     switch(action.type){
//         case INCREASE : {
//             return { count:state.count +1; }
//             break;
//         }
//         case INCREASE : {
//             return { count:state.count +1; }
//             break;
//         }
//         default :
//         return state;
//     }
// }
// export default counterReducer;