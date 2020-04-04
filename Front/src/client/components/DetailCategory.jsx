import React from 'react'
import { connect } from 'react-redux';
import { Descriptions ,Card} from 'antd';
import { LOAD_DETAILCATEGORY_REQUEST } from '../redux/reducer/post';
import styled from 'styled-components';
//카테고리 , 작성자 , 날짜 , image , content,
//post테이블 id로 조회하고 include category image userId >> mainpost똑같음  

const CustomDescriptions = styled(Descriptions)`
font-weight:bolder;
`;
const CustomCard = styled(Card)`
margin-top:20px;
text-align:center;
// text-transform:uppercase;
    & img{
        width:60%;
        margin-bottom:20px;
    }
`;


class DetailCategory extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log("DetailCategory Props", this.props);
    }

    componentDidMount() {
        const { loadDetailCategory } = this.props
        const { clickCategory } = this.props.posts;
        const { detailCategory } = this.props.match.params
        if (clickCategory) {
            console.log('componentDidMount')
            loadDetailCategory(detailCategory);
        }
    }
    render() {
        const { detailContent } = this.props.posts;
        const content = detailContent[detailContent.length - 1];
        // const descriptionArray = Object.keys(content).filter(v=>v.match(/description/));
        console.log()
        return (
            <>
                <h1>
                    DetailCategory
                </h1>
                {detailContent.length !== 0 &&
                    <>
                        <CustomDescriptions bordered={true} title={`게시글 제목 : ${content.title}`}>
                            <Descriptions.Item label="Posting순서" span={10}>: {content.id}번째 </Descriptions.Item>
                            <Descriptions.Item span={10} label="Writer">: {content.User.nickname}</Descriptions.Item>
                            <Descriptions.Item span={10} label="작성 날짜 : ">{`${content.createdAt.match(/\w+((?=\-)|(?=[A-Z]))/g)[0]}년${content.createdAt.match(/\w+((?=\-)|(?=[A-Z]))/g)[1]}월${content.createdAt.match(/\w+((?=\-)|(?=[A-Z]))/g)[2]}일`}</Descriptions.Item>
                            <Descriptions.Item span={10} label="Catgory">: {content.Category.category}</Descriptions.Item>
                        </CustomDescriptions>
                        <div>
                            {Object.keys(content).filter(v=>v.match(/description/)).map((val,idx)=>(
                                <>
                                {content[val]!=="" &&
                                <CustomCard title="Default size card" extra={<a href="#">More</a>} >
                                    {content.Post_images[idx]?<img src={`http://localhost:3000/${content.Post_images[idx].src}`}/>:<p>준비 되어 있지 않습니다</p>}
                                    <Card.Meta title={val} description={content[val]} />
                                </CustomCard>
                                }
                                </>
                            ))}
                        </div>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts
})
const mapDispatchToProps = (dispatch) => ({
    loadDetailCategory: data => dispatch({
        type: LOAD_DETAILCATEGORY_REQUEST,
        data
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailCategory);