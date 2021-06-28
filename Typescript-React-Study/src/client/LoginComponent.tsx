import * as React from 'react';
import { useSelector } from 'react-redux';
import { InitialState } from './redux/IStore';
import LoginForm from './container/LoginForm';
import DataForm from './container/DataForm';
import PostComponent from './components/PostComponent';

const LoginComponent = () => {
    const { loggined  }= useSelector((state : InitialState) => state.user);
    return(
        <>
            {!loggined ? <LoginForm/> :<DataForm/>}
        <PostComponent/>
        </>
    );
} 

export default LoginComponent;