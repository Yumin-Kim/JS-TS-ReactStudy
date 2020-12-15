//Node Bulit-in Module
const http = require('http');
const path = require('path');
//  external Module - express
const express = require('express');
const static = require('serve-static');
const bodyParser = require('body-parser');
//  external Module - config
const dotenv = require("dotenv");
const mysql = require('mysql');
const { addUser } = require('./Config/Mysql');
const { threadId } = require('worker_threads');
//config Variable
const app = express();
const PORT = 4000;

//Config Middleware 
dotenv.config()
app.use(static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD !== null ? process.env.DB_PASSWORD : "",
    database: 'test_DB',
    debug: false
})


const connectionAndQueryFuc = () =>{
    pool.getConnection((error,conn)=>{
        if (error) throw error;
        conn.query(str,(err,result)=>{
            if (err) throw err;
                res.end()
                conn.release()           
        })
    })
}

///////////////////////////이미지 라우팅하기
const hemster = express.Router();
hemster.route('/hemimage').post((req, res) => {
    const {number,picture,category,number1,picture1} = req.body;
    console.log('/hemimage 호출됨');
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h2>이미지 보여줍니다</h2>');
    if(Number(number) === 0) {
        res.write(`<img src="${picture}.jpg"><br><h1>그냥하나준다 퉤</h1></img>`);
        res.end();
    }else{
        for(let i = 0 ; i < number ; i++){
            res.write(`<img src="${picture}.jpg"><h1>사진이요</h1></img>`);
        }
        res.end();
    }
});
app.use(hemster);

//////////////////////////데이터 읽기
const mysqlRead = express.Router();
mysqlRead.route('/mysqlRead').post((req, res) => {
    console.log('/mysqlRea 호출됨');
    pool.getConnection((err, conn) => {

        const str = "select * from test_td";
        conn.query(str, (err, result) => {
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write("사용자<br>");

            for (const i = 0; i < result.length; i++)
                res.write(result[i].id + "<br>"); //서버에 등록된거 전부 찍는 부분

            res.end();
            conn.release();

        });

    });
});

app.use(mysqlRead);

//////////////////////////데이터 쓰기

const mysqlInsert = express.Router();
mysqlInsert.route('/mysqlInsert').post(function (req, res) {
    console.log('/mysqlInsert 호출됨');
    const id = req.body.id;
    const pw = req.body.pw;
    // pool.getConnection(function (err, conn) {
    //     const str = "insert into test_td(id,pass)values('" + id + "','" + pw + "')";
    //     conn.query(str, function (err, result) {
    //         console.log(err,result)
    //         res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
    //         res.write("사용자[" + id + "]추가되었습니다.");
    //         res.end();
    //         conn.release;
    //     });

    // });

    pool.getConnection(function (err, conn) {
        const str = `delete from test_td where id = ${id} `;
        conn.query(str, function (err, result) {
            console.log(err, result)
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write("사용자[" + id + "]추가되었습니다.");
            res.end();
            conn.release;
        });

    });

});
app.use(mysqlInsert);
/////////////////////////////////////////////////서버 돌리는 것
/////////////////////////////////////////////////Tutorial
//Create db
let U_tableName = "test";
const createTable = express.Router();
createTable.route("/addDBtable").post((req, res) => {
    const { tablename } = req.body;
    U_tableName = tablename;
    console.log("입력값 : ", tablename);
    pool.getConnection((error, conn) => {
        const queryStr = `CREATE table ${tablename}(id char(10),password char(15) ,address char(10),age int(45)) `;
        conn.query(queryStr, (error, result) => {
            try {
                console.log("addDB")
                res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
                res.write(`<p>${queryStr}</p>`)
                res.write(`사용자 ${tablename}추가되었습니다.`);
                res.end();
                conn.release();
            }
            catch (err) {
                console.log("err")
                console.log(error)
            }
        })
    })
});
app.use(createTable);
///////////////////////////////////////
//insertColum
const insertColum = express.Router();
insertColum.route("/insertColum").post((req, res) => {
    const { id, password, address, age } = req.body;
    pool.getConnection((error, conn) => {
        const str = `insert into ${U_tableName}(id,password,address,age)values("${id}","${password}","${address}","${age}")`;
        conn.query(str, function (err, result) {
            console.log(err, result)
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write(`tablename ${U_tableName} \n사용자 ${id} \n ${password} \n ${address} \n ${age}추가되었습니다.`);
            res.end();
            conn.release();
        });
    })
});
app.use(insertColum);
///////////////////////////////////////
//selectAlltable
const selectAlltable = express.Router();
selectAlltable.route("/selectAlltable").post((req,res)=>{
    const {id} = req.body;
    console.log(id === undefined);
    const selectQuert = {
        all : `select * from ${U_tableName}`,
        one : `select * from ${U_tableName} where id = "${id}"`,
    }
    pool.getConnection((error,conn)=>{
        if (error) throw error;
        conn.query(id !== undefined ? selectQuert.one : selectQuert.all ,(error,result)=>{
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            console.log(result)
            for (let i = 0; i < result.length; i++){
                res.write("\n사용자"+[i+1]+"<br>");
                res.write(result[i].id + " "); //서버에 등록된거 전부 찍는 부분
                res.write(result[i].password + " "); //서버에 등록된거 전부 찍는 부분
                res.write(result[i].address + " "); //서버에 등록된거 전부 찍는 부분
                res.write(result[i].age + "<br>"); //서버에 등록된거 전부 찍는 부분
            }
            res.end();
            conn.release();
        })
    })
})
app.use(selectAlltable);
////////////////////////////////////////
//updateColum
const updateColum = express.Router();
updateColum.route("/updateColum").post((req,res)=>{
    const {changeid,id} = req.body;
    pool.getConnection((error,conn)=>{
        if (error) throw error;
        const query = `Update ${U_tableName} set id = "${changeid}" where id = "${id}"`
        conn.query(query,(err,result)=>{
            if(err) throw err;
            console.log(result.affectedRows + "Update record");
            res.send("<p>Update Record<p>");
            res.end();
            conn.release();
        })
    })
})
app.use(updateColum);
//////////////////////////////////////////////////
///deletColum
const deletColum = express.Router();
deletColum.route("/deletColum").get((req,res)=>{
    const {id} = req.query;
    console.log(req.body)
    const query = `Delete FROM ${U_tableName} WHERE id = "${id}"` 
    pool.getConnection((error,conn)=>{
        if (error) throw error;
        conn.query(query,(err,result)=>{
            if (err) throw err;
            console.log(result);
            console.log(id);
            res.end();
            conn.release();
        })
    })
})
app.use(deletColum);


http.createServer(app).listen(PORT, function () {
    console.log('서버가시작되었습니다 포트 :' + PORT);
})



