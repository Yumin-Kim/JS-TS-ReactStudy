import "@babel/polyfill";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

import { HooksProps } from './models/type_props_state';
import { axiosData, UndefinedDataType } from './service/api';
//골때림!! fetch한 데이터 타이핑도 필요!!

const Hooks = (props: HooksProps) => {
    const [state, setState] = useState<UndefinedDataType[]>([]);
    const [axiosList, setAxiosList] = useState<any>([]);
    // axios로 받은 데이터 state로 넘기는 방법
    const axiosFunc = async () => {
        const Kakao = require('./service/kakao');
        Kakao.init("1b36de275571f6d368f4d8cedafdfba3")
        console.log(Kakao);
        //카카오톡 카페글에서 검색하는 url
        const axiosData = await Axios.get("https://dapi.kakao.com/v2/search/cafe?query=%EC%B2%AD%EC%A3%BC%20%EC%B9%B4%ED%8E%98&sort=accuracy&page=1&size=50",{headers:{Authorization: `KakaoAK 63fdc122d9df23339113f6a040a02afd`}});
        console.log(axiosData.config.url)
        console.log(axiosData.data.documents)
        setAxiosList(axiosData.data.documents);
    }

    useEffect(() => {
        console.log("HooksComponent ComponentDidMount")
        if (state.length === 0) {
            axiosFunc();
            console.log("실행")
        }
    }, [state])
    console.log("Execute Api", state);
    console.log("axiosData",axiosList)
    return (
        <>
            <div>{props.value}</div>
            <div>{props.text}</div>
            
            <ul>
                {state.length !== 0 && state.map((v, id) =>
                    <li key={`${id}${v.name}`}>{v.name}</li>)}
            </ul>
            <ul>
                {axiosList.length !== 0 && (axiosList as any).map((v:any, id:any) =>
                    <li key={`${id}`} dangerouslySetInnerHTML={{__html:v.title}}></li>)}
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