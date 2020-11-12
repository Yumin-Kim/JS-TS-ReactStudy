//var a=4;
//var b=5;
//
//var sum = 0;
//sum = a+b;
//console.log(sum);

//function add(a,b){
//    var sum = a+b;
//    console.log(sum);
//}
//
//add(10,20);

var tt = [{name:'최규민',age:24},{name:'bts',age:21}];
for(var i = 0; i<=1;i++)
console.log(tt[i].name);
//배열 내부 수정 시험

//callback 시험
function aa(a,b,callback){
    var sum = a+b;
    callback(sum);
    
}
aa(10,20,function(result){
    console.log(result);
})
//타임스템프 문제, 파일입출력


var addNumber = function(a,b){
    return a+b;
}
console.log(addNumber(4,5));