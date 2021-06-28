import React, { useState } from 'react';
import { Input, Form, Button,  Row, Col, } from 'antd';
import PostingCard from '../components/PostingCard';
import Counter from '../components/Counter';
import {inputHooks} from '../container/SignModal';

const dummyData = {
    user: {
        id: '1',
        name: '김유민',
        nickname: 'React연습중',
        counter: [
            {
                postings: [
                    {
                        id: '12',
                        title: '123',
                        name: '12'
                    }
                ]
            },
            {
                comments: []
            },
            {
                memo: []
            },
        ]
    },
    LatestPostings: [{
        imgPath: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        avatarpath: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        title: "javascript연습중!!",
        description: "포스팅 연습중입니다 기다려주세여",
        writer: '뮝굴쓰쓰',
        category: "javascript",
        id: "1",
        comments: [
            {
                id: '1',
                comment: '좋아여',
            }, {
                id: '2',
                comment: '좋아여',
            }
        ]
    }, {
        imgPath: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        avatarpath: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        title: "javascript연습중!!",
        description: "포스팅 연습중입니다 기다려주세여",
        writer: '뮝굴쓰쓰',
        category: "javascript",
        id: "1",
        comments: [
            {
                id: '1',
                comment: '좋아여',
            }, {
                id: '2',
                comment: '좋아여',
            }
        ]
    }]
}




const Profile = () => {

    const [ nickname , onChangeNickname ] = inputHooks(dummyData.user.nickname);
    
    const onSubmitForm = (e) =>{
        e.preventDefault();
        //dispatch후에 유저 정보를 집어 넣고 input placeholder에 넣고 변경하는 dispatch
        if(nickname === dummyData.user.nickname )
            return alert('닉네임을 변경하셔야합니다')
        console.log(nickname)
    }

    return (
        <>
            <div >
                <h1>닉네임 변경</h1>
                <Form onSubmit = {onSubmitForm} style={{ marginBottom: '40px' }}>
                    <Input style={{ width: '400px' }} value={nickname} onChange={onChangeNickname} addonAfter="닉네임" />
                    <Button type="primary" htmlType="submit">수정</Button>
                </Form>
                <Row>
                    <h1>최근 댓글,포스팅,메모현황</h1>
                    {dummyData.user.counter.map((val, idx) => <Counter counter={val} />)}
                </Row>
                <Row style={{ background: '#F7F8F9', padding: '10px 100px', margin: ' 20px 0' }} gutter={20} >
                    <h1>최근 접속한 포스팅</h1>
                    {dummyData.LatestPostings.map((val, idx) => (<PostingCard posting={val} key={`${val}${val.id}`} />))}
                    <Col md={24} style={{ textAlign: 'center' }}>
                        <Button>더보기</Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}


export default Profile;