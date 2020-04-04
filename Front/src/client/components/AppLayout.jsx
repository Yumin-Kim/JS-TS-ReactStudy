import React from 'react';
import {Link, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Input, Row } from 'antd';
import ButtonLogin from './LoginButton';
import SubMenuComponent from './SubMenuComponent'
import Routes from '../pages/Routes';
// 페이지에서 reredner 진행할때 무조건 1만 실행됨 defaultkey이 실행되어서
const HeaderTile = styled(Row)`
box-sizing: border-box;
padding : 100px;
width:80%;
`;

const AppLayout = () => {
    return (
        <div>
            <Layout>
                <Layout.Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px', fontSize: '1rem' }}
                    >
                        {/* 이부분도 routes폴더랑 메뉴부분 반복되니 수정사항 추가 */}
                        <Menu.Item key="1"><Link to="/" >My Blog</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/profile">Profile</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/writePost">Write post</Link></Menu.Item>
                        <Menu.Item key="4">Memo</Menu.Item>
                        <Menu.Item key="5">
                            <ButtonLogin />
                        </Menu.Item>
                        <Input.Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                    </Menu>
                </Layout.Header>
                <Layout style={{boxSizing:'border-box'}}>
                    <Layout.Sider width={200} style={{ background: '#fff' }}>
                        <SubMenuComponent />
                    </Layout.Sider>
                    <HeaderTile>
                        <Routes/>
                    </HeaderTile>
                </Layout>
            </Layout>
        </div>
    );
}

export default AppLayout;
