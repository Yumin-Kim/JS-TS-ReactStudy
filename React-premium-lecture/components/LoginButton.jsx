import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import LoginForm from '../container/LoginForm';
import { Router } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import SignModal from '../container/SignModal';


const ButtonLogin = () => {
    const [modal2Visible, setModal2Visible] = useState(false);
    const [signUp , setSignUp ] = useState(false);
    const setModal = (parmas = null,signData = null) => () => {
        setModal2Visible(parmas);
        setSignUp(signData);
    }

    return (
        <>
        <Button type="default" onClick={setModal(true)}>
        Login
        </Button>
        <Modal
            title={ signUp ? 'Sign Up' : 'Login Form' }
            centered
            visible={modal2Visible}
            okText="Sign Up"
            onOk={setModal(true,true)}
            onCancel={setModal(false)}
        >
         {signUp ?<SignModal/> : <LoginForm /> }   
        </Modal>
        </>
    );

}


export default ButtonLogin;