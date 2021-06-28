import * as express from 'express';
import * as Sequelize from 'sequelize';
import Hashtag from '../models/hashtag';
import Image from '../models/image';

import Post from '../models/post';
import User from '../models/user';

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try {
        let where = {};
        if (Number(req.query.lastId)) {
            where = {
                id: {
                    [Sequelize.Op.lt]: Number(req.query.lastId),
                },
            };
        }
        const posts = await Post.findAll({
            where,
            include: [{
                model: Hashtag,
                where: { name: decodeURIComponent(req.params.tag) },
            }, {
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
                }]
            }],
            order: [['createdAt', 'DESC']],
            limit: Number(req.query.limit)
        })
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

export default router;