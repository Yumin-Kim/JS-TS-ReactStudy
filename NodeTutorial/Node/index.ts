import * as chapter from "../Module/ch0930";
import { promiseVariable , promiseReject , onCustomFunc, fsReadFile } from "../Module/TSModule/Promise";
import * as url from 'url';
function ch1007(){
    async function PromiseAsyncFunc() {
        try{
            const PromiseStr = await promiseVariable;
            console.log("PromiseStr",PromiseStr);
            const PromiseReject = await promiseReject;
        }
        catch(error){
            console.error("error >>>> ",error);
        }
    }  
    PromiseAsyncFunc();
    fsReadFile
        .then((data) => {
            console.log("Index.ts >> promise", data)
        })
        .catch(err => console.log(err))
    onCustomFunc.emit("AddFunc","Success Custom Event(EventEmiiter)");
    
}
//  promiseVariable.then((text) => console.log(text) );
function Firstch1(){
    const ch0930: chapter.AddParam = {
        First_num: 1,
        End_num: 10,
        callback: (First_num, End_num) => {
            let ResultNum = 0;
            for (let i = First_num; i <= End_num; i++) {
                ResultNum += i;
            }
            return ResultNum;
        }
    };
    
    console.log(chapter.chapter);
    console.log(chapter.chapter_1);
    console.log(chapter.addCallBackFunc(ch0930));
    
    interface I_Student {
        num: number;
        name: String | number;
        mobile?: string;
        add?: (a: number, b: number) => number;
    }
    
    const StudentObject: I_Student = {
        num: 201610309,
        name: "김유민"
    };
    
    StudentObject.add = function (a, b) { return a + b; }
    console.log(`학번 과 이름 ${StudentObject.num} ${StudentObject.name} \n산술 100 + 100 : ${StudentObject.add(100, 100)}`)
    
    class TypescriptClass {
        public at;
        constructor() {
            this.at = 100;
        }
    }
    console.log(new TypescriptClass());
    console.log(Object.prototype.constructor());
    let Num: number = 0;
    const ResultNum = Array(10).fill("").forEach((val: string, index): number => {
        Num += index + 1;
        return 10;
    })
    console.log(Num);
}
