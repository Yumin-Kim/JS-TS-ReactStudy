import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InitialState } from '../typedefine/type_props_state';
import { inputHooks } from './LoginForm';
import { LOG_IN_REQUEST, logoutAction } from '../redux/action/action';
import { post_add, REQEUST, addPostAction } from '../redux/action/action_post';

const DataForm = () => {
    const { name, text, loginning } = useSelector((state: InitialState) => state.user);
    const [todo, onChangeTodo] = inputHooks("");
    const dispatch = useDispatch();

    const onClickLogout = () => {
        //action 사용 안하고 dispatch 사용
        // dispatch({type:LOG_IN_REQUEST})
        dispatch(logoutAction());
    }

    const onSubmittodo = ( e : React.FormEvent) =>{
        e.preventDefault();
        console.log()
        //dispatch
        if(name && text){
            dispatch(addPostAction({id:1,name, text , todo}));
        }
    }

    return (
        <>
            {loginning ? <h2>로그아웃 요청중</h2> : <span></span>}
            <h2>로그인 성공!!</h2>
            <h3> 이름 : {name}</h3>
            <h3> 간단한 소개 :  {text}</h3>
            <form onSubmit={onSubmittodo}>
                <input value={todo} onChange={onChangeTodo} placeholder="todo기능" />
                <p>
                    <button type="submit" >Add todo list</button> 
                </p>
            </form>
            <p>
                <button onClick={onClickLogout} >로그아웃</button>
            </p>
        </>
    );
}

export default DataForm;