import { merge } from "lodash"
import { Action } from "redux";

interface IState{
  number:number;
  data:any; 
}

export default function counter(state: IState = { number: 0, data: [] }, action:Action) {
  console.log("actionReducer", action.type);
  switch (action.type) {
    case "INCREMENT":
      return merge({}, state, {
        number: state.number + 1,
      });
    case "AXIOS_FETCH_REQUEST":
      return merge({}, state, { data: [...action.data] });
    case "AXIOS_FETCH_SUCCESS":
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
