//npm module은 functions 안에 설치!!

const functions = require('firebase-functions');
const app = require("express")(); // const app = express() >> 고차 함수로 이용하여 실행!!
const cors = require("cors");
const { getAllSceams, postOneScream, getScream, commentOnScream, likeScream, unlikeSceram, deleteScream } = require("./handlers/screams");
const { signup, login, uploadImage, addUserDetails, getAuthenticateUser, marknotificationsRead, getUserDetails } = require("./handlers/users");
const FBAuth = require("./util/fbAuth");

const { db } = require("./util/admin");

app.use(cors());
//post Router
app.get('/screams', getAllSceams);
app.post('/scream', FBAuth, postOneScream);
app.post('/scream/:screamId', getScream);
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);
app.delete('/scream/:screamId', FBAuth, deleteScream);
app.get('/scream/:screamId/like', FBAuth, likeScream)
app.get('/scream/:screamId/unlike', FBAuth, unlikeSceram)
//signup route
app.post("/signup", signup)
app.post("/login", login)
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticateUser)
app.post('/notifications', FBAuth, marknotificationsRead);
app.get('/user/:handle', getUserDetails)
//https://baseurl.com/api/
//router!!
exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.region('europe-west1').firestore.document(`likes/{id}`)
    .onCreate((snapshot) => {
        return db.doc(`/screams/${snapshot.data().screamId}`).get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        screamId: doc.id
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return;
            })
    })

exports.deleteNotificationOnUnLike = functions.region("europe-west1").firestore.document(`likes/{id}`).onDelete((snapshot) => {
    return db.doc(`/notifications/${snapshot.id}`)
        .delete()
        .catch((error) => {
            console.error(error);
            return;
        })
})

exports.createNotificationOnComment = functions.region('europe-west1').firestore.document(`comments/{id}`)
    .onCreate((snapshot) => {
        return db.doc(`/screams/${snapshot.data().screamId}`).get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createAt: new Date(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        screamId: doc.id
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return;
            })
    })
exports.onUserImageChange = functions.region('europe-west1').firestore.document('/user/{userId}')
    .onCreate(change => {
        console.log(change.before.data());
        console.log(change.after.data());
        if(change.before.data().imageUrl !== change.after.data().imageUrl){
            console.log('image has changed');
            let batch = db.batch();
            return db.collection("screams").where('userHandle', "==", change.before.data().handle).get()
                .then(data => {
                    data.forEach(doc => {
                        const scream = db.doc(`/screams/${doc.id}`);
                        batch.update(scream, { userImage: change.after.data().imageUrl });
                    })
                    return batch.commit();
                })
        }else return true;
    })

exports.onScreamDelete = functions.region("europe-west1").firestore.document(`/screams/{screamId}`)
    .onDelete((snapshot,context)=>{
        const screamId = context.params.screamId;
        const batch = db.batch();
        return db.collection("comments").where('screamId',"==",screamId)
            .then(data=>{
                data.forEach(doc=>{
                    batch.delete(db.doc(`/comments/${doc.id}`));
                })
                return db.collection('likes').where("screamId","==",screamId);
            })
            .then(data=>{
                data.forEach(doc=>{
                    batch.delete(db.doc(`/likes/${doc.id}`));
                })
                return db.collection('notifications').where("screamId","==",screamId);
            })
            .then(data=>{
                data.forEach(doc=>{
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                })
                return batch.commit();
            })
            .catch(error=>console.error(error));
    })







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
