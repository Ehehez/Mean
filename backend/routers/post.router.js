const express = require('express')
const PostModel = require('../models/post.model')
const router = express.Router()
const auth = require('../middleware/auth')
const PostController = require('../controllers/post.controller')


router.post('/post', auth, PostController.postPost)

router.get('/post', auth, PostController.getPost)

router.get('/post/own', auth, PostController.getOwnPost)

router.get('/post/followed', auth, PostController.getFollowedPost)

module.exports = router