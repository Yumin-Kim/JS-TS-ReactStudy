import React, { useState, useEffect } from 'react'
import { Button, Modal, notification } from 'antd';
import LoginForm from '../container/LoginForm';
import SignModal from '../container/SignModal';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';


const ButtonLogin = () => {
    const [modal2Visible, setModal2Visible] = useState(false);
    const { userInfo, isLogging } = useSelector(state => state.user);
    const [signUp, setSignUp] = useState(false);

    const openNotification = (isLogging = null) => {
        notification.open({
            message: isLogging ? "로그인하셨습니다" : '로그인 성공하셨습니다',
            description: isLogging ? "다른 컨테츠를 이용하세요!!" : `${userInfo.nickname}님 환영합니다!!`,
        });
    };

    useEffect(() => {
        if (userInfo.id && userInfo) {
            openNotification();
        }
    }, [userInfo.id && userInfo])

    const setModal = useCallback((parmas = null, signData = null) => () => {
        if (isLogging) {
            openNotification(isLogging);
        }
        setModal2Visible(parmas);
        setSignUp(signData);
    }, [modal2Visible, signUp, userInfo.id && userInfo])

    return (
        <>
            <Button type="default" onClick={setModal(true)}>
                Login
        </Button>
            {!isLogging && <Modal
                title={signUp ? 'Sign Up' : 'Login Form'}
                centered
                visible={modal2Visible}
                okText="Sign Up"
                onOk={setModal(true, true)}
                onCancel={setModal(false)}
            >
                {signUp ? <SignModal /> : <LoginForm />}
            </Modal>}
        </>
    );

}


export default ButtonLogin;