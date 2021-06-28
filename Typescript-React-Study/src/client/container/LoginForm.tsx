import * as React from 'react';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, loginRequest } from '../redux/action/action';
import { InitialState } from '../redux/IStore';

export const inputHooks = (value: string): [string, React.SetStateAction<any>] => {
    const [state, setState] = useState(value);
    const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setState(value);
        }, [value])
    return [state, handler];
}

const LoginForm = () => {
    const [name, onChangeName] = inputHooks("");
    const [text, onChangeText] = inputHooks("");
    const dispath = useDispatch();
    const { loginning , loggined } = useSelector((state: InitialState) => state.user);
    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        //dispatch thunk 사용 
        dispath(loginAction({ name, text }));
    }

    return (
        <>
            
            {loginning ?  <h2>로그인 조회중</h2> : <p>로그인 해주세요!!</p>}
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
                <button type="submit" >로그인 !!</button>
            </form>
        </>
    );
}

export default LoginForm;