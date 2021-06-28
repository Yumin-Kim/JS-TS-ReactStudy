const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
// const cookie = require('cookie')
const db = require('../models');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "upload");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }
});

router.get('/', async (req, res, next) => {
    try {
        const mainPostings = await db.Post.findAll({
            include: [
                {
                    model: db.User,
                    attributes: ["nickname"]
                },
                {
                    model: db.Category,
                }, {
                    model: db.Post_image,
                }
            ],
            order: [['createdAt', 'DESC']],
        });
        const categoryPosts = await db.Category.findAll({
            include: [
                {
                    model: db.Post,
                    attributes: ["title", "id"]
                }
            ]
        })
        // console.log(categoryPosts);
        const resultJSON = { mainPostings, categoryPosts }
        return res.json(resultJSON);

    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.post('/write', async (req, res, next) => {
    const { title, category, description1, description2, description3, imagesPath } = req.body.writeData;
    try {
        const topic = await db.Category.findOrCreate({
            where: { category }
        });
        const newPosting = await db.Post.create({
            title, description1, description2, description3,
            UserId: req.user.id,
            CategoryId: topic[0].dataValues.id
        })
        if (imagesPath.length === 1) {
            await db.Post_image.create({
                src: imagesPath[0],
                PostId: newPosting.dataValues.id
            })
        } else {
            await imagesPath.map((v) => {
                db.Post_image.create({
                    src: v,
                    PostId: newPosting.dataValues.id
                })
            })
        }
        return res.send('등록 완료!!')
    } catch (e) {
        console.error(e);
        next(e)
    }
})

router.post('/image', upload.array("image"), (req, res, next) => {
    res.json(req.files.map(v => v.filename));
});

router.get('/category/:categoryId', async (req, res, next) => {
    const CategoryId = req.path.match(/[^\/]\w*/g);
    const category = await db.Post.findAll({
        where: {
            CategoryId,
        }, include: [
            {
                model: db.User,
                attributes: ['nickname']
            }, {
                model: db.Category,
            }, {
                model: db.Post_image
            }
        ],
        order: [['createdAt', 'DESC']],
    })
    res.json(category);
})
router.get('/detailcategory/:detailcategoryId', async (req, res, next) => {
    const { detailcategoryId } = req.params;
    //쿠키생성하고 저장후 브라우저로 보내기
    
    const DetailCategory = await db.Post.findOne({
        where:{
            id:detailcategoryId
        },
        include:[{
            model:db.User,
            attributes:['nickname']
        },{
            model:db.Post_image
        },{
            model:db.Category
        }]
    })
    res.json(DetailCategory);
})
module.exports = router