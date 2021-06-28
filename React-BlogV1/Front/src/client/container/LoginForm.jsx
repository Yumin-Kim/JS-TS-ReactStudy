import React from 'react'
import { Form ,Input,Button } from 'antd';
import { inputHooks } from './SignModal';
import { useDispatch } from 'react-redux';
import { LOG_IN_REQUEST } from '../redux/reducer/user';


const LoginForm = () => {
    const dispatch = useDispatch();

    const [ id , onChangeId ] = inputHooks('');
    const [ password , onChangePassword ] = inputHooks('');

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(id,password);
        dispatch({
            type:LOG_IN_REQUEST,
            data:{
                userId:id,
                password,
            }
        })
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