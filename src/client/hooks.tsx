import * as React from 'react';
import { HooksProps } from './typedefine/type_props_state';

const Hooks = (props : HooksProps) => {
    return (
        <>
            <div>{props.value}</div>
            <div>{props.text}</div>
        </>
    )
}

export default Hooks; 