import React from 'react'
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../redux/reducer/user';
const { Meta } = Card;


const UserPost = () => {

    const dispatch = useDispatch();
    const { userInfo,isLogging,counter } = useSelector(state => state.user);
    const onClickLogOut = () => {
        dispatch({
            type: LOG_OUT_REQUEST,
        })
    }

    return (
        <Card
            actions={[
                <div>
                    <p>댓글수</p>
                    0
            </div>,
                <div>
                    <p>작성수</p>
                    {counter.postLength}
            </div>,
                <div>
                    <p>메모수</p>
                    0
            </div>,
            ]}>

            <Meta
                avatar={<Avatar shape="square" size={80} src="data:image/jpeg;base64,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" />}
                style={{ textAlign: "center" }}
                title={userInfo.userId}
                description={userInfo.nickname}
            />
            {isLogging &&
                <Button type="primary" onClick={onClickLogOut}>
                    LogOut
                </Button>
            }
        </Card>
    );
}

export default UserPost;