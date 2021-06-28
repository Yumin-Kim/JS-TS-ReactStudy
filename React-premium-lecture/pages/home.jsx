import React from 'react';
import { Card, Col, Row, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import PostingCard from '../components/PostingCard';
const { Meta } = Card;

const dummyData = [
    {
        imgPath:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        avatarpath:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        title:"javascript연습중!!",
        description:"포스팅 연습중입니다 기다려주세여",
        writer:'뮝굴쓰쓰',
        category:"javascript",
        id:"1",
        comments:[
          {
            id:'1',
            comment:'좋아여',
          },{
            id:'2',
            comment:'좋아여',
          }
        ]
    }
  ]

const Home = () => {
    return (
                <>
                {dummyData.map((val,idx)=><PostingCard posting={val} key={`${val.title}포스팅`} />)}
            </>
    );
}

export default Home;