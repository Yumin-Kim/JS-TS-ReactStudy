import * as React from 'react';
import { ClassProps } from './App';

class Class extends React.Component<ClassProps,{}>{
    constructor(props){
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