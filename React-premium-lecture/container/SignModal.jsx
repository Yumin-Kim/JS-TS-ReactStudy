import React, { useState, useCallback } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

export const inputHooks = (initalValue = null) => {
    const [initstate, setValue] = useState(initalValue);
    const handler = useCallback((e) => {
        setValue(e.target.value)
    }, [initalValue])
    return [initstate, handler];
}

const SignModal = () => {

    const [id, onChangeId] = inputHooks('');
    const [nickname, onChangeNickname] = inputHooks('');
    const [password, onChangePassword] = inputHooks('');
    const [checkedPassword, onChangeCheckedPassword] = inputHooks('');

    const [check, setCheck] = useState(false);
    const [ comment , setComment ] = useState(false);

    const onChangeCheck = useCallback((e) => {
        setCheck(true)
    }, [check]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!check) 
            return alert('약관동의을 확인해주세요')
        if(password !== checkedPassword)
            return setComment(true)    
        console.log(id, nickname, password, checkedPassword);
        //dispatch할거 
    }

    return (
        <div>
            <Form style={{ padding: 10 }} onSubmit={onSubmitForm} >
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <Input name="user-id" required value={id} onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <Input name="user-nick" required value={nickname} onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-Password">비밀번호</label>
                    <Input type="password" name="user-Password" required value={password} onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <Input type="password" name="user-password-check" required value={checkedPassword} onChange={onChangeCheckedPassword} />
                    {comment && <p style={{color:'red',fontSize:'1rem'}}>비밀번호가 동일 하지 않습니다 확인해주세요!!</p>}
                </div>
                <div >
                    <Checkbox name="user-tern" value={check} onChange={onChangeCheck}  >약관 동의 하시게 습니까?</Checkbox>
                </div>
                <div>
                    <Button type="primary" htmlType="submit" >가입하기</Button>
                </div>
            </Form>
        </div>
    );
}

export default SignModal;