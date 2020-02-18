var mongoose = require('mongoose');
var PostModel = mongoose.model('Posts');
var PostService = require('../services/post.service');

exports.postPost = async (req, res) => {

    let post = await PostService.postPost(req.body, req.user._id);

    res.send(post);

}

exports.getPost = async (req, res) => {


    let posts = await PostService.getPost();

    res.send(posts);
}

exports.getOwnPost = async (req, res) => {


    let posts = await PostService.getOwnPost(req.user._id)
    res.send(posts);

}


exports.getFollowedPost = async (req, res) => {

    let user = req.user;

    let postMap = await PostService.getFollowedPost(user);

    res.send(postMap);

}
