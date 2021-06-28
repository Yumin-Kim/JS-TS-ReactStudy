import React from 'react'
import Styled from 'styled-components';

const DragDib = Styled.div`
    cursor : pointer;
    width:200px;
    height:200px;
    background:#cca;
    position:absolute;
    padding:10px;
`;

class Draggable extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.initialPos)
        this.state = {
            pos:this.props.initialPos,
            dragging:false,
            rel:null
        }
    }

    componentDidUpdate(props,state){
        console.log("componentDidUpdate");
        if(this.state.dragging &&  !state.dragging){
            document.addEventListener("mousemove",this.onMouseMoveEvent);
            document.addEventListener("mouseup",this.onMouseUpEvent)
        }else if(!this.state.dragging && state.dragging){
            document.addEventListener("mousemove",this.onMouseMoveEvent);
            document.addEventListener("mouseup",this.onMouseUpEvent)
        }
    }
    onMouseMoveEvent = (e) => {
        if(!this.state.dragging) return;
        console.log("onMouseMoveEvent")
        console.log(e.pageX , Number(this.state.rel.x))
        this.setState({
            pos:{
                x:e.pageX - this.state.rel.x,
                y:e.pageY - this.state.rel.y,
            }
        })
    }
    onMouseUpEvent = (e) => {
        console.log("onMouseUpEvent")
        this.setState({dragging:false});
        e.stopPropagation();
        e.preventDefault();
    }
    onMouseDownEvent = (e) =>{
        console.log("onMouseDownEvent")
        if(e.button !== 0) return
        console.log(e.pageX,this.state.pos.left)
        this.setState({
            dragging:true,
            rel:{
                x:e.pageX - this.state.pos.x,
                y:e.pageY - this.state.pos.y
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }
  
    render(){
        return(
            <>
            <DragDib style={{left:this.state.pos.x +'px' ,right:this.state.pos.y +'px' }} onMouseDown={this.onMouseDownEvent} >Hello!</DragDib>
            </>
        )
    }
}

export default Draggable;