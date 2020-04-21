import * as React from 'react';
import { ClassProps } from './typedefine/type_props_state';

class Class extends React.Component<ClassProps,{}>{
    constructor(props : ClassProps){
        super(props);
    }
    render(){
        const {value,text} = this.props;
        return(
            <>
            <div>{value}</div>
            <div>{text}</div>
            </>
        )
    }

}


export default Class;