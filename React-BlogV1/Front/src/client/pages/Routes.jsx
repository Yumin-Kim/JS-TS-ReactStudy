import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Category from '../components/Category';
import Writepost from './writePost';
import Home from './home';
import Profile from './profile';
import DetailCategory from '../components/DetailCategory';
import { useSelector } from 'react-redux';
const ProfileDiv = styled.div`
margin: 0 auto;
`;
const Routes = () => {
    const { userInfo } = useSelector(state => state.user);
    //redirct용 component 생성 필요
    console.log('userInfo Route',userInfo)
    return (
        <>
            <Switch>
                <Route path="/profile" >
                    {(userInfo.id || userInfo) ?
                        <ProfileDiv>
                            <Profile />
                        </ProfileDiv> :
                        <Redirect to="/" />
                    }
                </Route>
                <Route path="/writePost">
                    {(userInfo.id && userInfo) ?
                        <Writepost />:
                        <Redirect to="/" />
                    }
                </Route>
                <Route path="/category/:id" exact component={Category} />
                <Route path="/category/:id/:detailCategory" exact component={DetailCategory} />
                <Route path="/" >
                    <Home />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;