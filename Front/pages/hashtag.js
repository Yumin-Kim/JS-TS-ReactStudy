import React, { useEffect ,useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../Reducer/post";
import PostCard from "../components/PostCard";

const HashTag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts,hasMorePost } = useSelector(state => state.post);

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      console.log(mainPosts.length);
      if (hasMorePost) {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          lastId: mainPosts.length === 0 ? 0 : mainPosts[mainPosts.length - 1].id,
          data: tag,
        });
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);
  return (
    <div>
      {mainPosts.map(c => (
        <PostCard key={c.id} post={c} />
      ))}
    </div>
  );
};

HashTag.getInitialProps = async context => {
  const tag = context.query.tag;
  console.log("hashTag getInitialProps", context.query.tag);
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag
  });
  return { tag };
};

export default HashTag;
