const express = require("express");
const router = express.Router();

router.get("/templete",(req,res,next)=>{
    res.send(JSON.stringify({data:"Hello"}));
})

module.exports = router;