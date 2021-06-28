const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParsor = require('cookie-parser');
const expressSession = require('express-session')
const passport = require('passport');

const db = require('./models');
const passportConfig = require('./passport');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',express.static('upload'));
app.use(cors({
    origin:'http://localhost:3050',
    credentials:true
}));
app.use(cookieParsor('reactProject'));
app.use(expressSession({
    resave:false,//매번 세션 저장
    saveUninitialized:false, // 빈값 저장,
    secret:'reactProject',
    cookie:{
        httpOnly:true,//https일때
        // secure:false,
    },
    name:'tutorial'
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user',userRouter);
app.use('/api/post',postRouter);

app.listen(3000, () => {
    console.log('Express listen to 3000Port');
})