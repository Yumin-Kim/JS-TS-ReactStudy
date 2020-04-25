import * as React from 'react';
import { PureComponent } from 'react';
import { connect } from 'react-redux'
import { InitialState, PostState, CollectPost } from './redux/IStore';
import { Dispatch } from 'redux';
import TodoList from './components/TodoList';

interface PostProps{
    post: CollectPost;    
} 
function dateRerexp(){
    return String(new Date()).match(/[^\s]*/g)!.filter(v=>v !== "");
}

class PostComponent extends PureComponent<PostProps> {

    render() {
        const {post} = this.props.post;
        return (
            <>
                {post.length !== 0 ? 
                <div>
                    <h1>Comment</h1>
                    <ul>
                { post.map((v,id)=><TodoList key={`${v.name}${id}`} {...v} value={dateRerexp()}   />)}
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