const initalState = {
    mainPostings: [],
    LatestPostings: [],
    categoryPostings: [],
    memoPosts: [],
    categoryPosts: [],
    imagesPath: [],
    detailContent: [],
    isDetailContent: false,
    clickCategory: true,
}
//main postsing function  
export const WRITE_POSTING_REQUEST = "WRITE_POSTING_REQUEST";
export const WRITE_POSTING_SUCCESS = "WRITE_POSTING_SUCCESS";
export const WRITE_POSTING_FAILURE = "WRITE_POSTING_FAILURE";

export const LOAD_POSTING_REQUEST = "LOAD_POSTING_REQUEST";
export const LOAD_POSTING_SUCCESS = "LOAD_POSTING_SUCCESS";
export const LOAD_POSTING_FAILURE = "LOAD_POSTING_FAILURE";



export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

//Load category
export const LOAD_CATEGORY_REQUEST = "LOAD_CATEGORY_REQUEST";
export const LOAD_CATEGORY_SUCCESS = "LOAD_CATEGORY_SUCCESS";
export const LOAD_CATEGORY_FAILURE = "LOAD_CATEGORY_FAILURE";

export const LOAD_DETAILCATEGORY_REQUEST = "LOAD_DETAILCATEGORY_REQUEST";
export const LOAD_DETAILCATEGORY_SUCCESS = "LOAD_DETAILCATEGORY_SUCCESS";
export const LOAD_DETAILCATEGORY_FAILURE = "LOAD_DETAILCATEGORY_FAILURE";

//componentDidupdata 일때 실행 X componenetDidUpdate만 실행되게 하는 state
export const CLICK_CATEGORY = "CLICK_CATEGORY";

export const clickCategoryAction = (data) => {
    return {
        type: CLICK_CATEGORY,
        data,
    }
}

const postsReducer = (state = initalState, action) => {
    switch (action.type) {
        case WRITE_POSTING_REQUEST:
            return {
                ...state,
            }
        case WRITE_POSTING_SUCCESS:
            return {
                ...state,
            }
        case WRITE_POSTING_FAILURE:
            return {
                ...state,
            }
        case LOAD_POSTING_REQUEST:
            return {
                ...state,
            }
        case LOAD_POSTING_SUCCESS:
            console.log("server Side rendering  LOAD_POSTING_SUCCESS")
            return {
                ...state,
                mainPostings: action.data.mainPostings,
                categoryPosts: action.data.categoryPosts,
                imagesPath: [],
            }
        case LOAD_POSTING_FAILURE:
            return {
                ...state,
            }
        case LOAD_CATEGORY_REQUEST:
            return {
                ...state,
            }
        case LOAD_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryPostings: [...action.data]
            }
        case LOAD_CATEGORY_FAILURE:
            return {
                ...state,
            }
        case UPLOAD_IMAGES_REQUEST:
            return {
                ...state,
            }
        case UPLOAD_IMAGES_SUCCESS:
            return {
                ...state,
                imagesPath: action.data,
            }
        case UPLOAD_IMAGES_FAILURE:
            return {
                ...state,
            }
        case UPLOAD_IMAGES_REQUEST:
            return {
                ...state,
            }
        case UPLOAD_IMAGES_SUCCESS:
            return {
                ...state,
                imagesPath: action.data,
            }
        case UPLOAD_IMAGES_FAILURE:
            return {
                ...state,
            }
        case LOAD_DETAILCATEGORY_REQUEST:
            return {
                ...state,
            }
        case LOAD_DETAILCATEGORY_SUCCESS:
            return {
                ...state,
                detailContent: [...state.detailContent, action.data]
            }
        case LOAD_DETAILCATEGORY_FAILURE:
            return {
                ...state,
            }
        case CLICK_CATEGORY:
            return {
                ...state,
                clickCategory: false,
            }
        default:
            return state;
    }

}

export default postsReducer;