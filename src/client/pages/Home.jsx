/*eslint-disable no-unused-vars */
import React, { Component, PropTypes, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Navi from '../components/Navi';

let StaticContext;

const Home = (props) => {
 
    const { number, data } = useSelector(state => state);
    const ref = useRef();
    const ref1 = useRef();
    const dispatch = useDispatch();
    const axiosData = async (e) => {
        console.log(ref.current)
        dispatch({ type: "AXIOS_FETCH_REQUEST", data: ref.current.textContent })
    }
    console.log("props",props)
    return (
        <>
        <h1>React templete</h1>
        <Navi/>
        <h2>
            전체적인 레이아웃이나 공통되는 부분 영역입니다!!
        </h2>
            <button onClick={axiosData} ref={ref} >java</button>
            <button onClick={axiosData} ref={ref1} >javascript</button>
            <ul>
                {data.map(v =>
                    <li key={v.id}>{v.name}</li>)}
            </ul>
        </>
    )
}


export default Home;
