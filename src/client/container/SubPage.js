import React from 'react'

class SubPage extends React.Component{
    constructor(props){
        super(props)
        let title;
        if(!__isServer__){
            console.log("Render")
            console.log(window.__INITIAL_STATE__ )
            title = window.__INITIAL_STATE__.number;
        }
        this.state = {
            title,
            num :1 
        }
    }
    render(){
        console.log(this.state.title)
        return(
            <>{this.state.title}////
            {this.state.num}
                <div>Hello Component</div> 
            </>
        )
    }
}

export default SubPage;