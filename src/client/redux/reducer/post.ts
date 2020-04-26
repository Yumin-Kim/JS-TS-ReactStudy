import { PostState, CollectPost } from "../IStore";
import { post_add, REQEUST, POST_ADD, SUCCESS, POST_UPDATE, post_update, ADD_POST_ID, POST_DELETE } from "../action/action_post";


const initialState: CollectPost = {
    post: [],
    comment: [],
    updatePost: false,
    updating: false,
    postId: null,
}

export type InitialPostState = PostState[keyof PostState];
//이렇게 data를 한번에 잡아 주면 타입 추론이 안됨
//action의 타입을 각각 지정하는 이유는 data즉 payload타입 추론이 거의 불가능 크게 잡으면 말이 안되딘함
// 각기 다르게 잡아줘야함
//타입 좁히는 방법 모르겠음
interface AddPostAction {
    type: string;
    data: PostState;
}

const postReducer = (state = initialState, action: AddPostAction) => {
    console.log("postReducer")
    switch (action.type) {
        case ADD_POST_ID: {
            return {
                ...state,
                postId: state.post.length + 1,
            }
        }
        case POST_ADD[REQEUST]: {
            return {
                ...state,
                updatePost: true,
            }
        }
        case POST_ADD[SUCCESS]: {
            return {
                ...state,
                post: [...state.post, action.data],
                updatePost: false,
            }
        }
        case POST_UPDATE[REQEUST]: {
            return {
                ...state,
                updating: true
            }
        }
        case POST_UPDATE[SUCCESS]: {
            const postID = state.post.findIndex(v => v.id === (action.data as unknown as PostState).id)
            const selectPost = state.post[postID];
            const post = [...state.post];
            post[postID] = action.data
            return {
                ...state,
                updating: false,
                post
            }
        }
        case POST_DELETE[REQEUST] :{
            return{
                ...state,
            }
        }
        case POST_DELETE[SUCCESS]:{
            const deleteIndex = action.data as unknown as PostState["id"];
            const post = [...state.post];
            post.splice(deleteIndex,1);
            return{
                ...state,
                post
            }
        }
        default:
            return state;
    }
}


export default postReducer;