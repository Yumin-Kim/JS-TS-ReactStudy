import React, { useState, useCallback, useEffect } from "react";
import styled from 'styled-components';
import Link from "next/link";
import {
  Card,
  Icon,
  Button,
  Avatar,
  Divider,
  Form,
  Input,
  List,
  Comment,
  Popover
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_POST_REQUEST,
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST
} from "../Reducer/post";
import PostImages from "./PostImages";
import PostCardCotent from "./PostCardContent";

const CardWrapper = styled.div`
  margin-bottom:20px;
`;

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentOpened] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { me } = useSelector(state => state.user);
  const { commentAdded, isAddingComment } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

  const onRemovepost = useCallback(userId => () => {
    dispatch({
      type:REMOVE_POST_REQUEST,
      data:userId,
    })
  },[]);

  const onToggleComment = useCallback(() => {
    setCommentOpened(prev => !prev);
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id
      });
    }
  }, []);

  const onSubmitComment = useCallback(
    e => {
      e.preventDefault();
      if (!me) {
        return alert("로그인 필요합니다");
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
          content: commentText
        }
      });
    },
    [me && me.id, commentText]
  );

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value);
  }, []);

  useEffect(() => {
    setCommentText("");
  }, [commentAdded === true]);

  const onToggleLike = useCallback(() => {
    console.log(post.User.id, me.id);
    if (!me) {
      return alert("로그인이 필요 합니다");
    }
    console.log(post);
    if (liked) {
      return dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id
      });
    } else {
      return dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id
      });
    }
  }, [me && me.id, liked]);

  const onRetweet = useCallback(() => {
    if (!me) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id
    });
  }, [me && me.id, post.id]);
  return (
    <CardWrapper>
      <Card
        key={+post.createdAt}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} />,
          <Icon
            type="heart"
            key="heart"
            theme={liked ? "twoTone" : "outlined"}
            twoToneColor="#eb2f96"
            onClick={onToggleLike}
          />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {me && post.UserId === me.id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger" onClick={onRemovepost(post.id)}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <Icon type="ellipsis" />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗 했습니다` : null}
        extra={<Button>팔로우</Button>}
      >
        {post.RetweetId && post.Retweet
          ? (
            <Card
              // cover={post.Retweet.Images[0] !== undefined ? <PostImages images={post.Retweet.Images} />  : null}
            >
              <Card.Meta
                avatar={(
                  <Link
                    href={{ pathname: '/user', query: { id: post.Retweet.User.id } }}
                    as={`/user/${post.Retweet.User.id}`}
                  >
                    <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={post.Retweet.User.nickname}
                description={<PostCardCotent postData={post.Retweet.content} />} // a tag x -> Link
              />
            </Card>
          )
          : (
            <Card.Meta
              avatar={(
                <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                  <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                </Link>
              )}
              title={post.User.nickname}
              description={<PostCardCotent postData={post.content} />} // a tag x -> Link
            />
          )}
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={commentText}
                onChange={onChangeCommentText}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>
              {" "}
              입력!!{" "}
            </Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link
                      href={{ pathname: "/user", query: { id: item.User.id } }}
                      as={`/user/${item.User.id}`}
                    >
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                  datetime={item.createAt}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};

export default PostCard;
