import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { InitialState, PostState } from './typedefine/type_props_state';
import { Dispatch } from 'redux';

interface PostProps{
    post:Array<PostState>;    
} 


class PostComponent extends Component<PostProps> {

    render() {
        const {post} = this.props;
        console.log("PostComponent post State",post);
        return (
            <>
                {post.length !== 0 ? <h1>Comment</h1> :<h1>No comment</h1>}
            </>
        );
    }

}

const mapToState = (state: InitialState) => ({
    post:state.post
});

const mapToDispatch = (dispatch :Dispatch ) => {
    console.log(dispatch);
}

export default connect(mapToState, mapToDispatch)(PostComponent);