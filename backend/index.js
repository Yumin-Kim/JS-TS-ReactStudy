const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');

const db = require('./models');
const passportConfig = require('./passport/index');

const userAPIRouter = require('./routes/user');
const postsAPIRouter = require('./routes/posts');
const postAPIRouter = require('./routes/post');
const hashTagAPIRouter = require('./routes/hashtag');


const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/',express.static('uploads'));
app.use(cors({
  origin:'http://localhost:3060',
  credentials:true
  //이와 같이 사용하면 쿠키 교환 원할
}));
app.use(cookieParser("nodebirdCookie"));
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:"nodebirdCookie",
  cookie:{
    httpOnly:true,
    // secure:true https를 사용할때 사용
  },
  name:'Tutorial'
}))
//session과 싱호 의존 관계여서 session 밑에 있어야함!!
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user',userAPIRouter);
app.use('/api/post',postAPIRouter);
app.use('/api/posts',postsAPIRouter);
app.use('/api/hashtag',hashTagAPIRouter);


app.listen(3065, () => {
  console.log("server is running on localhost:3065");
});
