import * as React from 'react';
import { ClassProps } from './App';

const Hooks = (props:) => {
    return (
        <>
            <div>{props.value}</div>
            <div>{props.text}</div>
        </>
    )
}

export default Hooks; 