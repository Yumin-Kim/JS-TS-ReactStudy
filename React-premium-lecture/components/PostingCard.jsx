import React from 'react';
import { Card, Col, Row, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;



const PostingCard = ( {posting}) => {

    return(
      <Col span={8} xs={24} sm={12} md={8} style={{ marginBottom: '20px',paddingLeft:'20px' }}>
      <Card
          
          cover={
              <img
                  alt=""
                  src={posting.imgPath}
              />
          }
          actions={[
              <Icon type="setting" key="setting" />,
              <Icon type="edit" key="edit" />,
              <Icon type="ellipsis" key="ellipsis" />,
          ]}
      >
          <Meta
              avatar={<Avatar src={posting.avatarpath} />}
              title={posting.title}
              description={posting.writer}
          />
      <p style={{marginTop:'10px'}}>{posting.description}</p>
        <Link to={`/category/${posting.id}`}>{posting.category}</Link>
      </Card>
  </Col>
    );
}

export default PostingCard;