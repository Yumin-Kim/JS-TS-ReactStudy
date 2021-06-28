
import Axios from "axios";
import { LOG_IN_FAILURE } from "./action";
import { axiosData } from "../../service/api";
import { put, call ,take } from 'redux-saga/effects';

interface LoginResponse {
    username: string;
    password: string;
    email: string;
}

//sync
//as const를 함으로써 string 보다 디테이한 타입 지정을 할 수 있다
const INCREASE = "INCREASE" as const;
const DECREASE = "DECREASE" as const;
//async
const ASYNC_REQUEST = "ASYNC_REQUEST" as const;
const ASYNC_SUCCESS = "ASYNC_SUCCESS" as const;
const ASYNC_FAILURE = "ASYNC_FAILURE" as const;

const createAsyncACtions = <R, S, F>(request: R, success: S, failure: F) => <RP, SP, FP>() => ({
    request: (data: RP) => ({ type: request, data }),
    success: (data: SP) => ({ type: success, data }),
    failure: (data: FP) => ({ type: failure, data })
})
const asyncActions = createAsyncACtions(
    ASYNC_REQUEST,
    ASYNC_SUCCESS,
    ASYNC_FAILURE
)<{ user: string }, { users: number }, { erorr: Error }>(); // < Parama , Res , Error >

type ActionType<T extends { [K in keyof T]: (...arg: any[]) => any }> = ReturnType<T[keyof T]>

type Actions = ActionType<typeof asyncActions>;

//Redux 문서!!
interface IcreaseAcionType {
    type: typeof INCREASE;
    data: number;
}

const LOGIN_REQUEST = "LOGIN_REQUEST" as const;
const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;
const LOGIN_FAILURE = "LOGIN_FAILURE" as const;

type ApiCall<T extends any[], R> = (...arg: T) => Promise<R>

//Axios 메소드 사용시 <any:타이핑 필요!! >
const login = async (form: { username: string; password: string }) => await Axios.post<{ data: LoginResponse }>("url", form);

const createApiActions = <R, S, F>(request: R, success: S, failure: F) => <P extends any[], R>(api: ApiCall<P, R>) => ({
    request: (...args: P) => ({ type: request, data: args }),
    success: (data: R) => ({ type: success, data }),
    failure: (error: Error) => ({ type: success, error }),
});

// const loginActions = createApiActions(
//     LOGIN_REQUEST,
//     LOGIN_SUCCESS,
//     LOG_IN_FAILURE
// )();

////////////////////////////////////////////////////////////////////////////////
//되도록이면 제너릭 사용하지 않고 사용자의 자유가 주어진 데이터에는 제너릭사용
//api 호출의 타이핑을 담당!!
const GET_USER = "GET_USER" as const;
const USER = {
    REQUEST: "GET_USER_REQUEST",
    SUCCESS: "GET_USER_SUCCESS",
    FAILURE: "GET_USER_FAILURE",
} as const;

type ApiEndpoint<P extends any[], R> = (...args: P) => Promise<R>;
//api 호출
const fetchUserAPI = async (user: number) => (await Axios.get(`/user/${user}`)).data

const getUser = (userId: number) => ({ type: GET_USER, data: { userId } });
type GetUser = ReturnType<typeof getUser>;

interface IEntity<R, S, F> {
    REQUEST: R;
    SUCCESS: S;
    FAILURE: F;
}

const createEntityAction = <R, S, F, DATA extends any[], PARAM>(
    entitiy: IEntity<R, S, F>,
    api: ApiEndpoint<DATA, PARAM>
) => ({
    ACTION: {
        REQUEST: () => ({ type: entitiy.REQUEST }),
        SUCCESS: (data: DATA) => ({ type: entitiy.SUCCESS, payload: data }),
        FAILURE: () => ({ type: entitiy.FAILURE })
    },
    API: api
})

interface IEntityAction {
    ACTION: {
        REQUEST: (...p: any[]) => any;
        SUCCESS: (...p: any[]) => any;
        FAILURE: (...p: any[]) => any;
        [key: string]: (...p: any[]) => any;
    },
    API: ApiEndpoint<any, any>;
}

type EntityAction<T extends IEntityAction> = ReturnType<T['ACTION'][keyof T['ACTION']]>;

const userEntity = createEntityAction(USER, fetchUserAPI);
type UserEntity = EntityAction<typeof userEntity>; //reducer에 사용

function fetchEntity<T extends IEntityAction>({ ACTION, API }: T) {
    return function* (...p: Parameters<T["API"]>) {
        try {
            yield put(ACTION.REQUEST());
            const data = yield call(API, ...p);
            yield put(ACTION.SUCCESS(data));
        } catch (error) {
            yield put(ACTION.FAILURE(error));
        }
    }
}

//saga code
const getUserSaga = fetchEntity(userEntity);
function* getUserWatcher() {
    const { data: { userId } } : GetUser = yield take(GET_USER);
    yield call(getUserSaga,userId);
}









