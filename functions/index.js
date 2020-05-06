//npm module은 functions 안에 설치!!

const functions = require('firebase-functions');
const app = require("express")(); // const app = express() >> 고차 함수로 이용하여 실행!!
const cors = require("cors");
const { getAllSceams, postOneScream } = require("./handlers/screams");
const { signup ,login ,uploadImage } = require("./handlers/users");
const FBAuth = require("./util/fbAuth");

app.use(cors());
//post Router
app.get('/screams', getAllSceams);
app.post('/scream', FBAuth, postOneScream)

//signup route
app.post("/signup", signup)
app.post("/login", login )
app.post("/user/image",FBAuth,uploadImage);

//https://baseurl.com/api/
//router!!
exports.api = functions.https.onRequest(app);





















//export.변수명 >> 변수명으로 라우팅됨!!
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello Express");
// });
//screams라는 데이터 생성후 불러 조회하는 로직 일종의 query문!!!
// app.post('/scream',(req, res) => {
//    db.collection("screams").get()
//         .then(data=>{
//             data.forEach(()=>{
//                 let screams =[];
//                 data.forEach(doc =>{
//                     console.log("doc",doc);
//                     console.log("doc.data",doc.data);
//                     screams.push(doc.data());
//                 })
//                 return res.json(screams);
//             })
//         }).catch((error)=>{console.log(error)});
// })
//포스트 추가!!
