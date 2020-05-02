import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';

import { PostState } from '../redux/IStore';
import { updateAction, deletePostAction } from '../redux/action/action_post';
import { inputHooks } from '../container/LoginForm';
import { ADD_COMMENT, addCommentAction } from '../redux/action/action_comment';

interface Props extends PostState {
    value: string[]
}

const TodoList = (props: Props) => {
    const [toggle, setToggle] = useState(false);
    const [commentToggle, setCommentToggle] = useState(false);
    const [convertvalue, setConvertvalue] = useState(false);
    
    const refTag = useRef<PostState[keyof PostState]>();
    const clearTime = useRef<number>();
    const dispatch = useDispatch();
    
    const [todo, onChangeTodo] = inputHooks(props.todo);
    const [comment, onChangeComment] = inputHooks("");
    const { value } = props;

    const addComment = () =>{
        const { id , name , text} = props; 
        // dispatch(addCommentAction({id,name ,text,comment}));
    }

    //수정 삭제 dispatch 만들기 >> 대댓글 dispatch 만들기!!!!!!
    const updateTodoList = () => {
        const { id, text, name } = props;
        dispatch(updateAction({ id, todo, name, text }));
    }

    const deleteTodoList = () => {
        const { id } = props;
        if (typeof id === "number") {
            dispatch(deletePostAction(id));
        }
    }
    useEffect(() => {
        window.clearTimeout(clearTime.current);
        console.log(`${props.id} ComponenetDidMount`);
        if (refTag.current) {
            setConvertvalue(true);
            clearTime.current = window.setTimeout(() => {
                setConvertvalue(false);
                setToggle(false);
            }, 1000);
        }
        refTag.current = todo;
    }, [props.todo])


    return (
        <>
            <li>
                <p>이름 : {props.name}<br></br></p>
                <p>간단한 자기 소개 : {props.text}<br></br></p>
                <p style={convertvalue ? { color: "red" } : undefined}>작성 글 : {props.todo}<br></br></p>
                <p>작성 날짜 : {`${value[3]}년 ${value[1]}월 ${value[2]}일 ${value[4]}시간!!`}</p>
            </li>
            <div>
                <button onClick={() => setToggle(true)} >작성 글 수정</button><br></br>
                {toggle && <div>
                    <input placeholder={props.todo} value={todo} onChange={onChangeTodo} />
                    <button onClick={updateTodoList}>수정!!</button><button onClick={deleteTodoList} >삭제!!</button>
                </div>}
                <button onClick={() => setCommentToggle(true)} >대댓글 작성</button><br></br>
                {
                    commentToggle && <div>
                    <input placeholder="댓글을 입력하세요!!" value={comment} onChange={onChangeComment} />
                    <button onClick={addComment}>댓글 입력!!!!</button>
                </div>
                }
            </div>

        </>
    );
}

export default React.memo(TodoList);