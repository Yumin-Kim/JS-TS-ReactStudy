import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER_INFO_REQUEST } from '../redux/reducer/user';
import { LOAD_POSTING_REQUEST } from '../redux/reducer/post';
import { CookiesProvider } from 'react-cookie';
//SSR이 아니여서 dispatch된 정보들은 알지 못함

const App = () => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user)

    useEffect(() => {
        dispatch({
            type: LOAD_USER_INFO_REQUEST,
        })
        dispatch({
            type: LOAD_POSTING_REQUEST,
        })
    }, []);

    return (
        <>
            <CookiesProvider>
                <AppLayout/>
            </CookiesProvider>
        </>
    )
}

export default App;