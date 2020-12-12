var express = require('express');
var app = express();
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var PORT = 4000;
const dotenv = require("dotenv");
dotenv.config();

app.use(static(path.join(__dirname, 'public')));
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
hemster.route('/hemimage').post(function (req, res) {
    console.log('/hemimage 호출됨');
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h2>헴스터</h2>');
    res.write('<img src="ssong.jpg"><br>나의햄스터</img>');
    res.write('<img src="ssong.jpg"><br>나의햄스터</img>');
    res.write('<img src="ssong.jpg"><br>나의햄스터</img>');//이미지 찍는 부분
    res.end();
});
app.use(hemster);

//////////////////////////데이터 읽기

var mysqlRead = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'test_DB',
    debug: false
})
pool.getConnection((error, conn) => {
    var str = "select * from test_td";
    conn.query(str, function (err, result) {
        console.log(conn)
        console.log(result)
    });

})
mysqlRead.route('/mysqlRead').post(function (req, res) {
    console.log('/mysqlRea 호출됨');
    pool.getConnection(function (err, conn) {

        var str = "select * from test_td";
        conn.query(str, function (err, result) {
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write("사용자<br>");

            for (var i = 0; i < result.length; i++)
                res.write(result[i].id + "<br>"); //서버에 등록된거 전부 찍는 부분

            res.end();
            conn.release();

        });

    });
});

app.use(mysqlRead);

//////////////////////////데이터 쓰기

var mysqlInsert = express.Router();
mysqlInsert.route('/mysqlInsert').post(function (req, res) {
    console.log('/mysqlInsert 호출됨');
    var id = req.body.id;
    var pw = req.body.pw;
    // pool.getConnection(function (err, conn) {
    //     var str = "insert into test_td(id,pass)values('" + id + "','" + pw + "')";
    //     conn.query(str, function (err, result) {
    //         console.log(err,result)
    //         res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
    //         res.write("사용자[" + id + "]추가되었습니다.");
    //         res.end();
    //         conn.release;
    //     });

    // });

    pool.getConnection(function (err, conn) {
            var str = `delete from test_td where id = ${id} `;
            conn.query(str, function (err, result) {
                console.log(err,result)
                res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
                res.write("사용자[" + id + "]추가되었습니다.");
                res.end();
                conn.release;
            });
    
        });

});
app.use(mysqlInsert);

/////////////////////////////////////////////////서버 돌리는 것
http.createServer(app).listen(PORT, function () {
    console.log('서버가시작되었습니다 포트 :' + PORT);
})



