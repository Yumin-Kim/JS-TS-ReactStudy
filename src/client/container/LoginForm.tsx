import * as React from 'react';
import { useState, InputHTMLAttributes } from 'react';
import e = require('express');

export const inputHooks = (value: string) :[ string , React.SetStateAction<any> ] => {
    const [state, setState] = useState(value);
    const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState(value);
    }
    return [state, handler];
}

const LoginForm = () => {
    const [name, onChangeName] = inputHooks("");
    const [text, onChangeText] = inputHooks("");

    const onSubmitForm = (e:React.FormEvent) =>{
        e.preventDefault();
        console.log(name , text);
        //dispatch thunk 사용 
    }
    
    return (
        <>
        <h2>Redux + typescript로 구성된 Form</h2>
        <form onSubmit={onSubmitForm} >
            <p>
                이름 입력!! : 
                <input type="text" required value={name} onChange={onChangeName} placeholder="이름을 입력하세요!!" />
            </p>
            <p>
                간단한 자기소개:
                <input type="text" required value={text} onChange={onChangeText} placeholder="자기 소개를 간단히 적어 보세요!!" />
            </p>
            <button type="submit" >제출해요!!</button>
        </form>
        </>
    );
}

export default LoginForm;