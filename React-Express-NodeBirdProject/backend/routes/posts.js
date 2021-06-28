const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log(req.query.lastId)
    let where ={};
    if( parseInt(req.query.lastId,10) ){
      where={
        id:{
          [db.Sequelize.Op.lt]:parseInt(req.query.lastId,10),
        }
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        },
        {
          model: db.Image
        },{
            model:db.User,
            thtough : 'Like',
            as : "Likers",
            attributes:[ "id" ],
        },{
          model:db.Post,
          as:'Retweet',
          include:[{
            model:db.User,
            attributes:['id','nickname']
          }]
        }
      ],
      order: [['createdAt', 'DESC']],
      limit:parseInt(req.query.limit,10),
    });
    res.json(posts);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("포스트가 존재 하지 않습니다");
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id
      },
      oreder: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    // console.log(comments);
    res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post("/:id/comment", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다");
    }

    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("포스트가 존재 하지 않습니다");
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content
    });
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    console.log(comment);
    return res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
