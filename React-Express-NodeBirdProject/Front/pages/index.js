import React, { useEffect, useCallback, useRef } from "react";
import { Form, Input, Button, Card, Icon, Avatar } from "antd";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../Reducer/user";
import { LOAD_MAIN_POSTS_REQUEST } from "../Reducer/post";

//useDispatch은 action을 실행을 담당하고 있고
//useSelector은 reducer에 있는 state를 가지고 올 수 있다

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const countRef = useRef([]);

  const onScoll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId))
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId
          });
        countRef.current.push(lastId);
      }
    }
  }, [mainPosts.length]);

  useEffect(() => {
    window.addEventListener("scroll", onScoll);
    return () => {
      window.removeEventListener("scroll", onScoll);
    };
  }, [mainPosts.length]);

  return (
    <>
      {me ? (
        <div>{me.nickname}이 로그인 하셨습니다</div>
      ) : (
        <div>로그아웃 하셨습니다</div>
      )}
      <div>
        {me && <PostForm />}
        {mainPosts.map((val, el) => {
          return <PostCard key={val.id} post={val}  />;
        })}
      </div>
    </>
  );
};

Home.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST
  });
};

export default Home;
