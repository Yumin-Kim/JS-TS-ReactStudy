import React from 'react'
import { connect } from 'react-redux';
import { LOAD_CATEGORY_REQUEST } from '../redux/reducer/post';
import PostingCard from './PostingCard';
// 불편한점이 pathname이 number라는점
//:id의 값으로 redux를 이용하여 
// post 테이블에 categoryId를 충족하는 값들을 가지고 와서 postingcard 사용
//세부 카테고리는 queryString 사용
// const Category = ({match}) => {
//     console.log('match.params.id',match.params.id);
//     return(
//         <h1>category</h1>
//     );
// }
//새로고침일때는Did 필요없고 페이지넘길때는update 필요 >> 새로고침이 아닐때 실행
//새로고침할때만 되고 
class Category extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { loadCategory, match,posts } = this.props;
        if(posts.categoryPostings.length ===0){
            console.log('Category componentDidMount');
            loadCategory(match.params.id);
        }
    }
    render() {
        const { params } = this.props.match;
        const { categoryPostings } = this.props.posts
        return (
            <>
            <h1>
                Category : {categoryPostings.length !== 0 ? categoryPostings[0].Category.category : "준비중입니다" }
            </h1>
            {categoryPostings && categoryPostings.map((val,index)=>(
                <PostingCard posting={val} />
            ))  } 
            </>
        );
    }
}

const mapStateToProps = (data) => {
    return {
        posts: data.posts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadCategory: (data) => dispatch({ type: LOAD_CATEGORY_REQUEST, data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
