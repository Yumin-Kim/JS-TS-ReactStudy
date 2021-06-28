import { SearchAction } from '../action/action_search';
import { KakaoAxiosData,ISearchReduxState } from '../IStore';

const initialState: ISearchReduxState = {
    searchs: []
}

type SearchActions = SearchAction;
//redux saga를 통해 온 데이터 타이핑이없어서 많이 곤란함
const searchReducer = (state = initialState, action: SearchActions) => {
    switch (action.type) {
        case "SEARCH_DATA_REQUEST": {
            return {
                ...state,
            }
        }
        case "SEARCH_DATA_SUCCESS": {
            return {
                ...state,
                searchs: (action.data  as unknown as KakaoAxiosData ).data.documents
            }
        }
        case "SEARCH_DATA_FAILURE": {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}

export default searchReducer;