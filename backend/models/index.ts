import User, { associate as associateUser } from './user';
import Comment, { associate as associateComment } from './comment';
import Post, { associate as associatePost } from './post';
import Hashtag, { associate as associateHashtag } from './hashtag';
import  Image, { associate as associateImage } from './image';

export  *  from './sequelize';//import 와 export 를 동시에 함!!

const db = {
  User,
  Comment,
  Image,
  Hashtag,
  Post,
};

export type dbType = typeof db;

associateUser(db);
associatePost(db);
associateHashtag(db);
associateImage(db);
associateComment(db);