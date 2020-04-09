import React, { Component } from 'react'
import Draggable from '../components/Draggable';

class MarkUp extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
            <div>Hello!!!!!!!!!</div>
            < Draggable initialPos={{x:100 , y:200}} />
            </>
        );
    }

}

export default MarkUp;