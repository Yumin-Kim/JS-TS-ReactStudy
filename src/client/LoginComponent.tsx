import * as React from 'react';
import { useSelector } from 'react-redux';
import { InitialState } from './typedefine/type_props_state';
import LoginForm from './container/LoginForm';
import DataForm from './container/DataForm';
import PostComponent from './PostComponent';

const LoginComponent = () => {
    const { loggined , loginning }= useSelector((state : InitialState) => state.user);
    return(
        <>
            {!loggined ? <LoginForm/> :<DataForm/>}
        <PostComponent/>
        </>
    );
} 

export default LoginComponent;