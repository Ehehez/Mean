const express = require('express')
const PostModel = require('../models/post.model')
const router = express.Router()
const auth = require('../middleware/auth')
const PostController = require('../controllers/post.controller')


router.post('/post', auth, PostController.postPost)

router.get('/post', auth, PostController.getPost)

router.post('/post/single', auth, PostController.getOnePost)

router.get('/post/own', auth, PostController.getOwnPost)

router.get('/post/followed', auth, PostController.getFollowedPost)

router.post('/post/comment', auth, PostController.setComment)

module.exports = router