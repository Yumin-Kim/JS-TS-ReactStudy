const path = require("path");
const { moduleFunction,moduleObjectMap } =require("./Module/module");
const {object} = require("./Module/moduleCal");
const nconf = require("nconf");
//내장 객체
const process = require("process");
const os = require("os");
console.log(process.env["os"]);
console.log(os.cpus());
console.log(os.freemem());
console.log(os.hostname());
console.log(os.networkInterfaces());

// 모듈화 및 기초 문법
let result = 0;
const moduleTextfunc = moduleObjectMap([1,2,4,5,6,6,7]);
const moduleTextFunc = moduleFunction("hello");
console.log(moduleTextFunc);
console.log(object.method(123,"asd"))

console.log("%d",typeof(10));
console.log(typeof(10));
console.log("Object : %j",{name : "Hello"})
console.log(__dirname);
console.log(__filename);
console.time("Start");
for(let i = 0 ; i < 1000 ; i++)
{
    result += i;
}
console.timeEnd("Start");

console.log(process.argv.length);
console.log(process.argv);

