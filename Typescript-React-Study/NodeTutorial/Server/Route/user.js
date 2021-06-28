const express = require("express");
const router = express.Router();
const path = require("path");
// const {authUser,connectDB,DBData} = require("../Config/MongoDB")

const {DBData} = require("../index");

router.get("/login",(req,res)=>{
    console.log(DBData)
    res.sendFile('login.html', { root: path.join(__dirname, "../public") })
})
router.get("/MongoDB",(req,res)=>{
    console.log(DBData)
    res.sendFile('MongoDB.html', { root: path.join(__dirname, "../public") })
})
router.post("/userData",(req,res)=>{
    const {id,password} = req.body;
    res.send(`<h1>${id} >> ${password}</h1>`);
})

router.post('/mongo', (req, res) => {
    console.log('/user/mongo 호출됨.');
    console.log(DBData)
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    if (connectDB) {
        console.log("Connect DB logic")
        authUser(DBData, paramId, paramPassword, function (err, docs) {
            if (err) {
                console.log("에러발생");
                res.send("<h1>에러발생</h1>");
                res.end();
            }
            if (docs) {
                console.dir(docs);
                res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
                res.write("정상로그인됨");
                res.write("정보:" + docs[0].id);
                res.end();
            }
            else {
                res.writeHead(200, { "Content-Type": "Text/html;charset=utf8" });
                res.write("찾지 못했습니다. ");
                res.write("<a href='../login.html'>돌아기기</a>");
                res.end();
            }
        }
        )
    }

});


module.exports =router;