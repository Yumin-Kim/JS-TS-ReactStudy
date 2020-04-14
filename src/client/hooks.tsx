import * as React from 'react';
import { ClassProps } from './App';

const Hooks = (props:ClassProps) => {
    return (
        <>
            <div>{props.value}</div>
            <div>{props.text}</div>
        </>
    )
}

export default Hooks; 