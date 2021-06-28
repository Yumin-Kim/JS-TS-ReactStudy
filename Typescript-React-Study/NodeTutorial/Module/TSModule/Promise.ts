import  {EventEmitter} from "events";
import * as process from "process";
import * as fs from "fs";
import * as path from "path";

const ReadTxtPath = path.resolve(__dirname,"./Read.txt"); 
const myCustomEvnet = new EventEmitter();
export const onCustomFunc = myCustomEvnet.on("AddFunc",(text:string)=>console.log(text,"AddFuncCustomEvent"));

export const   fsReadFile  =  fs.promises.readFile(ReadTxtPath,"utf8")
    .then((data)=>{
        console.log(data)
        return "Success Read File"
    })
    .catch(error=>console.error(error));

export const promiseVariable = new Promise((resolve , reject)=>{
    resolve("Hello Promise");
});
export const promiseReject = new Promise((res,rej)=>{
    rej("Reject Func");
})



