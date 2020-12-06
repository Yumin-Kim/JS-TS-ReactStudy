const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/login",(req,res)=>{
    res.sendFile('login.html', { root: path.join(__dirname, "../public") })
})
router.post("/userData",(req,res)=>{
    const {id,password} = req.body;
    res.send(`<h1>${id} >> ${password}</h1>`);
})

module.exports =router;