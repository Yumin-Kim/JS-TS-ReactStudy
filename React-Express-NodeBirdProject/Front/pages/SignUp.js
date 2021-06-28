import React, { useState, useCallback,useEffect } from 'react';
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Checkbox, Button, Input } from 'antd';
import { SIGN_UP_REQUEST } from '../Reducer/user';


export const useInput = (initVal = null) => {
    const [value, setValue] = useState(initVal);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, [])
    return [value, handler];
}

const Signup = () => {
    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [tern, setTern] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [ternError, setTernError] = useState(false);
    const { isSigningUp , me } =useSelector(state=>state.user);
    
    const dispatch = useDispatch();

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!tern) {
            return setTernError(true);
        }
        return dispatch({
            type: SIGN_UP_REQUEST,
            data: {
              userId:id,
              password,
              nickname:nick,
            },
          });
    }, [id,nick,password, tern, setPasswordError]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password)
    }, [password]);
    const onChangeTern = useCallback((e) => {
        setTern(e.target.checked);
        setTernError(false);
    }, []);

    useEffect(()=>{
        if(me){
            Router.push('/')
        }

    },[me && me.id])

    return (
        <>
            <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <Input value={id} name="user-id" required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <Input value={nick} name="user-nick" required onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-Password">비밀번호</label>
                    <Input value={password} type="password" name="user-Password" required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <Input value={passwordCheck} type="password" name="user-password-check" required onChange={onChangePasswordCheck} />
                    {passwordError ? <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다</div> : ""}
                </div>
                <div >
                    <Checkbox name="user-tern" value={tern} onChange={onChangeTern}>약관 동의 하시게 습니까?</Checkbox>
                    {ternError ? <div style={{ color: 'red' }}>약관에 동의 하셔야 합니다</div> : ''}
                </div>
                <div>
                    <Button type="primary" htmlType="submit" loading={isSigningUp} >가입하기</Button>
                </div>
            </Form>
        </>
    );
}

export default Signup;