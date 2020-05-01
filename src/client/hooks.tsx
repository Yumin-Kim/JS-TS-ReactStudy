import "@babel/polyfill";

import * as React from 'react';
import { useState, useEffect } from 'react';

import { HooksProps } from './models/type_props_state';
import { axiosData, UndefinedDataType } from './service/api';
//골때림!! fetch한 데이터 타이핑도 필요!!

const Hooks = (props: HooksProps) => {
    const [state, setState] = useState<UndefinedDataType[]>([]);
    // axios로 받은 데이터 state로 넘기는 방법
    const axiosFunc = async () => {
        // const axios = await axiosData("java");
        // setState(axios)
    }

    useEffect(() => {
        console.log("HooksComponent ComponentDidMount")
        if (state.length === 0) {
            axiosFunc();
            console.log("실행")
        }
    }, [state])
    console.log("Execute Api", state);
    return (
        <>
            <div>{props.value}</div>
            <div>{props.text}</div>
            
            <ul>
                {state.length !== 0 && state.map((v, id) =>
                    <li key={`${id}${v.name}`}>{v.name}</li>)}
            </ul>
            <h2>구현 하고 싶은 기능</h2>
            <ul>
                <li>comment 추가/ 수정 / 삭제 </li>
                <li>comment 댓글 남기기 >> 대댓글 삭제 가능</li>
                <li>comment 현황 보여주기! </li>
                <li>api 호출!! >> 페이지 이동간 데이터 보여주기!! </li>
                <li>React-Saga React-Router ServerSideRendering</li>
            </ul>
        </>
    )
}

export default Hooks; 