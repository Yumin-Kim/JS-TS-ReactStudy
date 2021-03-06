const express = require("express");
const db = require("../models");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/", (req, res) => {
  if(!req.user){
    return res.status(401).send("로그인 정보가 없습니다")
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  console.log(user);
  return res.json(user);
});

router.post("/", async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다");
    }
    const hashendPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashendPassword
    });
    return res.json(newUser);
  } catch (e) {
    console.error(e);
    // return res.status(403).send(e);
    return next(e);
  }
});

router.get("/:id",async (req, res,next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [{
        model: db.Post,
        as: 'Posts',
        attributes: ['id'],
      }, {
        model: db.User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: db.User,
        as: 'Followers',
        attributes: ['id'],
      }],
      attributes: ['id', 'nickname'],
    });
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("logout 성공!!");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginError => {
      try {
        if (loginError) {
          return next(loginError);
        }
        const fullUser = await db.User.findOne({
            where: { id: user.id },
            include: [{
              model: db.Post,
              as: 'Posts',
              attributes: ['id'],
            }, {
              model: db.User,
              as: 'Followings',
              attributes: ['id'],
            }, {
              model: db.User,
              as: 'Followers',
              attributes: ['id'],
            }],
            attributes: ['id', 'nickname', 'userId'],
          });
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.get("/:id/follow", (req, res) => {});

router.get("/:id/follow", (req, res) => {});

router.post("/:id/follow", (req, res) => {});

router.delete("/:id/follow", (req, res) => {});

router.delete("/:id/follower", (req, res) => {});

router.get("/:id/posts",async (req, res,next) => {
  try{
    const posts = await db.Post.findAll({
      where:{
        UserId : parseInt(req.params.id,10),
        RetweetId:null,
      },
      include:[{
        model:db.User,
        attributes:[ 'id' , 'nickname' ],
      },{
        model : db.Image,
      },{
        model: db.User,
        through: 'Like',
        as: 'Likers',
        attributes: ['id'],
      }, ]
    })
    res.json(posts);
  }catch(e){
    console.log(e);
    next(e);
  }
});

module.exports = router;
