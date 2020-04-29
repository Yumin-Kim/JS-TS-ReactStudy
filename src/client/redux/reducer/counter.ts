//일단 액션도 같이 선언!!

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

export const counterActions = {
    increment:(data:number) =>({type:INCREMENT , data}),
    decrement :(data:number) => ({type:DECREMENT,data})
}

type IncrementAction = ReturnType<typeof counterActions.increment>
type DecrementAction = ReturnType<typeof counterActions.decrement>

type Action = IncrementAction | DecrementAction;

const counterReducer = () => {

}
export default counterReducer;