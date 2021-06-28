const express = require("express");
const path = require("path");

const { readUser ,addUser } = require("../Config/Mysql")

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile('mysql.html', { root: path.join(__dirname, "../public") })
})

router.get("/readUser", (req, res) => {
    readUser(function (err, docs) {
        if (err) {
            console.log("에러발생");
            res.send("<h1>에러발생</h1>");
            res.end();
        }
        if (docs) {
            console.dir(docs);
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write("사용자 읽기 성공<br>");
            for (var i = 0; i < docs.length; i++)
                res.write(docs[i].id + "<br>");
            res.write("<a href='../mysql'>돌아기기</a>");
            res.end();
        }
        else {
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write("추가실패. ");
            res.write("<a href='../'>돌아기기</a>");
            res.end();
        }
    })
})

router.post("/addUser",(req,res)=>{
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    addUser(paramId, paramPassword, function (err, docs) {
        if (err) {
            console.log("에러발생");
            res.send("<h1>에러발생</h1>");
            res.end();
        }
        if (docs) {
            console.dir(docs);
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write("사용자 추가 성공<br>");
            res.write("<a href='../mysql'>돌아기기</a>");
            res.end();
        }
        else {
            res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
            res.write("추가실패. ");
            res.write("<a href='../mysql'>돌아기기</a>");
            res.end();
        }
    })
})

module.exports = router;