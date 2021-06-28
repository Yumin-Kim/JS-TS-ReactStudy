const functions = require('firebase-functions');
const app = require("express")();

app.get("/timestamp",(req,res)=>{
    res.send(`${Date.now()}`);
})

exports.app = functions.https.onRequest(app);
//firebase.json의 function 명과 일치 하게뜸 작성 한디
//firebase.json의 source의 명과 url연결을 맞춘다!!
