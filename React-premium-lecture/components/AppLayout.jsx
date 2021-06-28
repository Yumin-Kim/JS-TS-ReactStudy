import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from '../pages/home';
import Profile from '../pages/profile';
import { Layout, Menu, Input, Row, Col } from 'antd';
import ButtonLogin from './LoginButton';
import UserPost from './UserPost';
import Writepost from '../pages/writePost';
import SubMenuComponent from './SubMenuComponent'

const { Search } = Input;
const { Header, Sider } = Layout;

const HeaderTile = styled(Row)`
box-sizing: border-box;
padding : 40px;
width:100%;
`;
const ProfileDiv = styled.div`
margin: 0 auto;
`;


const AppLayout = ({ children }) => {
    console.log(children)
    return (
        <div>
            <Router>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px', fontSize: '1rem' }}
                        >
                            <Menu.Item key="1"><Link to="/" >My Blog</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/profile">Profile</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/writePost">Write post</Link></Menu.Item>
                            <Menu.Item key="4">Memo</Menu.Item>
                            <Menu.Item key="5">
                                <ButtonLogin />
                            </Menu.Item>
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />

                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                                <SubMenuComponent/>
                        </Sider>
                        <HeaderTile>
                            <Switch>
                                <Route path="/profile" >
                                    <ProfileDiv>
                                        <Profile />
                                    </ProfileDiv>
                                </Route>
                                <Route path="/writePost">
                                    <Writepost />
                                </Route>
                                <Route path="/" >
                                    <Home />
                                </Route>
                            </Switch>
                        </HeaderTile>
                    </Layout>
                </Layout>



            </Router>
        </div>
    );
}

export default AppLayout;
