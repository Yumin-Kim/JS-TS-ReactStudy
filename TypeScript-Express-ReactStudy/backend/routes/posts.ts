import * as express from 'express';
import * as Sequelize from 'sequelize';
import Image from '../models/image';
import Post from '../models/post';
import User from '../models/user';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let where = {};
        if (Number(req.query.lastId)) {
            where = {
                id: {
                    [Sequelize.Op.lt]: Number(req.query.lastId), // less than
                },
            };
        }
        const posts = await Post.findAll({
            where,
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }],
            }],
            order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
            limit: Number(req.query.limit),
        });
        return res.json(posts);
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

export default router;