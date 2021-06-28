import { Request, Response, NextFunction } from "express";

//router express 모듈이 없기 때문에 직접 params 값에 타이핑을 해줘야 한다
const isLoggedIn = (req : Request,res:Response,next:NextFunction) =>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).send("로그인이 필요 합니다");
    }
}
const isNotLoggedIn = (req : Request,res:Response,next:NextFunction) =>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.status(401).send("로그인한 사용자는 접근할 수 없습니다");
    }
}

export {isLoggedIn , isNotLoggedIn}; 