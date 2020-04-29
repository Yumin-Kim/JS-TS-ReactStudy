import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InitialState } from '../redux/IStore';
import { inputHooks } from './LoginForm';
import { LOG_IN_REQUEST, logoutAction } from '../redux/action/action';
import { post_add, REQEUST, addPostAction, ADD_POST_ID } from '../redux/action/action_post';

const DataForm = () => {
    const { name, text, loginning } = useSelector((state: InitialState) => state.user);
    const {post ,updatePost ,updating } = useSelector((state:InitialState)=>state.post);
    const [todo, onChangeTodo] = inputHooks("");
    const dispatch = useDispatch();

    const onClickLogout = () => {
        //action 사용 안하고 dispatch 사용
        dispatch(logoutAction());
    }

    const onSubmittodo =  ( e : React.FormEvent) =>{
        e.preventDefault();
        console.log()
        if(name && text){
            dispatch(addPostAction({id : post.length,name, text , todo}));
            
        }
    }

    return (
        <>
            {loginning ? <h2>로그아웃 요청중</h2> : <span></span>}
            {updatePost ? <h3>댓글 입력중!!</h3> : updating ? <div>댓글 수정중!!</div> : <h3>댓글을 입력 해주세요!!</h3>}
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

export default React.memo(DataForm);