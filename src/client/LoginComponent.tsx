import * as React from 'react';
import { useSelector } from 'react-redux';
import { InitialState } from './typedefine/type_props_state';
import LoginForm from './container/LoginForm';

const LoginComponent = () => {
    const { loginning }= useSelector((state : InitialState) => state.user);
    return(
        <>
            {!loginning ? 
            <LoginForm/> :
            <div>
                {/* <DataForm/> 로그인 정보 보여주고 comment 입력 할 수 있게끔 */}
            </div>
        }
        </>
    );
} 

export default LoginComponent;