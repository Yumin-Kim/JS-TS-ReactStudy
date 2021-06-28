const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'test_db',
    debug: false

})

exports.addUser = function (id, password, callback) {
    console.log('addUser 호출됨.');
    // 커넥션 풀에서 연결 객체를 가져옵니다.
    pool.getConnection(function (err, conn) {
        if (err) {
            if (conn) {
                conn.release(); // 반드시 해제해야 합니다.
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        //var data = {id:id,password:password};
        //var exec = conn.query('insert into users set ?', data, function(err, result) 

        //"insert into users (id,password) values('sonic747', '123456')";

        var str = "insert into users (id,password) values('" + id + "', '" + password + "')";
        var exec = conn.query(str, function (err, result) {

            conn.release();
            console.log('실행된' + exec.sql);
            callback(null, result);
        });
    })
};

exports.readUser = (callback) => {
    console.log('readUser 호출됨.');
    // 커넥션 풀에서 연결 객체를 가져옵니다.
    pool.getConnection(function (err, conn) {
        if (err) {
            if (conn) {
                conn.release(); // 반드시 해제해야 합니다.
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        // var data = {id:id,password:password};
        // var exec = conn.query('insert into users set ?', data, function(err, result) 

        // "insert into users (id,password) values('sonic747', '123456')";

        var str = "select * from users";
        var exec = conn.query(str, function (err, result) {
            conn.release();
            console.log('실행된' + exec.sql);
            callback(null, result);
        });
    })
};


