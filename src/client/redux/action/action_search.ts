import Axios from "axios";
import { call , put } from 'redux-saga/effects';
//action name
export const SEARCH_DATA = "SEARCH_DATA" as const;
const SEARCH = {
    REQUEST: "SEARCH_DATA_REQUEST",
    SUCCESS: "SEARCH_DATA_SUCCESS",
    FAILURE: "SEARCH_DATA_FAILURE",
} as const;

//action type
// APIfunction type
type APIEndPoint<P extends any[], R> = (...args: P) => Promise<R>;
interface IEntity<R, S, F> {
    REQUEST: R;
    SUCCESS: S;
    FAILURE: F;

}

//api
//axios도 여기다가 선언?? zerocho는 일단 
const fetchSearchData = async (query: string) => {
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

//Assign action type and data >> accumulating action(request , success , failure)
//DATA generic 명백하게 지정 할 수도 있음 
const createEntity = <R, S, F, DATA extends any[], PARAM>(
    entity: IEntity<R, S, F>,
    api: APIEndPoint<DATA, PARAM>) => ({
        ACTION: {
            REQUEST: () => ({ type: entity.REQUEST }),
            SUCCESS: (data: DATA) => ({ type: entity.SUCCESS, data }),
            FAILURE: () => ({ type: entity.FAILURE })
        },
        API: api
    });

interface IEntityAction {
    ACTION: {
        REQUEST: (...p: any[]) => any;
        SUCCESS: (...p: any[]) => any;
        FAILURE: (...p: any[]) => any;
        [key: string]: (...p: any[]) => any;
    },
    API: APIEndPoint<any, any>;
};

type EntityAction< T extends IEntityAction > = ReturnType<T["ACTION"][keyof T["ACTION"]]>;


//action!!
export const search_data = (query: string) => ({ type: SEARCH_DATA, data: { query } });
export type Search_data = ReturnType<typeof search_data>;
export const searchEntity = createEntity(SEARCH,fetchSearchData);

//action type!! reducer >> (state , action : SearchAction 하면돰!!)
type SearchAction = EntityAction<typeof searchEntity>;

export function fetchEntity<T extends IEntityAction>({ACTION ,API} : T){
    return function* (...p : Parameters<T["API"]>){
        try{
            yield put(ACTION.REQUEST());
            const data = yield call(API,...p);
            yield put(ACTION.SUCCESS(data));
        }catch(error){
            yield put(ACTION.FAILURE());
        }
    }
}







