import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { InitialState, PostState, CollectPost } from './typedefine/type_props_state';
import { Dispatch } from 'redux';

interface PostProps{
    post: CollectPost;    
} 


class PostComponent extends Component<PostProps> {

    render() {
        const {post} = this.props.post;
        return (
            <>
                {post.length !== 0 ? 
                <div>
                    <h1>Comment</h1>
                    <ul>
                {post.map((v,id)=><li key={`${v.name}${id}`} >작성자 : {v.name} 글 : {v.todo} 간단한 글 : {v.text}</li>)}
                    </ul>
                </div> :<h1>No comment</h1>}
            </>
        );
    }

}

const mapToState = (state: InitialState) => ({
    post:state.post
});

const mapToDispatch = (dispatch :Dispatch ) => ({
})

export default connect(mapToState, mapToDispatch)(PostComponent);