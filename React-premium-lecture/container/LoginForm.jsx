import React from 'react'
import { Form ,Input,Button } from 'antd';
import { inputHooks } from './SignModal';


const LoginForm = () => {

    const [ id , onChangeId ] = inputHooks('');
    const [ password , onChangePassword ] = inputHooks('');

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(id,password);
        //dispatch 할거
    }
    
    return (
        <Form onSubmit={onSubmitForm} style={{ padding: '10px' }}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id"  required value = {id} onChange = {onChangeId} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password"  type="password" required value ={password} onChange = {onChangePassword} />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button type="primary" htmlType="submit" >로그인</Button>
            </div>
        </Form>
    );
}


export default LoginForm;