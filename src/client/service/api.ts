import "@babel/polyfill";
import  Axios from 'axios';
//언어 카테고리 별로 search하는 api
interface IlanguageParams {
    java:string;
    javascript:string;
    c:string;
    all:string;
}
type Language = keyof IlanguageParams;
export const axiosData = async(language : Language)=>{
    const api = await Axios.get(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    return api.data.items;
} 
// real-world해서 하는 api구현해보기!!
 
