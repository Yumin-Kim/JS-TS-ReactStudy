import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Input, Form, Button, Row, Col, } from 'antd';
import PostingCard from '../components/PostingCard';
import Counter from '../components/Counter';
import { inputHooks } from '../container/SignModal';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { LICKNAME_PATCH_REQUEST } from '../redux/reducer/user';
//최근에 조회한 정보들 어디에다가 보관할지 ?? id로 조회 [{}] >> 
// 쿠기가 답 쿠기 ex) 날짜 , bookMark = 3 >> 3은 그 포스팅의 아이디 >> redux의 action Creater로 해결 
//다른 아이디로 로그인 했을때 쿠키가 사라지지 않고 있음
const Profile = () => {
    const { detailContent, mainPostings } = useSelector(state => state.posts);
    const { userInfo, counter } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const cookieRef = useRef(null);
    const [nickname, onChangeNickname] = inputHooks(userInfo.nickname);
    const [cookie, setCookie] = useCookies(['count']);


    
    cookieRef.current = cookie.count&&cookie.count.currentPage.map(v => {
            return mainPostings.filter(val =>
                val.id === Number(v)
            )
        })


    const onSubmitForm = (e) => {
        e.preventDefault();
        //dispatch후에 유저 정보를 집어 넣고 input placeholder에 넣고 변경하는 dispatch
        if (nickname === userInfo.nickname){
            return alert('닉네임을 변경하셔야합니다')
        }
        dispatch({
            type:LICKNAME_PATCH_REQUEST,
            data:nickname
        })    
    }
    return (
        <>
            <div >
                <h1>닉네임 변경</h1>
                <Form onSubmit={onSubmitForm} style={{ marginBottom: '40px' }}>
                    <Input style={{ width: '400px' }} value={nickname} onChange={onChangeNickname} placeholder={userInfo.nickname} addonAfter="닉네임" />
                    <Button type="primary" htmlType="submit">수정</Button>
                </Form>
                <Row>
                    <h1>최근 댓글,포스팅,메모현황</h1>
                    {Object.keys(counter).map((val, idx) => <Counter key={`${idx}${val}`} title={val} number={counter[val]} />)}
                </Row>
                <Row style={{ background: '#F7F8F9', padding: '10px 100px', margin: ' 20px 0' }} gutter={20} >
                    <h1>최근 접속한 포스팅</h1>
                    {(cookieRef.current && mainPostings[0]) && cookieRef.current.map((val, idx) => (<PostingCard posting={val[0]} key={`${idx}`} />))}
                    <Col md={24} style={{ textAlign: 'center' }}>
                        <Button>더보기</Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}


export default Profile;