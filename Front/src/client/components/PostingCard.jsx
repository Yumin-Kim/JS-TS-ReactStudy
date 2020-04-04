import React, { useCallback } from 'react';
import { Card, Col, Row, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { clickCategoryAction, LOAD_DETAILCATEGORY_REQUEST } from '../redux/reducer/post';
import { useSelector, useDispatch } from 'react-redux'
const { Meta } = Card;

const TextSlice = styled.p`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;


const PostingCard = ({ posting }) => {
    const { clickCategory } = useSelector(state => state.posts);
    const dispatch = useDispatch();

    const onClickDetailCategory = useCallback((index) => () => {
        dispatch(clickCategoryAction(clickCategory))
        dispatch({
            type: LOAD_DETAILCATEGORY_REQUEST,
            data: index
        })
    })
    return (
        <Col span={8} xs={24} sm={24} md={8} style={{ marginBottom: '20px', paddingLeft: '10px' }}>
            <Link to={`/category/${posting.CategoryId}/${posting.id}`} onClick={onClickDetailCategory(posting.id)} >
                <Card
                    cover={
                        <img
                            alt=""
                            src={posting.Post_images[0] && `http://localhost:3000/${posting.Post_images[0].src}`}
                        />
                    }
                    actions={[
                        <Icon type="setting" key="setting" />,
                        <Icon type="edit" key="edit" />,
                        <Icon type="ellipsis" key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar>{posting.User.nickname[0]}</Avatar>}
                        title={posting.title}
                        description={posting.User.nickname}
                    />
                    <TextSlice style={{ marginTop: '10px' }}>{posting.description1}</TextSlice>
                    <Link to={`/category/${posting.CategoryId}`}>{posting.Category.category}</Link>
                </Card>

            </Link>
        </Col>
    );
}

export default PostingCard;