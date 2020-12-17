//Node Bulit-in Module
const http = require('http');
const path = require('path');
//  external Module - express
const express = require('express');
const static = require('serve-static');
const bodyParser = require('body-parser');
//  external Module - config
const mysql = require('mysql');
//config Variable
const app = express();
const PORT = 4040;

//Config Middleware 
app.use(static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: "",
    database: '201610309_db',
    debug: false
})

const printData = express.Router();
printData.route('/printData').post((req, res) => {
    const { id, address, age, password } = req.body;
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h1>201610309_김유민</h1>');
    res.write(`<p>이름 : ${id}</p>`)
    res.write(`<p>학년 : ${password}</p>`)
    res.write(`<p>나이 : ${age}</p>`)
    res.write(`<p>주소 : ${address}</p>`)
    res.end();
});
app.use(printData);

const covid19 = express.Router();
covid19.route('/covid19').post((req, res) => {
    console.log('/covid19 호출됨');
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h2>김유민 코로나 19</h2>');
    res.write(`<img src="covid19.jpg"><br><h1> 김유민_코로나 19</h1></img>`);
    res.end();
});

app.use(covid19);
const mysqlRead = express.Router();
mysqlRead.route('/mysqlRead').post((req, res) => {
    console.log('/mysqlRead 호출됨');
    pool.getConnection((error, conn) => {
        const str = `select * from  a201610309_table `;
        conn.query(str, function (err, result) {
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write("<h1>정보</h1>")
            for(let i = 0 ; i < result.length ; i++){
                res.write(` <br> ${result[i].name} : ${result[i].grade} ${result[i].age} ${result[i].address}</br>`)
            }
            res.end();
            conn.release();
        });

    });
})

const MysqlInsert = express.Router();
MysqlInsert.route("/MysqlInsert").post((req, res) => {
    const { name, grade, address, age } = req.body;
    pool.getConnection((error, conn) => {
        const str = `insert into a201610309_table (name,grade,address,age)values("${name}","${grade}","${address}","${age}")`;
        conn.query(str, function (err, result) {
            console.log(err, result)
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write(`\n사용자 [${name} / ${grade} / ${address} / ${age}]추가되었습니다.`);
            res.end();
            conn.release();
        });
    })
});
app.use(MysqlInsert);

app.use(mysqlRead)
http.createServer(app).listen(PORT, function () {
    console.log('20160309 김유민 서버시작 :' + PORT);
})



