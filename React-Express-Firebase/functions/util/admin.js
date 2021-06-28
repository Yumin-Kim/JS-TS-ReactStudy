const admin = require("firebase-admin");
const serviceAccount = require("../path/serviceAcceptKey.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://express-tutorial-d84ab.firebaseio.com"
  });

const db = admin.firestore();

module.exports = { admin , db }



