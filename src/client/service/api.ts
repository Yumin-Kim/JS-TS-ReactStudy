import "@babel/polyfill";
import Axios from 'axios';
// 1 . declare module namespace 공부 중 
//declare 타입이 없을때 정의 하는것으로 사용함
//stack overflow 에서 찾은정보
//webpack Hot Middleware를 타입스크립트를 붙여서 사용중인데 
//module.hot이라는 메소드 활용하였지만 property에서 hot does not exist에러 발생
//하지만 실행되었다는 것을 개발자는 알고 있다 이문제를 해결하기 위해서는  declare let module :any 선언이 필요하다
//
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
    [P in keyof T]?: T[P] | null;
}
type Nullable<T> = { [P in keyof T]: T[P] | null }
type UndefinedDataType = Undefined<IgithubFetchDataType>;
type UndefinedDataType_1 = Nullable<IgithubFetchDataType>;

type Language = keyof IlanguageParams;

export const axiosData = async (language: Language): Promise<UndefinedDataType[]> => {
    const api = await Axios.get(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    return api.data.items;
}
// real-world해서 하는 api구현해보기!!

