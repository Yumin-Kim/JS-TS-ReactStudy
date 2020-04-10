import * as passport from 'passport';
import User from '../models/user';
import local from './local';

export default () => {
    //로그인시만 실행
    passport.serializeUser< User ,number >((user,done)=>{
        done(null,user.id)
    })

    //매번 실행
    passport.deserializeUser( async (id:number,done)=>{
        try{
            const user = await User.findOne({
                where: {id}
            });
            if(!user){
                return done(new Error("No user"));
            }
            return done(null , user); //req.user로 변함  
        }catch(error){
            console.error(error);
            return done(error);
        }
    });

    local();
    
}