import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../components/LoginForm";
import UserProfile from "./UserProfile";
import { LOAD_USER_REQUEST } from "../Reducer/user";
import  Router  from "next/router";

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSearch = (value) => {
    Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
  };
  return (
    <>
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link href="/" prefetch>
              <a>노드 버드</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link href="/Profile" prefetch>
              <a>프로필</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="mail">
            <Input.Search
              enterButton="search"
              style={{ verticalAlign: "middle" }}
              onSearch={onSearch}
            />
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          <Col style={{ padding: "20px" }} xs={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col style={{ padding: "20px" }} xs={24} md={12}>
            {children}
          </Col>
          <Col style={{ padding: "20px" }} xs={24} md={6}>
            <Link href="https://www.naver.com">
              <a target="_blank">Made in React+Next+Redux</a>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AppLayout;
