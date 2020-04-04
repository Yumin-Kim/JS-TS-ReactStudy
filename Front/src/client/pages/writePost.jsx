import React, { useRef,useCallback } from 'react'
import { Form, Input, Button, Col, Typography } from 'antd'
import { inputHooks } from '../container/SignModal';
import { useDispatch ,useSelector } from 'react-redux';
import { WRITE_POSTING_REQUEST, UPLOAD_IMAGES_REQUEST } from '../redux/reducer/post';
import styled from 'styled-components';
// 글작성 줄바꿈이 사라짐
const DisplayButton = styled(Button)`
    display:block;
    margin-bottom:20px;
`

const ImageBox = styled.div`
    display: inline-block; 
     margin-bottom:20px;
     & img{
         width:200px;
     }
`

//로그인 안되있으면 접근 방지
//공백이 없는 지 체크 만약 있다면 경고창
//

const Writepost = () => {

    const [title, onChangeTitle] = inputHooks('');
    const [category, onChangeCategory] = inputHooks('');
    const [content1, onChangeContent1] = inputHooks('');
    const [content2, onChangeContent2] = inputHooks('');
    const [content3, onChangeContent3] = inputHooks('');
    const inputRef = useRef(null);

    const dispatch = useDispatch();
    const { imagesPath } = useSelector(state=>state.posts);
    // useEffect(()=>{
    //     if()
    // },[])

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        console.log(imagesPath)
        if(imagesPath.length === 0){
            return alert("최소 이미지는 한장을 추가하셔야합니다");
        }
        dispatch({
            type: WRITE_POSTING_REQUEST,
            data: {
                title,
                category,
                description1: content1,
                description2: content2,
                description3: content3,
                imagesPath
            }
        })
    }, [title, category, content1, content2, content3,imagesPath])

    const onClickImageUpload = useCallback(() => {
        inputRef.current.click();
    },[inputRef.current])

    const onChangeImage =(e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files,(f)=>{
            imageFormData.append('image',f);
        })
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data:imageFormData,
        })
    }
    return (
        <>
            <Form encType="multipart/form-data" onSubmit={onSubmitForm}>
                <Typography.Title>글쓰기</Typography.Title>
                <Form.Item label="title" >
                    <Input
                        placeholder="title"
                        value={title}
                        onChange={onChangeTitle}
                        style={{ width: '200px' }}
                        required
                    />
                </Form.Item>
                <Form.Item label="category" >
                    <Input
                        value={category}
                        onChange={onChangeCategory}
                        placeholder="category"
                        style={{ width: '200px' }}
                        required
                    />
                </Form.Item>
                <Form.Item label="Contents1" >
                    <Input.TextArea
                        value={content1}
                        onChange={onChangeContent1}
                        style={{ width: '80%' }}
                        placeholder="Contents1"
                        required
                    />
                </Form.Item>
                <Form.Item label="Contents2" >
                    <Input.TextArea
                        value={content2}
                        onChange={onChangeContent2}
                        style={{ width: '80%' }}
                        placeholder="Contents2"
                    />
                </Form.Item>
                <Form.Item label="Contents3" >
                    <Input.TextArea
                        value={content3}
                        onChange={onChangeContent3}
                        style={{ width: '80%' }}
                        placeholder="Contents3"
                    />
                </Form.Item>
                <input type="file" multiple hidden ref = {inputRef} onChange={onChangeImage} />
                <DisplayButton onClick={onClickImageUpload} >이미지 업로드</DisplayButton>
                {imagesPath &&<ImageBox>
                    {imagesPath.map(v=>
                        <img key={v} src={`http://localhost:3000/${v}`} alt={v} />
                    )}
                </ImageBox>}
                <Col md={24} >
                    <Button type="primary" htmlType="submit">포스팅</Button>
                </Col>
            </Form>
        </>
    )
}


export default Writepost;