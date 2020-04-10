import * as express from 'express'
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as hpp from 'hpp';
import * as expressSession from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport'

import userRouter from './routes/user';
import postRouter from './routes/post';

dotenv.config();

import { sequelize } from './models/index';

const app: express.Application = express();
const devel: Boolean = process.env.NODE_ENV !== "production";
app.set('port', devel ? 3000 : process.env.PORT)//express 내에서 변수 선언 할 수 있다

sequelize.sync({ force: false })//force : true 할시 지시작 할떄 마다 계속 db 새로 생성
    .then(() => {console.log("DB compose") })
    .catch((error : Error)=>{console.error(error)})

if (!devel) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: /nodebird\.com$/,
        credentials: true
    }));
} else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true
    }))
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'hello'
}))
app.use(passport.initialize());
app.use(passport.session());


app.use('/user',userRouter);
app.use('/post',postRouter);

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send(`react NodeBird 백엔드 정상 작동`);
})

app.listen(app.get('port'), () => {
    console.log(`server is running on ${app.get('port')}`);
})

// tsc --traceResolution >>types한것을 ts가 어떻게 가져 오는지 확인 할 수 있다 
