const express = require('express')
const User = require('../models/user.model')
const UserController = require('../controllers/user.controller')
const router = express.Router()
const auth = require('../middleware/auth')

//POST
router.post('/users', UserController.addUser);

router.post('/users/login', UserController.login);

router.post('/users/me/logout', auth, UserController.logout);

router.post('/users/me/logoutall', auth, UserController.logoutAll)

router.post('/users/follow', auth, UserController.followUser);

router.post('/users/unfollow', auth, UserController.unfollowUser)

router.post('/users/search', auth, UserController.searchUsers);


//GET

router.get('/users/me', auth, UserController.getProfile)

router.get('/users/search/:field/:value', auth, UserController.searchUserByField)

router.get('/users', auth, UserController.getUsers);

router.get('/users/followed', auth, UserController.getFollowers);

//PUT
router.put('/users/me', auth, UserController.updateUser)

//DELETE
router.delete('/users/delete', auth, UserController.deleteUser);


module.exports = router