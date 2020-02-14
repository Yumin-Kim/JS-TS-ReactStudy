import {put, all, fork,takeLatest,delay,call,throttle } from 'redux-saga/effects';
import { 
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE ,
  ADD_COMMENT_FAILURE,ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS, 
  LOAD_MAIN_POSTS_SUCCESS, LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_FAILURE, 
  LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE, 
  LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_FAILURE, LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST, 
  UNLIKE_POST_FAILURE,UNLIKE_POST_SUCCESS,UNLIKE_POST_REQUEST,LIKE_POST_REQUEST,LIKE_POST_FAILURE,LIKE_POST_SUCCESS, RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
} from '../Reducer/post';
import axios from 'axios';

function addPostAPI (postData) {
  return axios.post('http://localhost:3065/api/post',postData,{
    withCredentials:true,
  })
}

function* appPost(action){
  try{
    const result = yield call(addPostAPI,action.data)
    yield put({
      type:ADD_POST_SUCCESS,
      data:result.data,
    })
  }catch(e){
    yield put({
      type:ADD_POST_FAILURE,
      error:e
    })
  }
}

function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST,appPost);
}
function loadMainPostsAPI (lastId = 0,limit = 10) {
  return axios.get(`http://localhost:3065/api/posts?lastId=${lastId}&limit=${limit}`)

}

function* loadMainPosts(action){
  try{
    const result = yield call(loadMainPostsAPI,action.lastId);
    yield put({
      type:LOAD_MAIN_POSTS_SUCCESS,
      data: result.data
    })
  }catch(e){
    yield put({
      type:LOAD_MAIN_POSTS_FAILURE,
      error:e
    })
  }
}

function* watchMainLoadPosts(){
  yield throttle(2000,LOAD_MAIN_POSTS_REQUEST,loadMainPosts);
}
function loadUserPostsAPI (id) {
  return axios.get(`http://localhost:3065/api/user/${id}/posts`)

}

function* loadUserPosts(action){
  try{
    const result = yield call(loadUserPostsAPI,action.data);
    yield put({
      type:LOAD_USER_POSTS_SUCCESS,
      data: result.data
    })
  }catch(e){
    yield put({
      type:LOAD_USER_POSTS_FAILURE,
      error:e
    })
  }
}

function* watchLoadUserPosts(){
  yield takeLatest(LOAD_USER_POSTS_REQUEST,loadUserPosts);
}
function loadHashtagPostsAPI (tag,lastId) {
  return axios.get(`http://localhost:3065/api/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=10`)

}

function* loadHashtagPosts(action){
  try{
    const result = yield call(loadHashtagPostsAPI,action.data,action.lastId);
    yield put({
      type:LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    })
  }catch(e){
    yield put({
      type:LOAD_HASHTAG_POSTS_FAILURE,
      error:e
    })
  }
}

function* watchLoadHashtagPosts(){
  yield throttle(2000,LOAD_HASHTAG_POSTS_REQUEST,loadHashtagPosts);
}

function addCommentAPI(data) {
  return axios.post(`http://localhost:3065/api/posts/${data.postId}/comment`, { content: data.content }, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadCommentsAPI(postId) {
  return axios.get(`http://localhost:3065/api/posts/${postId}/comments`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data,
        comments: result.data,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}
function uploadImagesAPI(formData) {
  return axios.post(`http://localhost:3065/api/post/images`,formData,{
    withCredentials:true
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function likePostAPI(postId) {
  return axios.post(`http://localhost:3065/api/post/${postId}/like`,{},{
    withCredentials:true
  });
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        postId:action.data,
        userId:result.data.userId
      }
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LIKE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function unlikePostAPI(postId) {
  return axios.delete(`http://localhost:3065/api/post/${postId}/unlike`,{
    withCredentials:true
  });
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: {
        postId:action.data,
        userId:result.data.userId
      }
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function retweetAPI(postId) {
  return axios.post(`http://localhost:3065/api/post/${postId}/retweet`,{},{
    withCredentials:true
  });
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data:result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: RETWEET_FAILURE,
      error: e,
    });
    alert(e.response && e.response.data);
  }
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}
function removePostAPI(postId) {
  console.log(postId)
  return axios.delete(`http://localhost:3065/api/post/${postId}`,{
    withCredentials:true
  });
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data:result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function loadPostAPI(postId) {
  console.log(postId)
  return axios.get(`http://localhost:3065/api/post/${postId}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data:result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_POST_FAILURE,
      error: e,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

export default function* userSaga(){
    yield all([
      fork(watchAddPost),
      fork(watchAddComment),
      fork(watchLoadComments),
      fork(watchMainLoadPosts),
      fork(watchLoadHashtagPosts),
      fork(watchLoadUserPosts),
      fork(watchUploadImages),
      fork(watchLikePost),
      fork(watchUnlikePost),
      fork(watchRetweet),
      fork(watchRemovePost),
      fork(watchLoadPost),
    ]);
}