import React, { useCallback, useState ,useEffect, useRef } from 'react';
import { Form, Input, Button, } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../Reducer/post';

const PostForm = () => {
    const [ text , setText ] = useState('');
    const dispatch = useDispatch();
    const {imagePaths,isAddingPost,postAdded} = useSelector(state=>state.post)
    const imageInput = useRef();

    useEffect(()=>{
        setText('');
    },[postAdded])
    
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if(!text){
            return alert("작성해!!")
        }
        const formData = new FormData();
        imagePaths.forEach((i)=>{
            formData.append('image',i);
        })
        formData.append('content',text);
        dispatch({
            type:ADD_POST_REQUEST,
            data:formData,
        })
    },[text,imagePaths])

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    },[text]);

    const onChangeImages = useCallback((e)=>{
        console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files,(f)=>{
            imageFormData.append('image',f);
        })
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data:imageFormData,
        })
    })
    
    const onClickImageUpload =useCallback(() =>{
        console.log(imageInput)
        imageInput.current.click();
    },[ imageInput.current ]);

    const onClickRemoveImage = useCallback(index => () => {
        dispatch({
            type: REMOVE_IMAGE,
            index,
        })
    },[]);

    return (
        <Form encType="multipart/form-data" onSubmit = {onSubmitForm} >
            <Input.TextArea value={text} onChange={onChangeText}  maxLength={140} placeholder="어떤 신기한 일이 있었나여"></Input.TextArea>
            <div>
                <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
                <Button onClick={onClickImageUpload} >이미지 업로드</Button>
                <Button type="primary" style={{ float: "right" }} htmlType="submit" loading={isAddingPost} >짹짹</Button>
                <div>
                    {imagePaths.map((val, idx) => {
                        return (
                            <div key={idx} style={{ display: 'inline-block' }} >
                                <img src={`http://localhost:3065/${val}`} style={{ width: '200px' }} alt={idx} />
                                <div>
                                    <Button onClick={onClickRemoveImage(idx)}>제거</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Form>
    );
}

export default PostForm;