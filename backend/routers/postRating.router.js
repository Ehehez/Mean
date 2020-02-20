const express = require('express')
const PostRatingModel = require('../models/postRating.model')
const router = express.Router()
const auth = require('../middleware/auth')
const PostRatingController = require('../controllers/postRating.controller')

router.post('/rating', auth, PostRatingController.postRating)

router.get('/rating', auth, PostRatingController.getRating)






module.exports = router