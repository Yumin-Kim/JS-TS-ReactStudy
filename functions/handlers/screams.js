const { db } = require("../util/admin");

exports.getAllSceams = (req, res) => {
    db.collection("screams")
        .orderBy("createAt", "desc")
        .get()
        .then(data => {
            let screams = [];
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createAt: doc.data().createAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount
                });
            });
            return res.json(screams);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: err.code });
        })
}

exports.postOneScream = (req, res) => {
    if (req.body.body.trim() === "") {
        return res.status(400).json({ body: "Body must be empty" });
    }
    const newScreams = {
        body: req.body.body,
        userHandle: req.user,
        createAt: new Date().toISOString(),
    };
    db.collection("screams").add(newScreams)
        .then(doc => {
            res.json({ message: `docuement ${doc.id} created successfuly` });
        })
        .catch(err => {
            res.status(500).json({ error: "something went wrong" });
            console.error(err);
        });
}