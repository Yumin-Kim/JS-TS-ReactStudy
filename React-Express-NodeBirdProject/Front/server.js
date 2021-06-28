const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const path = require('path');
const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use('/', express.static(path.join(__dirname, 'public')));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser("nodebirdCookie"));
  server.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "nodebirdCookie",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }));

  server.get('/post/:id', (req, res) => {
    console.log(req.params.id);
    return app.render(req, res, '/post', { id: req.params.id });
  });

  server.get('/hashtag/:tag', (req, res) => {
    return app.render(req, res, '/hashtag', { tag: req.params.tag });
  });

  server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3060, () => {
    console.log('next+express running on port 3060');
  });
});