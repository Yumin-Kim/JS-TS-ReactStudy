const monogoClient = require("mongodb").MongoClient;
// const monogoClient = require("mongodb");
exports.connectDB = () => {
    const databaseUrl = "mongodb://localhost:27017/TestDB";
    monogoClient.connect(databaseUrl, (err, db) => {
        try {
            console.log("Connect MongoDB : ", databaseUrl);
            DBData = db;
            return db;
        } catch (error) {
            console.log(error);
            throw err;
        }
    })
}

exports.authUser = (db, id, password, callback) => {
    console.log('authUser 호출됨.');
    var db = db.db('TestDB');//=>DeprecationWarning 해결하기위한 방안2020.11.18
    var users = db.collection('user');//=>DeprecationWarning
    users.find({ "id": id }).toArray((err, docs) => {
        console.log(err, docs)
        if (err) {
            callback(err, null);
            return;
        }
        if (docs.length > 0) {
            console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.', id, password);
            callback(null, docs);
        } else {
            console.log("일치하는 사용자를 찾지 못함.");
            callback(null, null);
        }
    });
}



exports.addUser = function (db, id, password, name, callback) {
    console.log('addUser 호출됨.');

    var db = db.db('TestDB');//=>DeprecationWarning 해결하기위한 방안2020.11.18
    var users = db.collection('user');
    // id, password, username을 사용해 사용자 추가
    users.insertMany([{ "id": id, "password": password, "name": name }], function (err, result) {
        if (err) { // 오류가 발생했을 때 콜백 함수를 호출하면서 오류 객체 전달
            callback(err, null);
            return;
        }
        if (result.insertedCount > 0) {
            console.log("사용자 레코드 추가됨 : " + result.insertedCount);
        } else {
            console.log("추가된 레코드가 없음.");
        }
        callback(null, result);
    })
};


exports.userRead = function (db, callback) {
    var db = db.db('TestDB');//=>DeprecationWarning 해결하기위한 방안2020.11.18
    var users = db.collection('user');//=>DeprecationWarning

    users.find().toArray(function (err, docs) {
        if (err) {
            callback(err, null);
            return;
        }

        if (docs.length > 0) {
            console.log(docs[0].id + "<br>");
            callback(null, docs);
        } else {
            console.log("일치하는 사용자를 찾지 못함.");
            callback(null, null);
        }
    });
}


