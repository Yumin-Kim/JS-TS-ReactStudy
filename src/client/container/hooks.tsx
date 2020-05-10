import "@babel/polyfill";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

import { HooksProps } from '../models/type_props_state';
import { axiosData, UndefinedDataType, fetchNewsData, CategoryType } from '../service/api';
import { inputHooks } from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { search_data } from "../redux/action/action_search";
import { InitialState } from "../redux/IStore";
//골때림!! fetch한 데이터 타이핑도 필요!!

const Hooks = (props: HooksProps) => {
    const [state, setState] = useState<UndefinedDataType[]>([]);
    const [axiosList, setAxiosList] = useState<any>([]);
    const [newCategory, setNewCategory] = useState<CategoryType>("business");
    const [keyword, onChangekeyword] = inputHooks("");
    const dispatch = useDispatch();
    const { searchs } = useSelector((state: InitialState) => state.search);
    // axios로 받은 데이터 state로 넘기는 방법
    const axiosFunc = async () => {
        // const Kakao = require('./service/kakao');
        // Kakao.init("1b36de275571f6d368f4d8cedafdfba3")
        //카카오톡 카페글에서 검색하는 url
        //encode >> 문자를 코드로 변형
        //decode >> 코드를 문자로!!
        const axiosData = await Axios.get("https://dapi.kakao.com/v2/search/cafe?query=%EC%B2%AD%EC%A3%BC%20%EC%B9%B4%ED%8E%98&sort=accuracy&page=1&size=50", { headers: { Authorization: `KakaoAK 63fdc122d9df23339113f6a040a02afd` } });
        setAxiosList(axiosData.data.documents);
    }
    useEffect(() => {
        console.log("HooksComponent ComponentDidMount")
        if (state.length === 0) {
            // axiosFunc();
            console.log("실행")
        }
    }, [state])

    const onSubmitSelect = (e: React.FormEvent) => {
        e.preventDefault();
        fetchNewsData(newCategory)
            .then((data) => {
                console.log(data.data.articles);
                setAxiosList(data.data.articles);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const onChageSelect = (e:React.ChangeEvent<HTMLSelectElement>)  =>{
        setNewCategory((e.target.value as CategoryType ));
    }
    
    const onSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(search_data(keyword));
    }

    return (
        <>
            <div>{props.value}</div>
            <div>{props.text}</div>

            <ul>
                {state.length !== 0 && state.map((v, id) =>
                    <li key={`${id}${v.name}`}>{v.name}</li>)}
            </ul>
            <h2>NewAPI</h2>
            <form onSubmit={onSubmitSelect} >
                <select value={newCategory} onChange={onChageSelect} >
                    <option value="technology" >technology</option>
                    <option value="entertainment" >entertainment</option>
                    <option value="business" >business</option>
                    <option value="health" >health</option>
                    <option value="sports" >sports</option>
                    <option value="headLine" >headLine</option>
                </select>
                <input type="submit" value="선택완료!!" />
            </form>
            <ul>
                {axiosList.length !== 0 && axiosList.map((v:any, id:any) => (
                    <li key={`${id}`} >
                        <p>{v.author}</p>
                        <p>{v.description}</p>
                        <p>{v.title}</p>
                    </li>
                )
                )}
            </ul>
            <h2>다음 블로그 검색 API</h2>
            <form onSubmit={onSubmitSearch} >
                <input placeholder="Please enter searching keyword" value={keyword} onChange={onChangekeyword} />
                <input type="submit" value="검색" />
            </form>
            <ul>
                {searchs.length !== 0 && searchs.map((v, id) => (
                    <li key={`${id}`} >
                        <p dangerouslySetInnerHTML={{ __html: v.cafename }} ></p>
                        <p dangerouslySetInnerHTML={{ __html: v.title }} ></p>
                        <p dangerouslySetInnerHTML={{ __html: v.contents }}></p>
                        <p dangerouslySetInnerHTML={{ __html: v.url }}></p>
                    </li>
                )
                )}
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