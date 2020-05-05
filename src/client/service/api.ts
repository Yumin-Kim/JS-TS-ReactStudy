import "@babel/polyfill";
import Axios from 'axios';

// 1-2 redux 따라 만들면서 타입 스크립트 익숙해 지기!! 넘 어려움
//1-3 high order function 공부 하기!! 자꾸 해보면서 익숙해지기!!
// 1 - 4 redux 해결후
// 2. axios이용하여 data 받기 연습!!타이핑도
//언어 카테고리 별로 params하는 api
interface IlanguageParams {
    java: string;
    javascript: string;
    c: string;
    all: string;
}


export interface IgithubFetchDataType {
    //Fetch Data형 지정하는데 쓸건만 작성!!
    name: string;
    homePage: string;
    clone_url: string;
    url: string;
}

type Undefined<T> = {
    [P in keyof T]?: T[P];
}
type Nullable<T> = { [P in keyof T]: T[P] | null }
export type UndefinedDataType = Undefined<IgithubFetchDataType>;
type UndefinedDataType_1 = Nullable<IgithubFetchDataType>;

type Language = keyof IlanguageParams;

interface category_Obj {
    technology: "technology",
    business: "business",
    entertainment: 'entertainment',
    health: "health",
    science: "science",
    sports: "sports"
    headLine:null
};

export  type CategoryType = keyof category_Obj;

export const axiosData = async (language: Language): Promise<UndefinedDataType[]> => {
    const api = await Axios.get(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    return api.data.items;
}
// real-world해서 하는 api구현해보기!!

//api >> Search Api 
export const fetchSearchData = async (query: string) => {
    const searchData = encodeURI(query);
    console.log(query)
    return await Axios.get(`https://dapi.kakao.com/v2/search/cafe?query=${searchData}sort=accuracy&page=1&size=50`,
        {
            headers:
            {
                Authorization: "KakaoAK 63fdc122d9df23339113f6a040a02afd"
            }
        })
}
//newsAPI >> API에 redux saga를 추가하는 이유는 api 요청하는 동안 다른 데이터변회을 위해서
export const fetchNewsData = async (category: CategoryType) => {
    return await Axios.get(`http://newsapi.org/v2/top-headlines?country=kr${category !== "headLine" ? `&category=${category}` : '' }&apiKey=bde26f5d5c254b03928f44cbe1ec7c67`)
    // return await Axios.get("http://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=bde26f5d5c254b03928f44cbe1ec7c67")
}

