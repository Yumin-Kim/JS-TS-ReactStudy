import User from '../models/user';
//확장 >> 우선순위 체크 >> 덮어 쓰기(마지막 단계에서)
//덮어쓰기
declare module "express-serve-static-core"{
    interface Request{
        user?:User
    }
}
//확장!!
// declare global {
//     namespace Express{
//         interface Request{
//             user?:User
//         }
//     }
// }

