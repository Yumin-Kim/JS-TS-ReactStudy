import * as React from 'react';
import { useSelector } from 'react-redux';
import { InitialState } from '../typedefine/type_props_state';
import { inputHooks } from './LoginForm';

const DataForm = () => {
    const { name , text } = useSelector((state : InitialState) =>state.user);
    const [ todo , onChangeTodo ] = inputHooks("");
    
    return(
        <>
            <h2>로그인 성공!!</h2>
            <h3> 이름 : {name}</h3>
            <h3> 간단한 소개 :  {text}</h3>
            <input value={todo} onChange={onChangeTodo} placeholder="todo기능" />
            <button>로그아웃</button>
        </>
    );
} 

export default DataForm;