import * as express from "express";
const router = express.Router();

router.get("/templete",(req,res,next)=>{
    res.send(JSON.stringify({data:"Hello"}));
})

export default router;