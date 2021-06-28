import React from 'react'
import { Col , Card ,Statistic,Icon } from 'antd';
const dummyData = {
    userInfo:{
        //주마다 비교하여 현재 날짜에서 비교 >> 
        id:1,
        name:'duumy',
        nickname:'dummyNickname',
        imagePath:'...img.jpg',
        postings:[{
            //카테고리 table 조회후 결과 여기다가 출력
        },{}],
        comments:[{
            //comments table 따로 만들어서 userId로 조회
        }],
        memoPostings:[{
            //memo table만들어서 조회
        }]
    }
}
const Counter = ({ number,title }) => {

    return (
        <Col span={8}>
            <Card>
                <Statistic
                    title={`${title} Counter`}
                    value={number!==null?number:0}
                    // precision={2}
                    // valueStyle={{ color: '#cf1322' }}
                    // prefix={<Icon type="arrow-down" />}
                    // suffix="%"
                />
            </Card>
        </Col>
    );
}

export default Counter;