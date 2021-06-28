import { Interface } from "readline";
import module from "./typescriptModule";
console.log(`Moudule export default >>`, module);

interface I_Object {
    name: string;
    age: number;
}

const BGroup: Array<I_Object> = [
    {
            name: "asd",
            age: 123
    },
    {
            name: "asd",
            age: 123
    }
];
export interface AddParam{
    First_num : number;
    End_num : number;
    callback : (First_num:number,End_num:number)=>number;
}
export function addCallBackFunc ({First_num,End_num,callback}:AddParam):number{
    console.log(`${First_num}부터 ${End_num}까지 더하는함수 호출 합니다`);
    return callback(First_num,End_num);
}
export const chapter = Date();
export const chapter_1 = Date();
