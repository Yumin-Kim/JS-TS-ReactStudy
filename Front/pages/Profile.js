import React from 'react';
import { Form, Input, Button, List, Card, Icon } from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';
const Profile = () => {
    return (
        <>
            <div>
                <NicknameEditForm/>
                <List 
                    style={{marginBottom:'20px'}}
                    grid={{gutter:4,xs:2,md:3}}
                    size="small"
                    header={<div>팔로잉 목록</div>}
                    loadMore={<Button style={{width:'100px'}}>더 보기</Button>}
                    bordered
                    dataSource={['팔로우','리액트','노드버드프로젝트']}
                    renderItem={Item =>(
                        <List.Item style={{marginTop:'20px'}}>
                            <Card actions={[<Icon key="stop" type="stop" />]}>
                                <Card.Meta description={Item}></Card.Meta>
                            </Card>
                        </List.Item>
                    )}
                />
                <List 
                    style={{marginBottom:'20px'}}
                    grid={{gutter:4,xs:2,md:3}}
                    size="small"
                    header={<div>팔로워 목록</div>}
                    loadMore={<Button style={{width:'100px'}}>더 보기</Button>}
                    bordered
                    dataSource={['팔로우','리액트','노드버드프로젝트']}
                    renderItem={Item =>(
                        <List.Item style={{marginTop:'20px'}}>
                            <Card actions={[<Icon key="stop" type="stop" />]}>
                                <Card.Meta description={Item}></Card.Meta>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}

export default Profile;