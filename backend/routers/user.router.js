const express = require('express')
const User = require('../models/user.model')
const UserController = require('../controllers/user.controller')
const router = express.Router()
const auth = require('../middleware/auth')


router.post('/users', UserController.addUser);

router.post('/users/login', UserController.login);

router.get('/users/me', auth, UserController.getProfile)

router.put('/users/me', auth, UserController.updateUser)

router.post('/users/me/logout', auth, UserController.logout);

router.put('/users/me/logoutall', auth, UserController.logoutAll)

router.get('/users', auth, UserController.getUsers);

router.get('/users/followed', auth, UserController.getFollowers);

router.post('/users/follow', auth, UserController.followUser);

router.post('/users/unfollow', auth, UserController.unfollowUser)

router.post('/users/search', auth, UserController.searchUsers);

router.delete('/users/delete', auth, UserController.deleteUser);

router.get('/users/search/:field/:value', auth, UserController.searchUserByField)
module.exports = router