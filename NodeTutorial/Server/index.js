const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const monogoClient = require("mongodb").MongoClient;

const { authUser, addUser, userRead } = require("./Config/MongoDB");

const userRouter = require("./Route/user");

const app = express();
const devl = process.env.NODE_ENV !== "prouduction";

//midileware
app.set("port", devl ? 3000 : process.env.PORT);
app.use(morgan("dev"));
app.use(cors({
    origin: true,
    credentials: true
}))
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//DBConfig
let MongoDB;
const connectDB = async () => {
    const databaseUrl = "mongodb://localhost:27017/TestDB";
    await monogoClient.connect(databaseUrl, (err, db) => {
        try {
            console.log("Connect MongoDB : ", databaseUrl);
            MongoDB = db;
            return db;
        } catch (error) {
            console.log(error);
            throw err;
        }
    })
}
//router
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})
app.use("/user", userRouter);
//MonogoDB route
connectDB();
app.post('/mongo/:path', async (req, res) => {
    console.log('/user/mongo 호출됨.');
    // const aasd = await connectDB(); 
    const { path } = req.params;
    const paramId = req.body.id || req.query.id;
    const paramPassword = req.body.password || req.query.password;
    const paramName = req.body.name || req.query.name;

    const SelectAllTableDataBase_test = await MongoDB.db('test').collection("user").find().toArray()
    const SelectAllTableDataBase_TestDB = await MongoDB.db('TestDB').collection("user").find().toArray()
    if (MongoDB) {
        if (path === "login") {
            await authUser(MongoDB, paramId, paramPassword, (err, docs) => {
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
                    res.write("<a href='../'>돌아기기</a>");
                    res.end();
                }
            }
            )
        }
        if (path === "adduser") {
            addUser(MongoDB, paramId, paramPassword, paramName, (err, result) => {
                if (err) { throw err; }
                // 결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
                if (result && result.insertedCount > 0) {
                    console.dir(result);
                    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                    res.write('<h2>사용자 추가 성공</h2>');
                    res.write("<a href='../user/MongoDB'>추가</a><br>");
                    res.write("<a href='../user/MongoDB'>데이터읽기</a>")
                    res.end();
                }
            })
        }
        else
            userRead(MongoDB, function (err, result) {
                console.log(result.length);
                if (err) { throw err; }

                // 결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
                if (result) {
                    console.dir(result);
                    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                    res.write('<h2>사용자 읽기 성공</h2>');
                    for (var i = 0; i < result.length; i++)
                        res.write(result[i].id + "<br>");

                    res.end();
                }
            })
    }

});
app.post("/mongo/addUser", function (req, res) {
    console.log('/process/adduser 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if (database) {
    }
});


app.listen(3000, () => {
    console.log("School Lecture Server");
});
