const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require("bcrypt");

const db = require('../models');

router.get('/load', (req, res, next) => {
  console.log('Loader',req.user)
  if (!req.user) {
    return res.send("로그인 정보가 없습니다")
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErorr => {
      try {
        if (loginErorr) {
          return next(loginErorr);
        }
        const loginUser = await db.User.findOne({
          where: { id: user.id },
          attributes: ['id', 'nickname', 'userId'],
        })
        console.log('/////////////////')
        const category = await db.Post.findAll({
          where: {
            UserId: user.id,
          },
          attributes: ['id']
        });
        const data = Object.assign({}, loginUser.toJSON(), { postlength: category });
        return res.json(data);
      } catch (e) {
        console.error(e);
        next(e);
      }
    })
  })(req, res, next)
});

router.post('/signup', async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    console.log('newUser1')
    if (exUser) {
      return res.status(403).send("이미 존재하는 아이디입니다");
    }
    const hashendPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashendPassword
    });
    console.log('newUser2')
    return res.json(newUser);
  } catch (e) {
    return next(e);
  }
});
router.post('/logout', (req, res, next) => {
  req.logout();
  console.log('session', req.session)
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(req.user)
      res.send("logout 성공!!");
    }
  });
})
router.patch('/nickname', async (req, res, next) => {
  try {
    await db.User.update({
      nickname: req.body.nickname,
    }, {
      where: { id: req.user.id },
    });
    res.send(req.body.nickname);
  } catch (e) {
    console.error(e);
    next(e);
  }
})
module.exports = router;