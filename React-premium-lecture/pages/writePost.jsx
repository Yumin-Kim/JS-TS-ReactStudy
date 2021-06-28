import React from 'react'
import { Form, Input, Button, Col, Typography } from 'antd'
const { TextArea } = Input;

const { Title } = Typography;

const Writepost = () => {
    return (
        <>
            <Form encType="multipart/form-data">
                <Title>글쓰기</Title>
                <Form.Item label="title" >
                    <Input
                        placeholder="title"
                        style={{ width: '200px' }}
                    />
                </Form.Item>
                <Form.Item label="category" >
                    <Input
                        placeholder="category"
                        style={{ width: '200px' }}
                    />
                </Form.Item>
                <Form.Item label="Contents1" >
                    <TextArea
                        style={{ width: '80%' }}
                        placeholder="Contents1"
                    />
                    <input type="file" multiple hidden />
                </Form.Item>
                <Button>이미지 업로드</Button>
                <div style={{ display: 'inline-block' }}>
                    <img style={{ width: '200px' }} src="https://i.pinimg.com/564x/e0/e4/3b/e0e43b2dec4aae42b3b3ab6cb3536bd1.jpg" alt="더미이미지" />
                </div>
                <Form.Item label="Contents2" >
                    <TextArea
                        style={{ width: '80%' }}
                        placeholder="Contents2"
                    />
                </Form.Item>
                <Button>이미지 업로드</Button>
                <div style={{ display: 'inline-block' }}>
                    <img style={{ width: '200px' }} src="https://i.pinimg.com/564x/e0/e4/3b/e0e43b2dec4aae42b3b3ab6cb3536bd1.jpg" alt="더미이미지" />
                </div>
                <Form.Item label="Contents3" >
                    <TextArea
                        style={{ width: '80%' }}
                        placeholder="Contents3"
                    />
                </Form.Item>
                <Button>이미지 업로드</Button>
                <div style={{ display: 'inline-block' }}>
                    <img style={{ width: '200px' }} src="https://i.pinimg.com/564x/e0/e4/3b/e0e43b2dec4aae42b3b3ab6cb3536bd1.jpg" alt="더미이미지" />
                </div>
                <Col md={24} >
                    <Button type="primary">포스팅</Button>
                </Col>
            </Form>
            <div>

            </div>
        </>
    )
}


export default Writepost;