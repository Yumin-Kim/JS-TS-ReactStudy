/*eslint-disable no-unused-vars */
import React, { Component, PropTypes, useState, useRef } from 'react'
import SubPage from './SubPage';
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
  const { number, data } = useSelector(state => state);
  const ref = useRef();
  const ref1 = useRef();
  const dispatch = useDispatch();
  const axiosData = async (e) => {
    console.log(ref.current)
    dispatch({ type: "AXIOS_FETCH_REQUEST", data: ref.current.textContent })
  }
  return (<div>
    <button>
      Increment after 1 !!
        </button>
    {' '}
    <button>
      Decrement
        </button>
    <hr />
    {/* <SubPage/> */}
    <div>
      Clicked: {number} times
        </div>
    <button onClick={axiosData} ref={ref} >java</button>
    <button onClick={axiosData} ref={ref1} >javascript</button>
    <ul>
      {data.map(v =>
        <li key={v.id}>{v.name}</li>)}
    </ul>
  </div>
  )
}


export default Counter;
