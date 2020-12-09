var express=require('express');
var app = express();
var http=require('http');
var static=require('serve-static');
var path=require('path');
var bodyParser=require('body-parser');
var PORT=4000;

app.use(static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use((req, res, next)=> {
//    var id = req.body.id;
//    var pw = req.body.pw;
//    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//    res.write('<h2>화면읽기</h2>');
//    res.write('아이디:'+id+'&nbsp비밀번호:'+pw)
//    res.end();
//});

///////////////////////////이미지 라우팅하기

var hemster = express.Router();
hemster.route('/hemimage').post(function(req,res){
    console.log('/hemimage 호출됨');
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h2>헴스터</h2>');
    res.write('<img src="ssong.jpg"><br>나의햄스터</img>');
    res.end();
});
app.use(hemster);

var mysqlRead=express.Router();
var mysql=require('mysql');
var pool=mysql.createpool({
    connectionLimit : 10, 
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'test_DB',
    debug : false

})
mysqlRead.route('/mysqlRead').post(function(req,res){
    console.log('/mysqlRea 호출됨');
    
});

app.use(mysqlRead);

http.createServer(app).listen(PORT,function(){
    console.log('서버가시작되었습니다 포트 :'+PORT);
})


