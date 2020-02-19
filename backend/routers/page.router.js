const express = require('express')
const PageModel = require('../models/page.model')
const router = express.Router()
const auth = require('../middleware/auth')
const PageController = require('../controllers/page.controller')


router.post('/page', auth, PageController.postPage)

router.get('/page/cookies', auth, PageController.getPageCookies)

router.get('/page/warning', auth, PageController.getPageWarning)

module.exports = router