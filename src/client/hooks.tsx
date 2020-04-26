import * as React from 'react';
import { HooksProps } from './models/type_props_state';

const Hooks = (props : HooksProps) => {
    return (
        <>
            <div>{props.value}</div>
            <div>{props.text}</div>
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