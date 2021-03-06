import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from '../Reducer/user'

const UserProfile = () => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onLogout = useCallback((e) => {
    console.log(me)
    e.preventDefault();
    dispatch({
        type: LOG_OUT_REQUEST,
      });
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {me.Followers.length}
        </div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
