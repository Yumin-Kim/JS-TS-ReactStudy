import * as React from 'react';
import { PostState } from '../redux/IStore';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { inputHooks } from '../container/LoginForm';
import { updateAction, deletePostAction } from '../redux/action/action_post';

interface Props extends PostState {
    value: string[]
}

const TodoList = (props: Props) => {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const { value } = props;
    const [comment, onChangeComment] = inputHooks(props.todo);


    //수정 삭제 dispatch 만들기 >> 대댓글 dispatch 만들기!!!!!!
    const updateTodoList = () => {
        const { id, text, name } = props;
        dispatch(updateAction({ id , todo : comment ,name , text }));
    }

    const deleteTodoList = () =>{
        const {id} = props;
        if(typeof id === "number"){
            dispatch(deletePostAction(id));
        }
    }

    return (
        <>
            <li>
                <p>이름 : {props.name}<br></br></p>
                <p>간단한 자기 소개 : {props.text}<br></br></p>
                <p>작성 글 : {props.todo}<br></br></p>
                <p>작성 날짜 : {`${value[3]}년 ${value[1]}월 ${value[2]}일 ${value[4]}시간!!`}</p>
            </li>
            <div>
                <button onClick={() => setToggle(true)} >댓글 수정</button><br></br>
                {toggle && <div>
                    <input placeholder={props.todo} value={comment} onChange={onChangeComment} />
                    <button onClick={updateTodoList}>수정!!</button><button onClick={deleteTodoList} >삭제!!</button>
                </div>}
                <button>대댓글 작성</button><br></br>
            </div>

        </>
    );
}

export default React.memo(TodoList);