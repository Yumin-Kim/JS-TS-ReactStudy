//var aa = require('fs');
//aa.readFile('aa.txt','utf8',function(a,b){
//    console.log(b);
//});//파일 읽는 방식

var aa = require('fs');
aa.writeFile('my.text','안녕하세용',function(err){
    if(err)
        console.log('Error:'+err);
    console.log('my.txt 파일데이터 쓰기 완료');
});