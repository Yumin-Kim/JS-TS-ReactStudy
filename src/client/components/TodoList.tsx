import * as React from 'react';
import { PostState } from '../redux/IStore';
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { inputHooks } from '../container/LoginForm';

interface Props extends PostState{
    value:string[]
}

const TodoList = (props : Props) =>{
    const [toggle , setToggle] = useState(false);
    const dispatch = useDispatch();
    const {value} = props;
    const [ comment , onChangeComment ] = inputHooks(props.todo);

    const commentToggle = () =>{
        setToggle(true);
        // dispatch(); 수정 
    }
    
    return(
        <>
            <li> 
                <p>이름 : {props.name}<br></br></p>
                <p>간단한 자기 소개 : {props.text}<br></br></p>
                <p>작성 글 : {props.todo}<br></br></p>
                <p>작성 날짜 : {`${value[3]}년 ${value[1]}월 ${value[2]}일 ${value[4]}시간!!`}</p>
            </li>
            <div>
                <button onClick={()=>setToggle(true)} >댓글 수정</button><br></br>
                {toggle &&<div>
                    <input placeholder={props.todo} value={comment} onChange={onChangeComment} />
                    <button>수정!!</button><button>삭제!!</button>
                    </div> }
                <button>대댓글 작성</button><br></br>
            </div>
            
        </>
    );
}

export default React.memo(TodoList);