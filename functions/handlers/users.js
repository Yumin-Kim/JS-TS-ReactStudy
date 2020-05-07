const { db, admin } = require('../util/admin');
const config = require('../util/config');
const { validateSignupData, validateLoginData, reduceUserDetails } = require("../util/vaildator")
const firebase = require("firebase");
firebase.initializeApp(config);

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  const { errors, vaild } = validateSignupData(newUser);

  if (!vaild) return res.status(400).json(errors);

  const noimage = `no-image.jpg`;

  let token, userId;
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
          })
          .then(token => {
            token = token;
            const userCredentials = {
              handle: newUser.handle,
              email: newUser.email,
              createAt: new Date().toISOString(),
              imageUrl: `https://firebasestorage.googleapis.com./v0/b/${config.storageBucket}/o/${noimage}?alt=media`,
              userId
            }
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
          })
          .then(() => {
            return res.status(201).json({ token });
          })
          .catch(error => {
            console.error(error);
            if (error.code === "auth/email-already-in-use") {
              return res.status(400).json({ email: "Email is already" })
            }
            return res.status(500).json({ error: error.code });
          })
      }
    })

}


exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { errors, vaild } = validateLoginData(user);

  if (!vaild) return res.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch((error) => {
      console.error(error);
      return res.status(403).json({ general: "Wrong credentials, please try again" })
    })

}
exports.getUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("screams")
          .where("userHandle", "==", req.params.handle)
          .orderBy("createAt", "desc")
          .get();
      } else {
        return res.status(404).json({ errror: "User not found" });
      }
    })
    .then((data) => {
      userData.screams = [];
      data.forEach((doc) => {
        userData.screams.push({
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          userHandle: doc.data().userHandle,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          screamId: doc.id,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.handle}`).update(userDetails)
    .then(() => {
      return res.json({ message: "Detail added successfuly" });
    })
    .catch((error) => {
      console.error(error)
      return res.status(500).json({ error: error.code });
    })

}

exports.getAuthenticateUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`).get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db.collection("likes").where("userHandle", "==", req.user.handle).get()
      }
    })
    .then(data => {
      userData.likes = [];
      data.forEach(doc => {
        userData.likes.push(doc.data());
      });
      return db.collection("notifications").where("recipient", "==", req.user.handle).orderBy("createAt", "desc").limit(10).get();
    })
    .then(data => {
      userData.notifications = [];
      data.forEach(doc => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sebder: doc.data().sebder,
          createAt: doc.data().createAt,
          screamId: doc.data().screamId,
          type: doc.data().type,
          read: doc.data().read,
          notificationId: doc.id,
        })
      })
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code })
    })
}

exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  // let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket(config.storageBucket)
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,

          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};

exports.marknotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach((notificationId) => {
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, { read: true });
  });

  batch.commit()
    .then(() => {
      return res.json({ message: "Notifications marked read" });
    })
    .catch((error) => {
      console.error(error)
      return res.status(500).json({ error: error.code });
    })

}
