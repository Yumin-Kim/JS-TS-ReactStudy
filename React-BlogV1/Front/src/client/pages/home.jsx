import React from 'react';
import PostingCard from '../components/PostingCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LOAD_POSTING_REQUEST } from '../redux/reducer/post';


const Home = () => {

  const dispatch = useDispatch();
  const { mainPostings ,} = useSelector(state=>state.posts);
  useEffect(()=>{
    dispatch({
      type:LOAD_POSTING_REQUEST
    })
  },[])

  return (
    <>
      {mainPostings&&mainPostings.map((val, idx) => <PostingCard posting={val} key={`${idx}포스팅`} />)}
    </>
  );
}

export default Home;